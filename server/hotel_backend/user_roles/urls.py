from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # type: ignore

# /api/** routes
urlpatterns = [
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name="token_refresh_pair"),
    
    # For user authentication
    path('auth/user', views.user_auth, name='user_auth'),
    path('auth/login', views.user_login, name='user_login'),
    path('auth/verify', views.verify_otp, name='verify_otp'),
    path('auth/resend_otp', views.resend_otp, name='resend_otp'),
    path('auth/register', views.send_register_otp, name='send_register_otp'),
    path('auth/logout', views.auth_logout, name='logout'),
    path('auth/change_password', views.change_password, name='change_password'),
    path('auth/reset_password', views.reset_password, name='reset_password'),
    path('auth/forgot_password', views.forgot_password, name='forgot_password'),
    path('auth/verify_reset_otp', views.verify_reset_otp, name='verify_reset_otp'),
    
    # For guest profile
    path('guest/change_image', views.change_profile_picture, name='change_profile_picture'),
    path('guest/<int:id>', views.user_details, name='user_details'),
]
