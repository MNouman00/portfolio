import os
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Project
from .serializers import ProjectSerializer, LoginSerializer


def _is_authorized(request) -> bool:
    auth = request.headers.get("Authorization", "")
    return auth.startswith("Bearer ")


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

    refresh = RefreshToken()
    refresh["sub"] = username
    access = refresh.access_token
    access["sub"] = username

    return Response({"access_token": str(access), "token_type": "bearer"})


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