from django.db import models

# Create your models here.
class RoomTypes(models.Model):
    name = models.CharField(max_length=100, unique=False, null=False)
    description = models.TextField(blank=True)
    base_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    capacity = models.PositiveIntegerField()
    
    class Meta:
        db_table = 'room_types'

class Amenities(models.Model):
    name = models.CharField(max_length=100, unique=True, null=False)
    description = models.TextField(blank=True)
    
    class Meta:
        db_table = 'amenities'

class RoomTypeAmenities(models.Model):
    room_type = models.ForeignKey(RoomTypes, on_delete=models.CASCADE, related_name='amenities')
    amenity = models.ForeignKey(Amenities, on_delete=models.CASCADE, related_name='room_types')
    
    class Meta:
        unique_together = ('room_type', 'amenity')
        db_table = 'room_type_amenities'

class Rooms(models.Model):
    ROOM_STATUS_CHOICES = [
        ('available', 'Available'),
        ('occupied', 'Occupied'),
        ('maintenance', 'Maintenance'),
    ]
    
    room_number = models.CharField(max_length=10, unique=True, null=False)
    room_type = models.ForeignKey(RoomTypes, on_delete=models.CASCADE, related_name='rooms')
    status = models.CharField(
        max_length=20,
        choices=ROOM_STATUS_CHOICES,
        default='available',
    )
    notes = models.TextField(blank=True)
    
    class Meta:
        db_table = 'rooms'

class Areas(models.Model):
    AREA_STATUS_CHOICES = [
        ('available', 'Available'),
        ('occupied', 'Occupied'),
        ('maintenance', 'Maintenance'),
    ]
    
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    capacity = models.IntegerField()
    price_per_hour = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    status = models.CharField(
        max_length=20,
        choices=AREA_STATUS_CHOICES,
        default='available',
    )
    
    class Meta:
        db_table = 'areas'

class RoomTypePrices(models.Model):
    room_type = models.ForeignKey(RoomTypes, on_delete=models.CASCADE, related_name='prices')
    valid_from = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        db_table = 'room_type_prices'
        unique_together = ('room_type', 'valid_from')