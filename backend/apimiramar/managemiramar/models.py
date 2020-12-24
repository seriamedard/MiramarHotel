from django.db import models
from django.db.models.fields import PositiveIntegerField
from ckeditor.fields import RichTextField
from phonenumber_field.modelfields import PhoneNumberField

# Table of Categories
class Category(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name= 'Categorie'
        ordering = ['id']
    def __str__(self):
        return self.name

# Rename photo
def rename(instance, nom_fchier):
        return "{}_{}".format(instance.id, nom_fchier)


# Table of rooms
class Room(models.Model):
    created_at = models.DateTimeField('Créé le ',auto_now_add=True)
    name = models.CharField('nom',max_length=125, blank=True, default='')
    photo = models.ImageField(upload_to=rename)
    max_places = models.PositiveIntegerField('Maximum de personnes',default=2)
    surface = models.PositiveIntegerField('Surface de la chambre',default=25)
    price = models.FloatField("Prix",default=100)
    description = RichTextField()
    available = models.BooleanField("Disponible",default=True)
    promo = models.BooleanField(default=False)
    category = models.ForeignKey(Category, related_name='categorie', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Chambre'
        ordering = ['-created_at']

    def __str__(self):
        return self.name
    
    def save(self, *args,**kwargs):

        if self.id is None:
            saved_image=self.photo
            self.photo = None
            super(Room, self).save(*args, **kwargs)
            self.photo = saved_image
            if 'force_insert' in kwargs:
                kwargs.pop('force_insert')

        super(Room, self).save(*args, **kwargs)


# Table abstract represent person
class Personne(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField("Nom",max_length=50, null=False)
    email = models.EmailField(max_length=254, blank=True, null=True)
    phone = PhoneNumberField("Telephone",blank=True, null=True)

    class Meta:
        abstract = True


# Table of messages
class ContactUs(Personne):
    message = models.TextField(max_length=3000)

    class Meta:
        verbose_name = "Contactez-Nous"
        verbose_name_plural = "Contactez-Nous"

    def __str__(self) -> str:
        return f"{self.message[:10]} ..."

    


# Table of clients
class Client(Personne):
    last_name = models.CharField("prenom",max_length=50, blank=True, null=True)
    photo = models.ImageField(upload_to=f"profil/{rename}", blank=True, null=True)

    def __str__(self):
        return self.name or f"{self.name} {self.last_name}"
    

class Booking(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    arrival_date_hour = models.DateTimeField("Temps d'arrivée",auto_now_add=False)
    departure_date_hour = models.DateTimeField("Temps de départ",auto_now_add=False)
    note =models.TextField("Message",max_length=300)
    termined = models.BooleanField("Terminé", default=False)
    guests = PositiveIntegerField("Occupants",default=1)
    client = models.ForeignKey(Client, models.CASCADE)
    chambre = models.ManyToManyField(Room)

    class Meta:
        verbose_name = "Reservation"

    def __str__(self):
        return f"Commande No: {self.id}"
