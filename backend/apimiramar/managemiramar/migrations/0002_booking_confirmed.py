# Generated by Django 2.2 on 2021-01-14 12:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('managemiramar', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='confirmed',
            field=models.BooleanField(default=False, verbose_name='Confirmé'),
        ),
    ]
