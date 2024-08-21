from django.contrib import admin
from django.urls import path
from api.views import ApiStatus

urlpatterns = [
    path('admin/', admin.site.urls),
    path('status/', ApiStatus.as_view())
]
