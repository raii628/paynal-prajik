from rest_framework import serializers
from .models import Amenities, Rooms, Areas
from cloudinary.utils import cloudinary_url # type: ignore

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenities
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    room_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Rooms
        fields = [
            'id',
            'admission',
            'room_number',
            'room_type',
            'status',
            'room_price',
            'room_image',
            'description',
            'bed_size',
            'pax',
        ]
        read_only_fields = ['room_number']
        
    def get_room_image(self, obj):
        if obj.room_image:
            return cloudinary_url(obj.room_image.public_id)[0]
        return None

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Areas
        fields = '__all__'