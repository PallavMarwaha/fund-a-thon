# Generated by Django 4.2 on 2023-04-29 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fundraisers', '0008_alter_fundraisercomment_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='fundraiser',
            name='is_student',
            field=models.BooleanField(default=False, help_text='Whether the user is a student or not.'),
        ),
        migrations.AddField(
            model_name='fundraiser',
            name='slug',
            field=models.SlugField(default='none'),
            preserve_default=False,
        ),
    ]
