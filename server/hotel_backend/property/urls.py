from django.urls import path
from . import views

# /property/** routes
urlpatterns = [
    path('rooms/', views.fetch_rooms, name='fetch_rooms'),
]
