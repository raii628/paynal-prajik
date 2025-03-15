from django.urls import path
from . import views

# /master/** routes
urlpatterns = [
    path('details', views.get_admin_details, name='get_admin_details'),
    path('stats', views.dashboard_stats, name='dashboard_stats'),
    path('area_reservations', views.area_reservations, name='area_reservations'),
    path('manage_users', views.manage_users, name='manage_users'),
]
