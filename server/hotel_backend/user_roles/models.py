from django.db import models
from django.contrib.auth.models import AbstractUser
<<<<<<< HEAD
=======
from cloudinary.models import CloudinaryField # type: ignore
>>>>>>> upstream/main

# Create your models here.
class CustomUsers(AbstractUser):
    email = models.EmailField(unique=True, max_length=200)
    password = models.CharField(max_length=200)
<<<<<<< HEAD
    is_admin = models.BooleanField(default=False)
=======
    age = models.PositiveIntegerField(null=False, default=0)
    guest_type = models.CharField(max_length=200, default='regular')
    is_admin = models.BooleanField(default=False)
    profile_image = CloudinaryField('profile_image', null=True, blank=True)
>>>>>>> upstream/main
