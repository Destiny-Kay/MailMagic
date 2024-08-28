from django.urls import path
from api.views import SignupView, UserView, LoginView, ContactsView, ContactGroupsView, AddContactGroupItemView, DeleteContactGroupItemView, GetContactGroupItemView, EmailAccountView, SendEMailsView

urlpatterns = [
    path('users', UserView.as_view()),
    path('users/<int:user_id>', UserView.as_view()),
    path('signup', SignupView.as_view()),
    path('login', LoginView.as_view()),
    path('emailaccounts', EmailAccountView.as_view()),
    path('emailaccounts/<int:emailaccount_id>', EmailAccountView.as_view()),
    path('contacts', ContactsView.as_view()),
    path('contacts/<int:contact_id>', ContactsView.as_view()),
    path('contactgroups', ContactGroupsView.as_view()),
    path('contactgroups/<int:contact_group_id>', ContactGroupsView.as_view()),
    path('contactgroups/<int:contact_group_id>/add', AddContactGroupItemView.as_view()),
    path('contactgroups/<int:contact_group_id>/contacts', GetContactGroupItemView.as_view()),
    path('contactgroups/<int:contact_group_id>/delete/<int:contact_id>', DeleteContactGroupItemView.as_view()),
    path('mail/send', SendEMailsView.as_view())
]
