from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # type: ignore

urlpatterns = [
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name="token_refresh_pair"),
    path('admin/login', views.admin_login, name='admin_login'),
    path('guest/signup', views.guest_register, name='guest_register'),
    path('guest/login', views.guest_login, name='guest_login'),
    path('auth/logout', views.logout, name='logout'),
    path('email/send-otp', views.send_register_otp, name='send_register_otp'),
]
