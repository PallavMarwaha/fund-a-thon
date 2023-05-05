# Generated by Django 4.2 on 2023-05-05 15:21

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('fundraisers', '0019_alter_fundraiser_about_alter_fundraiser_details_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fundraiser',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, verbose_name='UUID for the fundraiser'),
        ),
    ]
