from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from libs.baseview import AnyLogin, BaseView, SuperUserpermissions
import logging
from django.contrib.auth import authenticate
from rest_framework_jwt.settings import api_settings
from rest_framework.response import Response
from .models import Account
from django.db.models import Count
from .serializers import UsersInfo

CUSTOM_ERROR = logging.getLogger('mysite.users.views')

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class UserInfoDetail(SuperUserpermissions):

    def delete(self, request, pk):
        try:
            Account.objects.filter(username=pk).delete()
            return Response('%s--用户已删除!' % pk)
        except Exception as e:
            CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
            return HttpResponse(status=500)

    def put(self, request, pk):
        try:
            pk = pk
        except Exception as e:
            CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
            return HttpResponse(status=500)
        if pk == 'changemail':
            try:
                username = request.data.get('username')
                email = request.data.get('email')
            except KeyError as e:
                CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                return HttpResponse(status=500)
            else:
                try:
                    Account.objects.filter(username=username).update(email=email)
                    return Response('%s--邮件修改完成' % username)
                except Exception as e:
                    CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                    return HttpResponse(status=500)
        elif pk == 'changegroup':
            try:
                group = request.data.get('group')
                department = request.data.get('department')
                username = request.data.get('username')
            except KeyError as e:
                CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                return HttpResponse(status=500)
            else:
                try:
                    if group == 'admin':

                        Account.objects.filter(username=username).update(
                            group=group,
                            department=department,
                            is_staff=1)
                        return Response('%s--用户组修改成功!' % username)
                    elif group == 'guest':
                        Account.objects.filter(username=username).update(
                            group=group,
                            department=department,
                            is_staff=0)
                        return Response('%s--用户组修改成功!' % username)
                except Exception as e:
                    CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                    return HttpResponse(status=500)
        elif pk == 'changepwd':
            try:
                username = request.data.get('username')
                old_pwd = request.data.get('old')
                new_pwd = request.data.get('new')
            except KeyError as e:
                CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                return HttpResponse(status=500)

            else:
                try:
                    user = authenticate(username=username, password=old_pwd)
                    if user is not None and user.is_active:
                        user.set_password(new_pwd)
                        user.save()
                    return Response('%s--密码修改成功！' % username)
                except Exception as e:
                    CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                    return HttpResponse(status=500)


class UserInfoViewSet(SuperUserpermissions):
    '''
        User Management interface
        method:
        get:
            all
        put:
            changepwd && changegroup
        post:
            add user
        delete:
            del user
    '''

    def get(self, request, pk=None):
        try:
            page = request.GET.get('page')
        except KeyError as e:
            CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
            return HttpResponse(status=500)

        else:
            try:
                pagenum = Account.objects.aggregate(alter_number=Count('id'))
                start_page = int(page) * 10 - 10
                end_page = int(page) * 10
                userdetail = Account.objects.all()[start_page:end_page]
                seri_data = UsersInfo(userdetail, many=True).data
                return Response({'page': pagenum, 'data': seri_data})
            except Exception as e:
                CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                return HttpResponse(e)

    def post(self, request, pk=None):
        try:
            print(request.data)
            username = request.data.get('username')
            password = request.data.get('password')
            group = request.data.get('group')
            department = request.data.get('department')
            email = request.data.get('email')
        except KeyError as e:
            CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
            return HttpResponse(status=500)

        else:
            try:
                if group == 'admin':
                    user = Account.objects.create_user(
                        username=username,
                        password=password,
                        group=group,
                        department=department,
                        email=email,
                        is_staff=1
                    )
                    user.save()
                    return Response('%s 用户注册成功' % username)
                elif group == 'guest':
                    user = Account.objects.create_user(
                        username=username,
                        password=password,
                        group=group,
                        department=department,
                        email=email
                    )
                    user.save()
                    return Response('%s 用户注册成功' % username)
            except Exception as e:
                CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                return HttpResponse(status=500)


class login_auth(AnyLogin):
    def post(self, request, *args, **kwargs):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            print(username, password)

        except KeyError as e:
            CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')

        else:
            permissions = authenticate(username=username, password=password)
            if permissions is not None and permissions.is_active:
                token = jwt_encode_handler(jwt_payload_handler(permissions))
                return Response({'token': token, 'res': '', 'permissions': permissions.group})
            else:
                return HttpResponse(status=400)
