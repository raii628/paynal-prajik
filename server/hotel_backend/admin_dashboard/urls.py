from django.urls import path
from . import views

urlpatterns = [
    path('details', views.get_admin_details, name='get_admin_details'),
]
