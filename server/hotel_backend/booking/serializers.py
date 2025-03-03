from rest_framework import serializers
from .models import Guests, Bookings, Reservations, Transactions, Reviews

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guests
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservations
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = '__all__'