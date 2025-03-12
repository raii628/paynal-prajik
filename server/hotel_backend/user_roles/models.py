from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUsers(AbstractUser):
    email = models.EmailField(unique=True, max_length=200)
    password = models.CharField(max_length=200)
    is_admin = models.BooleanField(default=False)