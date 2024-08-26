from django.contrib import admin
from api import models

@admin.register(models.Contact)
class CusContactAdmintomUserAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.Contact._meta.fields]


@admin.register(models.CustomUser)
class CusContactAdmintomUserAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.CustomUser._meta.fields]

@admin.register(models.ContactGroup)
class CusContactAdmintomUserAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.ContactGroup._meta.fields]


@admin.register(models.EmailContent)
class CusContactAdmintomUserAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.EmailContent._meta.fields]
