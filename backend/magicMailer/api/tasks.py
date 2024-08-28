from api.models import CustomUser

from celery import shared_task

from api.models import EmailAccount
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


@shared_task
def mail_send_emails(user, sender_email, recipients, salutation, body, subject):
    '''sends emails in an asynchronous celery task'''
    email_account_instance = EmailAccount.objects.get(email_address=sender_email)
    message = MIMEMultipart()
    message['From'] = sender_email
    message['Subject'] = subject

    #TODO:Find a better way of checking the email service provider SMTP credentials.
    with smtplib.SMTP_SSL('smtp.gmail.com', 587) as server:
        try:
            server.login(sender_email, email_account_instance.password)
            for recipient in recipients:
                message['To'] = recipient
                message.attach(MIMEText(body, 'plain'))
                server.sendmail(sender_email, recipient, message.as_string())
        except Exception as e:
            print(e)
    return
