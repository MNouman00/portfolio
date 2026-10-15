from django.urls import path
from . import views

urlpatterns = [
    path("login", views.login_view, name="login"),
    path("projects", views.projects_view, name="projects"),
    path("projects/<str:project_id>", views.project_detail_view, name="project-detail"),
]