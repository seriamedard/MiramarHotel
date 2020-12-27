# Generated by Django 2.2 on 2020-12-26 21:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('managemiramar', '0003_auto_20201224_1553'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='arrival_date_hour',
            field=models.DateTimeField(null=True, verbose_name="Temps d'arrivée"),
        ),
        migrations.AlterField(
            model_name='booking',
            name='client',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='managemiramar.Client'),
        ),
        migrations.AlterField(
            model_name='booking',
            name='departure_date_hour',
            field=models.DateTimeField(null=True, verbose_name='Temps de départ'),
        ),
        migrations.AlterField(
            model_name='booking',
            name='guests',
            field=models.PositiveIntegerField(default=1, verbose_name='Occupants'),
        ),
        migrations.AlterField(
            model_name='booking',
            name='note',
            field=models.TextField(blank=True, default='', max_length=300, verbose_name='Message'),
        ),
        migrations.AlterField(
            model_name='client',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='client',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='profil/<function rename at 0x000001E3BDD19048>'),
        ),
        migrations.AlterField(
            model_name='contactus',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='room',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='categorie', to='managemiramar.Category'),
        ),
    ]
