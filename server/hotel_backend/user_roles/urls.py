from django.urls import path
from . import views

urlpatterns = [
    path('auth/register', views.register_user, name='register_user'),
    path('auth/logout', views.logout, name='logout'),
    path('user_details', views.user_details, name='user_details')
]
