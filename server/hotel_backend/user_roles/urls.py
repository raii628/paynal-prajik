from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # type: ignore

urlpatterns = [
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name="token_refresh_pair"),
    path('auth/register', views.register_user, name='register_user'),
    path('auth/logout', views.logout, name='logout'),
    path('user_details', views.user_details, name='user_details'),
    path('admin/login', views.admin_login, name='admin_login'),
]
