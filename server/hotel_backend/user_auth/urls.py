from django.urls import path
from .views import CustomTokenObtainPairView, CustomTokenRefreshView
from . import views

urlpatterns = [
    path('get_notes', views.get_notes, name='get_notes'),
    path('token', CustomTokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh', CustomTokenRefreshView.as_view(), name='refresh_token'),
    path('register', views.register_user, name='register'),
    path('logout', views.logout, name='logout'),
]