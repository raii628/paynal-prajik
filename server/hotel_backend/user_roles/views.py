from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import os
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from django.contrib.auth import authenticate, logout
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer

# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    logout(request)
    return Response({ 'status': 'Log out successfully' }, status=status.HTTP_200_OK)

@api_view(['POST'])
def register_user(request):
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password)
        )
        user.save()
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'success': 'User registered successfully',
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({ 'error': str(e) }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_details(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)