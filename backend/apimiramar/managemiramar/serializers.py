from django.db.models import fields
from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ['id','created_at', 'name']

    def create(self, validated_data):
        """
        Create an return a new Category instance
        """
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update an return an existing Category instance
        """
        instance.name = validated_data.get('name')
        instance.save()
        return instance


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id','created_at','name',
                    'photo','max_places',
                    'surface','price','description',
                    'available','promo','category']


    def create(self, validated_data):
        return Room.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.photo = validated_data.get('photo')
        instance.max_places = validated_data.get('max_places')
        instance.surface = validated_data.get('surface')
        instance.price = validated_data.get('price')
        instance.description = validated_data.get('description')
        instance.available = validated_data.get('available')
        instance.promo = validated_data.get('promo')
        instance.category = validated_data.get('category')

        instance.save()

        return instance

from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id','username']