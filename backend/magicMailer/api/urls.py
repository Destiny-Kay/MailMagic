from django.urls import path
from api.views import SignupView, UserView, LoginView, ContactsView, ContactGroupsView, AddContactGroupItemView, DeleteContactGroupItemView

urlpatterns = [
    path('users', UserView.as_view()),
    path('signup', SignupView.as_view()),
    path('login', LoginView.as_view()),
    path('contacts', ContactsView.as_view()),
    path('contacts/<int:contact_id>', ContactsView.as_view()),
    path('contactgroups', ContactGroupsView.as_view()),
    path('contactgroups/<int:contact_group_id>', ContactGroupsView.as_view()),
    path('contactgroups/<int:contact_group_id>/add', AddContactGroupItemView.as_view()),
    path('contactgroups/<int:contact_group_id>/delete/<int:contact_id>', DeleteContactGroupItemView.as_view()),
]
