# Generated by Django 5.1.7 on 2025-03-11 12:22

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_roles', '0002_customusers_age_customusers_guest_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='customusers',
            name='profile_image',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='profile_image'),
        ),
    ]
