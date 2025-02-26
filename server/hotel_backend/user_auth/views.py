from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User
from .serializer import UserSerializer, UserRegisterSerializer
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # type: ignore


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            
            access_token = tokens['access']
            refresh_token = tokens['refresh']
            
            res = Response()
            
            res.data = { "success": True }
            
            res.set_cookie(
                key="aceess_token",
                value=str(access_token),
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )
            
            res.set_cookie(
                key="refresh_token",
                value=str(refresh_token),
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )
            
            res.data.update(tokens)
            return res 
        except:
            return Response({ "success": False })
        
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            access_token = tokens['access']
            
            res = Response()
            
            res.data = { "success": True }
            
            res.set_cookie(
                key="aceess_token",
                value=str(access_token),
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )
            return res
        except Exception as e:
            print(e)
            return Response({ "success": False })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    users = User.objects.filter(owner=user)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        res = Response()
        res.data = { "success": True }
        res.delete_cookie("access_token", path="/", sameSite='None')
        res.delete_cookie("refresh_token", path="/", sameSite='None')
        return res
    except Exception as e:
        print(e)
        return Response({ "success": False })