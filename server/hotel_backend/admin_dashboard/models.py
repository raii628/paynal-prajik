from django.db import models
from cloudinary.models import CloudinaryField # type: ignore

# Create your models here.
class AdminDetails(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    profile_pic = CloudinaryField('profile_pic')
    
    class Meta:
        db_table = 'admin_details'