# Generated by Django 4.2 on 2023-04-28 18:48

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('fundraisers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fundraiser',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False, verbose_name='UUID for the fundraiser'),
        ),
    ]
