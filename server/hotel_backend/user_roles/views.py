from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from django.contrib.auth import authenticate, logout
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.core import cache
from .email.email import send_otp_to_email
from .utils import get_tokens_for_user

# Custom permission classes
class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff

class IsGuestUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and not request.user.is_staff

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    logout(request)
    return Response({ 'status': 'Log out successfully' }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def guest_details(request):
    user = request.user
    serializer = UserSerializer(user)
    data = serializer.data
    data['role'] = 'admin' if user.is_staff else 'guest'
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        
        if email == 'admin@gmail.com' and password == 'admin':
            try:
                admin_user = User.objects.get(email='admin@gmail.com')
            except User.DoesNotExist:
                admin_user = User.objects.create(
                    email='admin@gmail.com',
                    is_staff=True,
                    is_superuser=True
                )
                admin_user.set_password('admin')
                admin_user.save()
            
            tokens = get_tokens_for_user(admin_user)
            return Response({
                'success': 'Admin logged in successfully',
                'access': tokens['access'],
                'refresh': tokens['refresh'],
                'role': 'admin'
            }, status=status.HTTP_200_OK)
            
        try:
            user = User.objects.get(email=email)
            user = authenticate(email=email, password=password)
            
            if user is not None and user.is_staff:
                tokens = get_tokens_for_user(user)
                return Response({
                    'success': 'Admin logged in successfully',
                    'access': tokens['access'],
                    'refresh': tokens['refresh'],
                    'role': 'admin'
                }, status=status.HTTP_200_OK)
            else:
                return Response({ 'error': 'Invalid email or password' }, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({ 'error': 'Invalid email or password' }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({ 'error': str(e) }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def guest_login(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            # Find user by email first
            user = User.objects.get(email=email)
            # Then authenticate with username and password
            user = authenticate(username=user.username, password=password)
            
            if user is not None and not user.is_staff:
                tokens = get_tokens_for_user(user)
                return Response({
                    'success': 'Guest logged in successfully',
                    'access': tokens['access'],
                    'refresh': tokens['refresh'],
                    'role': 'guest'
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid guest credentials'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'Guest not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

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
        
        user = User.objects.create(
            email=email,
            password=make_password(password),
            is_staff=False
        )
        user.save()
        
        tokens = get_tokens_for_user(user)
        
        return Response({
            'success': 'Guest registered successfully',
            'access': tokens['access'],
            'refresh': tokens['refresh'],
            'role': 'guest'
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({ 'error': str(e) }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def email_otp(request):
    try:
        email = request.data.get('email')
        purpose = "account_verification"
        cache_key = f"{email}_{purpose}"
        
        if cache.get(cache_key):
            return Response({ 'error': 'Email already exists' }, status=status.HTTP_400_BAD_REQUEST)
        
        message = "Your OTP for Moonlight Hotel System"
        otp_generated = send_otp_to_email(email, message)
        OTP_EXPIRATION_TIME = 120
        
        cache.set(cache_key, otp_generated, OTP_EXPIRATION_TIME)
        
        return Response({ 'success': "OTP sent for guest verification" }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(str(e))
        return Response({ 'error': "Something went wrong" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def resend_otp(request):
    try:
        email = request.data.get('email')
        message = "Your OTP for Moonlight Hotel System"
        otp_generated = send_otp_to_email(email, message)
        OTP_EXPIRATION_TIME = 120
        purpose = "account_verification"
        cache_key = f"{email}_{purpose}"
        cache.set(cache_key, otp_generated, OTP_EXPIRATION_TIME)
        
        return Response({
            'success': "OTP resend successfully for guest verification"
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(str(e))
        return Response({ 'error': "Something went wrong" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
def reset_password(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm')

        if not email or not password or not confirm_password:
            return Response({"error": "Email, password, and confirmation are required."}, status=status.HTTP_400_BAD_REQUEST)

        if password != confirm_password:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid email address."}, status=status.HTTP_404_NOT_FOUND)

        user.set_password(password)
        user.save()

        return Response({"success": "Password has been reset successfully."}, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Error: {e}")  
        return Response({"error": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def refresh_token(request):
    try:
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({ 'error': 'Refresh token is required' }, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken(refresh_token)
        access_token = str(refresh.access_token)
        
        return Response({
            'access_token': access_token
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({ 'error': str(e) }, status=status.HTTP_400_BAD_REQUEST)

# Admin dashboard
@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_dashboard(request):
    return Response({
        'message': 'Welcome to the admin dashboard',
        'user': request.user.email
    }, status=status.HTTP_200_OK)

# Guest dashboard
@api_view(['GET'])
@permission_classes([IsGuestUser])
def guest_dashboard(request):
    return Response({
        'message': 'Welcome to the guest dashboard',
        'user': request.user.email
    }, status=status.HTTP_200_OK)

# After the guest have registered, they will proceed to the
# NewUser.tsx page to create their credentials.
# The user_credentials function will handle the creation of user's credentials.
# The user's credentials will be stored in the database, such as first_name, last_name,
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def user_credentials(request):
    