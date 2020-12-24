# Generated by Django 2.2 on 2020-12-24 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('managemiramar', '0002_auto_20201224_1514'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='booking',
            options={'verbose_name': 'Reservation'},
        ),
        migrations.AlterModelOptions(
            name='contactus',
            options={'verbose_name': 'Contactez-Nous', 'verbose_name_plural': 'Contactez-Nous'},
        ),
        migrations.AlterField(
            model_name='client',
            name='last_name',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='prenom'),
        ),
        migrations.AlterField(
            model_name='client',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='profil/<function rename at 0x000001BC7C44CE18>'),
        ),
        migrations.AlterField(
            model_name='contactus',
            name='message',
            field=models.TextField(max_length=3000),
        ),
    ]