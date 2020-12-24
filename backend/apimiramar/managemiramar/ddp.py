from dddp.api import API, Collection, Publication
from . import models

class Room(Collection):
    model = models.Room

class Category(Collection):
    model = models.Category

class AllQuery(Publication):
    queries = [
        models.Category.objects.all(),
        models.Room.objects.all(),
    ]

API.register(
    [Room, Category, AllQuery]
)
from django.conf import settings

DJANGO_SETTINGS_MODULE = settings
