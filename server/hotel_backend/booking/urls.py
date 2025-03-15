from django.urls import path
from . import views

# /booking/** routes
urlpatterns = [
    path('reservation', views.reservation_list, name='reservation_list'),
    path('reservation/<int:reservation_id>', views.reservation_detail, name='reservation_detail'),
    path('area_reservations', views.area_reservations, name='area_reservations'),
]