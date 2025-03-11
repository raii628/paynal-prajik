from .models import CustomUsers
from rest_framework import serializers

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUsers
        fields = ['id', 'email', 'first_name', 'last_name', 'age', 'guest_type', 'password', 'is_admin']