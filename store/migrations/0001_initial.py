# Generated by Django 3.2.16 on 2022-12-15 23:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id_category', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(blank=True, max_length=30, null=True)),
                ('eng_title', models.CharField(blank=True, max_length=30, null=True)),
            ],
            options={
                'db_table': 'categories',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Items',
            fields=[
                ('id_item', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('price', models.FloatField()),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('manufacturer', models.CharField(blank=True, max_length=30, null=True)),
                ('photo', models.ImageField(default=None, upload_to='')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='store.categories')),
            ],
            options={
                'db_table': 'items',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.TextField()),
                ('order_date', models.DateTimeField()),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='store.items')),
            ],
            options={
                'db_table': 'orders',
                'managed': True,
            },
        ),
    ]