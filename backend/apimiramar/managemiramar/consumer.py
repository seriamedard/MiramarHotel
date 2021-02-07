from channels.generic.websocket import AsyncWebsocketConsumer
import json

class DashConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.connect()
    
    async def disconnect(self,close_code):
        await self.disconnect()

    async def receive(self, text_data):
        print('>>>>', text_data)
        pass