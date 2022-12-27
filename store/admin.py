from django.contrib import admin
from .models import *

admin.site.unregister(User)
admin.site.register(Items)
admin.site.register(Categories)
admin.site.register(Order)
admin.site.register(User)

