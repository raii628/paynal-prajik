from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUsers(AbstractUser):
    email = models.EmailField(unique=True, max_length=200)
    password = models.CharField(max_length=200)
    age = models.PositiveIntegerField(null=False, default=0)
    guest_type = models.CharField(max_length=200, default='regular')
    is_admin = models.BooleanField(default=False)