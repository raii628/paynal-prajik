from .models import CustomUsers
from rest_framework import serializers

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUsers
        fields = ['id', 'email', 'first_name', 'last_name', 'age', 'guest_type', 'is_admin', 'profile_image']
        extra_kwargs = { 'password': { 'write_only': True } }