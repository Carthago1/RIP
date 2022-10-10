from store.models import Categories, Items, Orders
from rest_framework import serializers


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id_category', 'title', 'eng_title']


class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = ['id_item', 'price', 'description', 'id_category', 'manufacturer', 'name']


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = ['id_order', 'id_customer', 'date_of_order', 'date_of_processing', 'date_of_receiving']
