from django.contrib.auth import authenticate, logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from .models import CustomUsers
from .serializers import CustomUserSerializer
from .email.email import send_otp_to_email
from django.core.cache import cache
from .validation.validation import RegistrationForm

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def auth_logout(request):
    try:
        # logout(request)
        
        response = Response({'message': 'User logged out successfully'}, status=status.HTTP_200_OK)
        
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        
        return response
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    try:
        user = request.user
        
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        confirm_new_password = request.data.get('confirm_new_password')
        
        if not old_password or not new_password or not confirm_new_password:
            return Response({'error': 'Old password, new password, and confirm new password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if new_password != confirm_new_password:
            return Response({'error': 'New password and confirm new password do not match'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.check_password(old_password):
            return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(new_password)
        user.save()
        
        return Response({
            'message': 'Password changed successfully'
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def send_register_otp(request):
    try:     
        email = request.data.get("email")
        password = request.data.get("password")
        confirm_password = request.data.get("confirm_password")
        
        if not email or not password or not confirm_password:
            return Response({"error": "Please fill out the fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        form = RegistrationForm({
            'email': email,
            'password': password,
            'confirm_password': confirm_password
        })
        
        if not form.is_valid():
            return Response({"error": form.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        if CustomUsers.objects.filter(email=email).exists():
            return Response({"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        purpose = "account_verification"
        cache_key = f"{email}_{purpose}"
        
        if cache.get(cache_key):
            return Response({"error": "OTP already sent for account verification. Please wait for it to expire."}, status=status.HTTP_400_BAD_REQUEST)
        
        message = "Your OTP for account verification"
        otp_generated = send_otp_to_email(email, message)
        
        if otp_generated is None:
            return Response({"error": "Failed to send OTP. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        OTP_EXPIRATION_TIME = 120
        cache.set(cache_key, otp_generated, OTP_EXPIRATION_TIME)
        
        print(form.errors)
        
        return Response({
            "success": "OTP sent for account verification",
            'otp': otp_generated
        }, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"{e}")
        return Response({"error": "Something went wrong"}, status=500)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def verify_otp(request):
    try:
        email = request.data.get("email")
        password = request.data.get("password")
        received_otp = request.data.get("otp")
        
        if not email or not password or not received_otp:
            return Response({"error": "Email, password, and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)

        purpose = "account_verification"
        cache_key = f"{email}_{purpose}"
        cached_otp = cache.get(cache_key)

        if cached_otp is None:
            return Response({"error": "OTP expired. Please request a new one."}, status=status.HTTP_404_NOT_FOUND)

        if str(cached_otp) != str(received_otp):
            return Response({"error": "Incorrect OTP code. Please try again"}, status=status.HTTP_400_BAD_REQUEST)
    
        user = CustomUsers.objects.create_user(
            username=email,
            email=email,
            password=password,
            is_admin=False
        )
        user.save()
        
        cache.delete(cache_key)
        
        refresh = RefreshToken.for_user(user)
        
        response = Response({
            'success': 'User registered successfully',
            'user': {
                'email': user.email,
                'role': 'guest'
            },
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh)
        }, status=status.HTTP_201_CREATED)
        
        response.set_cookie(
            key="access_token",
            value=str(refresh.access_token),
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=3600
        )
        
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=604800
        )
        
        return response
    except Exception as e:
        print(f"OTP Error: {e}")
        return Response({"error": "An error occurred during registration. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def user_login(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = CustomUsers.objects.filter(email=email).first()
        if not user:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
            
        auth_user = authenticate(request, username=email, password=password)
        
        if auth_user is None:
            return Response({'error': 'Your password is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
        
        role = 'admin' if user.is_admin else 'guest'
        
        token = RefreshToken.for_user(auth_user)
        
        response = Response({
            'message': f'{role.capitalize()} logged in successfully!',
            'user': {
                'email': auth_user.email,
                'role': role
            },
            'access_token': str(token.access_token),
            'refresh_token': str(token)
        }, status=status.HTTP_200_OK)
        
        response.set_cookie(
            key="access_token",
            value=str(token.access_token),
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=3600
        )
        
        response.set_cookie(
            key="refresh_token",
            value=str(token),
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=604800
        )
        
        return response
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_auth(request):
    user = request.user
    role = 'admin' if user.is_admin else 'guest'
    return Response({
        'isAuthenticated': True,
        'role': role,
        'user': {
            'email': user.email,
            'role': role
        }
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_details(request):
    try:
        user = request.user
        
        if not user or not user.is_authenticated:
            return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = CustomUserSerializer(user)
        
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)