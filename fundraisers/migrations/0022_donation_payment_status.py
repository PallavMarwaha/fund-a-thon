# Generated by Django 4.2 on 2023-05-18 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fundraisers', '0021_remove_donation_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='donation',
            name='payment_status',
            field=models.IntegerField(default=0),
        ),
    ]