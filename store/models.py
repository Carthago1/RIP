from django.db import models
from django.contrib.auth.models import User


class Categories(models.Model):
    id_category = models.AutoField(primary_key=True)
    title = models.CharField(max_length=30, blank=True, null=True)
    eng_title = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = True     
        db_table = 'categories'


class Items(models.Model):
    id_item = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    price = models.FloatField()
    description = models.CharField(max_length=255, blank=True, null=True)
    category = models.ForeignKey(Categories, on_delete=models.DO_NOTHING)
    manufacturer = models.CharField(max_length=30, blank=True, null=True)
    photo = models.ImageField(default=None)

    class Meta:
        managed = True    
        db_table = 'items'


class Order(models.Model):
    item = models.ForeignKey(Items, on_delete=models.DO_NOTHING)
    customer = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    status = models.TextField()
    order_date = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'orders'

