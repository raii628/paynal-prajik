from rest_framework import serializers
from .models import RoomTypes, Amenities, RoomTypeAmenities, Rooms, Areas

class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomTypes
        fields = '__all__'

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenities
        fields = '__all__'

class RoomTypeAmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomTypeAmenities
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = '__all__'

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Areas
        fields = '__all__'