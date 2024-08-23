from rest_framework.serializers import ModelSerializer
from api.models import CustomUser


class UserSerializer:
    '''A serializer object for the custom user object'''
    model = CustomUser
    fields = ["first_name", "last_name", "email", "is_staff", "is_superuser", "date_created", "date_updated"]
