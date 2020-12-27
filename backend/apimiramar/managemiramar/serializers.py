from django.db.models import fields
from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ['url','id','created_at', 'name']

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
        fields = ['url','id','created_at','name',
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
        fields = ['url','id','username']


class ContactUsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ContactUs
        fields = '__all__'

    def create(self, validated_data):
        """
        Create an return a new Category instance
        """
        return ContactUs.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update an return an existing Contact instance
        """
        instance.name = validated_data.get('name')
        instance.email = validated_data.get('email')
        instance.phone = validated_data.get('phone')
        instance.message = validated_data.get('message')
        instance.save()
        return instance

class ClientSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Client
        fields = '__all__'

    def create(self, validated_data):
        """
        Create an return a new Category instance
        """
        return Client.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update an return an existing Client instance
        """
        instance.name = validated_data.get('name')
        instance.last_name = validated_data.get('last_name')
        instance.email = validated_data.get('email')
        instance.phone = validated_data.get('phone')
        instance.photo = validated_data.get('photo')
        instance.note = validated_data.get('note')
        instance.save()
        return instance


class BookingSerializer(serializers.ModelSerializer):
    client = serializers.HyperlinkedRelatedField(
        many=False,
        read_only=False,
        view_name='client-detail',
        queryset = Client.objects.all()
    )
    chambre = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=False,
        view_name='room-detail',
        queryset = Room.objects.all()
    )
    class Meta:
        model = Booking
        fields = ['url','arrival_date_hour',
                    'departure_date_hour','note','termined',
                    'guests','client','chambre'
                    ]

    def create(self, validated_data):
        """
        Create an return a new Category instance
        """
        chambre_data = validated_data.pop('chambre')
        booking = Booking.objects.create(**validated_data)
        for ch in chambre_data:
            booking.chambre.add(ch)
        #return Booking.objects.create(**validated_data)
        return booking

    def update(self, instance, validated_data):
        """
        Update an return an existing Client instance
        """
        instance.arrival_date_hour = validated_data.get('arrival_date_hour')
        instance.departure_date_hour = validated_data.get('departure_date_hour')
        instance.note = validated_data.get('note')
        instance.termined = validated_data.get('termined')
        instance.guests = validated_data.get('guests')
        instance.client = validated_data.get('client')
        instance.chambre.add(validated_data.get('chambre'))
        instance.save()
        return instance

