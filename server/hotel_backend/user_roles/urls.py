from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # type: ignore

urlpatterns = [
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name="token_refresh_pair"),
    path('auth/login', views.user_login, name='user_login'),
    path('auth/logout', views.auth_logout, name='logout'),
    path('auth/register', views.send_register_otp, name='send_register_otp'),
    path('auth/verify', views.verify_otp, name='verify_otp'),
    path('auth/change_password', views.change_password, name='change_password'),
]
