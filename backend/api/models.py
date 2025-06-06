from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    roleNumber = models.IntegerField()

    def __str__(self):
        return self.username
