from django.shortcuts import render

# Create your views here.

from .models import DatabaseList, SqlDictionary
from users.models import Account
from libs.baseview import SuperUserpermissions
from libs.con_database import SQLgo
import logging
from django.http import HttpResponse
from django.db.models import Count
from rest_framework.response import Response
from .serializers import SqlInfoList
import json

CUSTOM_ERROR = logging.getLogger('mysite.managedb.views')


class DatabaseInfoDetail(SuperUserpermissions):
    '''
        delete:
                del conn_name
    '''

    def delete(self, request, pk):
        try:
            DatabaseList.objects.filter(conn_name=pk).delete()
            return Response('%s--已删除' % pk)
        except Exception as e:
            CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
            return HttpResponse(status=500)


class DatabaseInfo(SuperUserpermissions):
    '''
        get:
            list all data
        post:
            create database connection
    '''

    def get(self, request, pk=None):
        try:
            page = request.GET.get('page')
        except KeyError as e:
            CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
            return HttpResponse(status=500)
        else:
            try:
                pagenum = DatabaseList.objects.aggregate(alter_number=Count('id'))
                start_page = int(page) * 10 - 10
                end_page = int(page) * 10
                info = DatabaseList.objects.all()[start_page:end_page]
                serializers = SqlInfoList(info, many=True)
                return Response({'page': pagenum, 'data': serializers.data})
            except Exception as e:
                CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                return HttpResponse(status=500)

    def post(self, request, pk=None):
        try:
            data = json.loads(request.data.get('data'))
        except KeyError as e:
            CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
            return HttpResponse(status=500)
        else:
            try:
                DatabaseList.objects.get_or_create(
                    conn_name=data['conn_name'],
                    computer_room=data['computer_room'],
                    ip_address=data['ip_address'],
                    port=int(data['port']),
                    conn_user=data['username'],
                    conn_pwd=data['password']
                )
                return Response('数据库连接创建成功')
            except Exception as e:
                CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                return HttpResponse(status=500)

    def put(self, request, pk=None):
        try:
            ip_address = request.data.get('ip_address')
            user = request.data.get('user')
            password = request.data.get('password')
            port = int(request.data.get('port'))
        except KeyError as e:
            CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
            return HttpResponse(status=500)
        else:
            try:
                with SQLgo(ip=ip_address, user=user, password=password, port=port):
                    return Response('连接成功')
            except Exception as e:
                CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                return Response('连接失败')


class DatabaseNameList(SuperUserpermissions):
    '''
        put:
            列出数据库名字
    '''

    def put(self, request, pk=None):
        try:
            id = request.data['id']
        except KeyError as e:
            CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
            return HttpResponse(status=500)
        else:
            _connection = DatabaseList.objects.filter(id=id).first()
            try:
                with SQLgo(
                        ip=_connection.ip_address,
                        user=_connection.conn_user,
                        password=_connection.conn_pwd,
                        port=_connection.port
                ) as f:
                    res = f.execute('show databases')
                    database = [c for i in res for c in i]
                    return Response(database)
            except Exception as e:
                CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                return HttpResponse(status=500)


class GenerationDic(SuperUserpermissions):
    '''
        put
    '''

    @staticmethod
    def DicGenerate(id, basename):
        '''
        字典生成
        :param id:
        :param basename:
        :return:
        '''
        print(id, basename)
        _connection = DatabaseList.objects.filter(id=id).first()
        with SQLgo(
                ip=_connection.ip_address,
                user=_connection.conn_user,
                password=_connection.conn_pwd,
                port=_connection.port,
                db=basename
        ) as f:

            res = f.tablename()
            for i in res:
                EveryData = f.showtable(table_name=i)
                for c in EveryData:
                    SqlDictionary.objects.get_or_create(
                        field=c['Field'],
                        type=c['Type'],
                        extra=c['Extra'],
                        dbname=basename,
                        tablename=i,
                        tablecomment=c['TableComment'],
                        name=_connection.conn_name
                    )

    def put(self, request, pk=None):
        try:
            id = request.data.get('id')
            dbnames = json.loads(request.data.get('basename'))

        except KeyError as e:
            CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
            return HttpResponse(status=500)

        else:
            try:
                for dbname in dbnames:
                    self.DicGenerate(id, dbname)
                    return HttpResponse('ok')
            except Exception as e:
                CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                return HttpResponse(status=500)


class DatabaseDetail(SuperUserpermissions):
    '''
        delete:
            delete
        put:
            change connection detail
    '''

    def put(self, request, pk):
        pass

    def delete(self, request, pk):
        pass
