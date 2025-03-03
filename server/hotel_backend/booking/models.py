from django.db import models
from property.models import Rooms, Areas

# Create your models here.
class Guests(models.Model):
    ROLE_CHOICES = [
        ('regular', 'Regular'),
        ('vip', 'VIP'),
    ]
    
    first_name = models.CharField(max_length=200, null=False)
    last_name = models.CharField(max_length=200, null=False)
    email = models.EmailField(max_length=200, null=False)
    address = models.TextField()
    contact_number = models.CharField(max_length=25, unique=True)
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='regular',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Bookings(models.Model):
    BOOKING_STATUS_CHOICES = [
        ('confirmed', 'Confirmed'),
        ('checked_in', 'Checked In'),
        ('checked_out', 'Checked Out'),
        ('cancelled', 'Cancelled'),
    ]
    
    guest = models.ForeignKey(Guests, on_delete=models.CASCADE)
    room = models.ForeignKey(Rooms, on_delete=models.CASCADE)
    check_in_date = models.DateField(null=False)
    check_out_date = models.DateField(null=False)
    status = models.CharField(
        max_length=20,
        choices=BOOKING_STATUS_CHOICES,
        default='confirmed',
    )
    cancellation_date = models.DateTimeField(null=True, blank=True)
    cancellation_reason = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Reservations(models.Model):
    RESERVATION_STATUS_CHOICES = [
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]
    
    guest = models.ForeignKey(Guests, on_delete=models.CASCADE)
    area = models.ForeignKey(Areas, on_delete=models.CASCADE)
    start_time = models.DateTimeField(null=False)
    end_time = models.DateTimeField(null=False)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    status = models.CharField(
        max_length=20,
        choices=RESERVATION_STATUS_CHOICES,
        default='confirmed',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Transactions(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ('booking', 'Booking'),
        ('reservation', 'Reservation'),
        ('cancellation_refund', 'Cancellation Refund'),
    ]
    TRANSACTION_STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('pending', 'Pending'),
        ('failed', 'Failed'),
    ]
    
    booking = models.ForeignKey(Bookings, on_delete=models.SET_NULL, null=True, blank=True)
    reservation = models.ForeignKey(Reservations, on_delete=models.SET_NULL, null=True, blank=True)
    guest = models.ForeignKey(Guests, on_delete=models.CASCADE)
    transaction_type = models.CharField(
        max_length=30,
        choices=TRANSACTION_TYPE_CHOICES,
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    transaction_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=TRANSACTION_STATUS_CHOICES,
        default='pending',
    )

class Reviews(models.Model):
    booking = models.ForeignKey(Bookings, on_delete=models.CASCADE)
    guest = models.ForeignKey(Guests, on_delete=models.CASCADE)
    review_text = models.TextField(blank=True)
    rating = models.IntegerField()
    
    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(rating__gte=1) & models.Q(rating__lte=5), name='valid_rating'),
        ]