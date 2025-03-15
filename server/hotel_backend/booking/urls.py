from django.urls import path
from . import views

urlpatterns = [
    path('reservation', views.reservation_list, name='reservation_list'),
    path('reservation/<int:reservation_id>', views.reservation_detail, name='reservation_detail'),
]