import os
from django.core import signing
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Project
from .serializers import ProjectSerializer, LoginSerializer


TOKEN_SALT = "portfolio.admin.token"
TOKEN_MAX_AGE = 60 * 60 * 8  # 8 hours


def _make_token(username: str) -> str:
    """Create a signed token (tamper-proof) for the admin user."""
    return signing.dumps({"sub": username}, salt=TOKEN_SALT)


def _is_authorized(request) -> bool:
    """Verify the signed Bearer token from the Authorization header."""
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return False
    token = auth[7:].strip()
    try:
        data = signing.loads(token, salt=TOKEN_SALT, max_age=TOKEN_MAX_AGE)
        return data.get("sub") == os.getenv("ADMIN_USERNAME")
    except signing.BadSignature:
        return False
    except signing.SignatureExpired:
        return False
    except Exception:
        return False


# ---------- Auth ----------
@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    username = serializer.validated_data["username"]
    password = serializer.validated_data["password"]

    if (
        username != os.getenv("ADMIN_USERNAME")
        or password != os.getenv("ADMIN_PASSWORD")
    ):
        return Response(
            {"detail": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    token = _make_token(username)
    return Response({"access_token": token, "token_type": "bearer"})


# ---------- Projects: list + create ----------
@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def projects_view(request):
    if request.method == "GET":
        projects = Project.objects.all()
        return Response([p.to_dict() for p in projects])

    if not _is_authorized(request):
        return Response(
            {"detail": "Authentication required"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid():
        project = serializer.save()
        return Response(project.to_dict(), status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---------- Projects: delete ----------
@api_view(["DELETE"])
@permission_classes([AllowAny])
def project_detail_view(request, project_id):
    if not _is_authorized(request):
        return Response(
            {"detail": "Authentication required"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    try:
        project = Project.objects.get(id=project_id)
    except (Project.DoesNotExist, ValueError):
        return Response(
            {"detail": "Project not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    project.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)