from django.contrib.auth import authenticate, logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from .models import CustomUsers
from .serializers import CustomUserSerializer
from .email.email import send_otp_to_email
from django.core.cache import cache
from django.contrib.auth.hashers import make_password

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def auth_logout(request):
    try:
        refresh_token = request.data.get('refresh_token')
        
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        logout(request)
        return Response({'message': 'User logged out successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def send_register_otp(request):
    try:     
        email = request.data.get("email")
        purpose = "account_verification"
        cache_key = f"{email}_{purpose}"
        
        if cache.get(cache_key):
            return Response({"error": "OTP already sent for account verification. Please wait for it to expire."}, status=400)
        
        message = "Your OTP for account verification"
        otp_generated = send_otp_to_email(email, message)
        OTP_EXPIRATION_TIME = 120
        cache.set(cache_key, otp_generated, OTP_EXPIRATION_TIME)
        
        return Response({"success": "OTP sent for account verification"}, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"{e}")
        return Response({"error": "Something went wrong"}, status=500)
    
@api_view(['POST'])
def verify_otp(request):
    try:
        email = request.data.get("email")
        password = request.data.get("password")
        received_otp = request.data.get("otp")

        cache_key = f"{email}_account_verification"
        cached_otp = cache.get(cache_key)

        if cached_otp is None:
            return Response({"error": "OTP expired. Please request a new one."}, status=status.HTTP_404_NOT_FOUND)

        if str(cached_otp) == str(received_otp):
            user = CustomUsers.objects.create(
                email=email,
                password=make_password(password)  
            )
            user.save()
            
            refresh = RefreshToken.for_user(user)
            
            return Response({
                "success": "User registered successfully.",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Incorrect OTP code. Please try again."}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": "An error occurred during registration. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
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
        
        return Response({
            'message': f'{role.capitalize()} logged in successfully!',
            'user': {
                'email': auth_user.email,
                'role': role
            },
            'access_token': str(token.access_token),
            'refresh_token': str(token)
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def guest_register(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')
        
        if not email or not password or not confirm_password:
            return Response({'error': 'Please fill out the fields'}, status=status.HTTP_400_BAD_REQUEST)
        
        if CustomUsers.objects.filter(email=email).exists():
            return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        if password != confirm_password:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = CustomUsers.objects.create_user(
            username=email,
            email=email,
            password=password,
            is_admin=False
        )
        
        return Response({
            'message': 'User registered successfully',
            'user': {
                'email': user.email,
                'role': user.is_admin
            }
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def user_details(request):
    try:
        user = request.user
        serializer = CustomUserSerializer(user)
        
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)