# Generated by Django 4.2 on 2023-04-28 19:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fundraisers', '0007_alter_fundraiserlike_options_fundraisercomment'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='fundraisercomment',
            options={'verbose_name': 'FundraiserComment'},
        ),
    ]