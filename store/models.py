from django.db import models


class Categories(models.Model):
    id_category = models.AutoField(primary_key=True)
    title = models.CharField(max_length=30, blank=True, null=True)
    eng_title = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'categories'


class Customers(models.Model):
    id_customer = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    date_of_birth = models.DateField(blank=True, null=True)
    date_of_registration = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customers'


class Items(models.Model):
    id_item = models.AutoField(primary_key=True)
    price = models.FloatField()
    description = models.CharField(max_length=255, blank=True, null=True)
    id_category = models.ForeignKey(Categories, models.DO_NOTHING, db_column='id_category')
    date_of_release = models.DateField(blank=True, null=True)
    name = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'items'


class Orderitems(models.Model):
    id_order_item = models.AutoField(primary_key=True)
    id_order = models.ForeignKey('Orders', models.DO_NOTHING, db_column='id_order')
    id_item = models.ForeignKey(Items, models.DO_NOTHING, db_column='id_item')

    class Meta:
        managed = False
        db_table = 'orderitems'


class Orders(models.Model):
    id_order = models.AutoField(primary_key=True)
    id_customer = models.ForeignKey('Customers', models.DO_NOTHING, db_column='id_customer')
    id_item = models.ForeignKey('items', models.DO_NOTHING, db_column='id_item')
    date_of_order = models.DateTimeField(blank=True, null=True)
    date_of_processing = models.DateTimeField(blank=True, null=True)
    date_of_receiving = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orders'

