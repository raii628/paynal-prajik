from rest_framework import serializers
from .models import RoomTypes, Amenities, RoomTypeAmenities, Rooms, Areas, RoomTypePrices
from django.utils import timezone

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenities
        fields = '__all__'

class RoomTypeAmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomTypeAmenities
        fields = '__all__'
        
class RoomPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomTypePrices
        fields = '__all__'

class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomTypes
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()
    amenities = serializers.SerializerMethodField()
    
    class Meta:
        model = Rooms
        fields = '__all__'
    
    def get_price(self, obj):
        today = timezone.now().date()
        prices = obj.room_type.prices.filter(valid_from__lte=today).order_by('-valid_from')
        if prices.exists():
            return prices.first().price
        return obj.room_type.base_price

    def get_amenities(self, obj):
        room_type_amenities = obj.room_type.amenities.all()
        return [rta.amenity.name for rta in room_type_amenities]

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Areas
        fields = '__all__'