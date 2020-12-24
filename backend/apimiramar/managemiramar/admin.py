from .models import Booking, Category, Client, ContactUs, Room
from django.contrib import admin

admin.site.register(Category)
admin.site.register(Room)
admin.site.register(ContactUs)
admin.site.register(Client)
admin.site.register(Booking)



# Register your models here.
