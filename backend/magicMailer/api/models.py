from django.db import models
from api.managers import CustomUserManager
import string
import random
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class Timestamp(models.Model):
    '''Timestamp model for the database'''
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class CustomUser(AbstractBaseUser, PermissionsMixin):
    '''Creates a new user'''
    id = models.CharField(max_length=10, null=False, primary_key=True)
    first_name = models.CharField(max_length=40, null=False)
    last_name = models.CharField(max_length=40, null=False)
    email = models.EmailField(max_length=200, unique=True, null=False)
    date_created = models.DateTimeField(auto_now_add=True)

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def generate_unique_id(self):
        length = 10
        chars = string.ascii_uppercase + string.digits
        code = ''.join(random.choice(chars) for _ in range(length))
        while self.__class__.objects.filter(id=code).exists():
            code = self.generate_unique_id()
        return code


    def save(self, *args, **kwargs):
        if not self.id:
            self.id = self.generate_unique_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Contact(Timestamp):
    '''Contact model'''
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)


class ContactGroup(Timestamp):
    '''Group model'''
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    contacts = models.ManyToManyField(Contact, blank=True)
    description = models.CharField(max_length=255)


class EmailContent(models.Model):
    '''EMail content model'''
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    salutation = models.CharField(max_length=255)
    subject = models.CharField(max_length=255)
    body = models.CharField(max_length=1024)
