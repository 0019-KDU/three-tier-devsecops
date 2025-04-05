from django.urls import path,include
from .views import UserViewSet, health_check
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('health/', health_check, name='health-check')
]