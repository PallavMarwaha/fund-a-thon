# Generated by Django 4.2 on 2023-04-29 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_remove_customuser_college_student'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_student',
            field=models.BooleanField(default=False, help_text='Whether the user is a student or not.'),
        ),
    ]