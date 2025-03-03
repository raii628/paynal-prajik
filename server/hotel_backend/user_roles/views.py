from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
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

@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = authenticate(email=email, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'success': 'Admin logged in successfully',
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)
        else:
            return Response({ 'error': 'Invalid credentials' }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({ 'error': str(e) }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_guest(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')

        if not email or not password or not confirm_password:
            return Response({ 'error': 'Please fill out all fields' }, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({ 'error': 'Email already exists' }, status=status.HTTP_400_BAD_REQUEST)
        
        if password != confirm_password:
            return Response({ 'error': 'Passwords do not match' }, status=status.HTTP_400_BAD_REQUEST)

        return Response({ 'success': 'Guest registered successfully' }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({ 'error': str(e) }, status=status.HTTP_400_BAD_REQUEST)

# After the guest have registered, they will proceed to the
# NewUser.tsx page to create their credentials.
# The user_credentials function will handle the creation of user's credentials.
# The user's credentials will be stored in the database, such as first_name, last_name,
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def user_credentials(request):
    