from django.db import connection  # ✅ Correct import
from django.http import JsonResponse
from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
def health_check(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1;")
        return JsonResponse({"status": "ok", "database": "connected"}, status=200)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
