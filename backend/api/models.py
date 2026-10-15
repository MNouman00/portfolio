from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=500)
    link = models.CharField(max_length=500, blank=True, default="")
    image = models.CharField(max_length=8, default="📁")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def to_dict(self):
        return {
            "id": str(self.id),
            "title": self.title,
            "description": self.description,
            "link": self.link or "",
            "image": self.image or "📁",
        }