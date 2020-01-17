from django.db import models

from django.contrib.auth.models import AbstractUser
# Create your models here.

class Account(AbstractUser):
    '''
    User table
    '''
    group = models.CharField(max_length=40)   #权限组 guest/admin
    department = models.CharField(max_length=40) #部门

    # class Meta:
    #     db_table =  'auth_user'


# class UserToken(models.Model):
#     username = models.OneToOneField(to=Account, on_delete=models.DO_NOTHING)
#     token = models.CharField(max_length=60)
#     class Meta:
#         db_table = 'user_token'


