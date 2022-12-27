from django.contrib import admin
from django.urls import path, include
from store import views
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'categories', views.CategoriesViewSet)
router.register(r'items', views.ItemsViewSet, basename='items')
router.register(r'items-depth', views.ItemsDepthViewSet, basename='items-depth')
router.register(r'user', views.UserViewSet)
router.register(r'orders', views.OrdersViewSet)
router.register(r'orders-depth', views.OrdersDepthViewSet, basename='orders-depth')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('add_user', views.get_json, name='get_json'),
    path('api/user', views.user, name='user'),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/obtain', TokenObtainPairView.as_view(), name='token_obtain'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
