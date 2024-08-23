from django.urls import path
from api.views import SignupView

urlpatterns = [
    path('signup', SignupView.as_view()),
]
