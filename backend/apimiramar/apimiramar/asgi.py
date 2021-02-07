import os
from django import setup
from django.urls import path

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.http import AsgiHandler
from channels.auth import AuthMiddlewareStack
from managemiramar import consumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'apimiramar.settings')
setup()

websocket_urlPatterns = [
    path('ws/polData/',consumer.DashConsumer),
]

application = ProtocolTypeRouter({
    "http": AsgiHandler(),
    "websockets": AuthMiddlewareStack(URLRouter(websocket_urlPatterns))
    # Just HTTP for now. (We can add other protocols later.)
})