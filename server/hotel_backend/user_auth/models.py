from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=255, unique=True)
    description = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='note')
