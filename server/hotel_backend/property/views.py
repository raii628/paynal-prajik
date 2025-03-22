from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Rooms, Areas, Amenities
from .serializers import RoomSerializer, AreaSerializer, AmenitySerializer

# Create your views here.
@api_view(['GET'])
def fetch_rooms(request):
    try:
        rooms = Rooms.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response({
            "data": serializer.data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def fetch_room_detail(request, id):
    try:
        room = Rooms.objects.get(id=id)
        serializer = RoomSerializer(room)
        return Response({
            "data": serializer.data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def fetch_amenities(request):
    try:
        amenities = Amenities.objects.all()
        serializer = AmenitySerializer(amenities, many=True)
        return Response({
            "data": serializer.data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def fetch_areas(request):
    try:
        areas = Areas.objects.all()
        serializer = AreaSerializer(areas, many=True)
        return Response({
            "data": serializer.data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)