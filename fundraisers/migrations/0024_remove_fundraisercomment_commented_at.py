# Generated by Django 4.2 on 2023-05-18 19:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fundraisers', '0023_order'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fundraisercomment',
            name='commented_at',
        ),
    ]
