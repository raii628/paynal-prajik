from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # type: ignore

urlpatterns = [
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name="token_refresh_pair"),
    path('auth/refresh', views.refresh_token, name='refresh_token'),
    path('admin', views.admin_dashboard, name='admin_dashboard'),
    path('guest', views.guest_dashboard, name='guest_dashboard'),
    path('auth/logout', views.logout, name='logout'),
    path('guest/details', views.guest_details, name='user_details'),
    path('admin/login', views.admin_login, name='admin_login'),
    path('guest/register', views.register_guest, name='register_user'),
    path('guest/login', views.guest_login, name='guest_login'),
    path('email/otp', views.email_otp, name='email_otp'),
    path('email/resend-otp', views.resend_otp, name='resend_otp'),
    path('reset-password', views.reset_password, name='reset_password'),
]
