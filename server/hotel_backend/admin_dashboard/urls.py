from django.urls import path
from . import views

# /master/** routes
urlpatterns = [
    path('details', views.get_admin_details, name='get_admin_details'),
    path('stats', views.dashboard_stats, name='dashboard_stats'),
    path('area_reservations', views.area_reservations, name='area_reservations'),
    path('manage_users', views.manage_users, name='manage_users'),
    path('fetch_rooms', views.fetch_rooms, name='fetch_rooms'),
    path('add_room', views.add_new_room, name='add_new_room'),
    path('edit_room/<int:room_id>', views.edit_room, name='edit_room'),
    path('delete_room/<int:room_id>', views.delete_room, name='delete_room'),
]
