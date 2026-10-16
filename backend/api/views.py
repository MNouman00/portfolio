import os
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Project
from .serializers import ProjectSerializer, LoginSerializer

def _is_authorized(request) -> bool:
    """Validate token without needing a Django user."""
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return False
    token = auth[7:]
    try:
        from rest_framework_simplejwt.tokens import AccessToken
        access = AccessToken(token)  # validates signature + expiry
        return access.get("sub") == os.getenv("ADMIN_USERNAME")
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

    # Build a refresh token with the claims SimpleJWT expects
    refresh = RefreshToken()
    refresh["sub"] = username
    refresh["username"] = username
   
    refresh["token_type"] = "refresh"

    access = refresh.access_token
    access["sub"] = username
    access["username"] = username
    
    access["token_type"] = "access"

    return Response(
        {
            "access_token": str(access),
            "refresh_token": str(refresh),
            "token_type": "bearer",
        }
    )


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