from django.urls import path
from . import views

urlpatterns = [
    path('details', views.get_admin_details, name='get_admin_details'),
    path('stats', views.dashboard_stats, name='dashboard_stats'),
]
