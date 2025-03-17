from .models import Rooms

def generate_room_number() -> str:
    last_room = Rooms.objects.order_by('-id').first()
    if last_room and last_room.room_number.startswith("RM-"):
        numeric_part = last_room.room_number.replace("RM-", "")
        try:
            next_num = int(numeric_part) + 1
        except ValueError:
            next_num = Rooms.objects.count() + 1
    else:
        next_num = 1
    return f"RM-{next_num:03d}"