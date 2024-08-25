# Generated by Django 4.2.15 on 2024-08-25 05:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_customuser_date_updated_customuser_groups_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='created_by',
            field=models.ForeignKey(default='HJASD', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
