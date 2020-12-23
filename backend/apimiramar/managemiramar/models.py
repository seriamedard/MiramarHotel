from django.db import models
from ckeditor.fields import RichTextField


class Category(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name= 'Categorie'
        ordering = ['-created_at']
    def __str__(self):
        return self.name

# Rename photo
def rename(instance, nom_fchier):
        return "{}_{}".format(instance.id, nom_fchier)


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

