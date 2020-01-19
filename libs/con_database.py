#!/bin/usr/env python3
# -*- coding: utf8 -*-
# ----------------------
# Author: liuchunbo
# CreateTime: 2020/1/17 14:50
# ----------------------

import pymysql


class SQLgo(object):
    def __init__(self, ip=None, user=None, password=None, db=None, port=None):
        self.ip = ip
        self.user = user
        self.password = password
        self.db = db
        self.port = port
        self.conn = object

    def __enter__(self):
        self.conn = pymysql.connect(
            host=self.ip,
            user=self.user,
            password=self.password,
            db=self.db,
            port=self.port,
            charset='utf8mb4')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()

    # @staticmethod
    # def addDic(theIndex, word, value):
    #     theIndex.setdefault(word, []).append(value)

    def execute(self, sql=None):
        with self.conn.cursor() as cursor:
            sqllist = sql
            cursor.execute(sqllist)
            result = cursor.fetchall()
            self.conn.commit()
        return result

    # def search(self, sql=None):
    #     data_list = []
    #     with self.conn.cursor(cursor=pymysql.cursors.DictCursor) as cursor:
    #         sqllist = sql
    #         cursor.execute(sqllist)
    #         result = cursor.fetchall()
    #         for field in cursor.description:
    #             data_list.append({'title': field[0], 'key': field[0]})
    #         len = cursor.rowcount
    #         return {'data': result, 'title': data_list, 'len': len}

    # def showtable(self, table_name):
    #     with self.conn.cursor() as cursor:
    #         sqllist = '''
    #             select aa.COLUMN_NAME,aa.DATA_TYPE, aa.COLUMN_COMMENT,
    #             cc.TABLE_COMMENT from information_schema.`COLUMNS` as aa LEFT JOIN
    #             (select DISTINCT bb.TABLE_SCHEMA, bb.TABLE_NAME, bb.TABLE_COMMENT from information_schema.`tables` bb) cc
    #             ON (aa.TABLE_SCHEMA=cc.TABLE_SCHEMA and aa.TABLE_NAME=cc.TABLE_NAME)
    #             where aa.TABLE_SCHEMA = '%s' and aa.TABLE_NAME = '%s';
    #         ''' % (self.db, table_name)
    #         cursor.execute(sqllist)
    #         result = cursor.fetchall()
    #         td = [
    #             {
    #                 'Field': i[0],
    #                 'Type': i[1],
    #                 'Extra': i[2],
    #                 'TableComment': i[3]
    #             } for i in result
    #         ]
    #     return td

    #
    # def gen_alter(self, table_name):
    #     pass

    def tablename(self):
        with self.conn.cursor() as cursor:
            cursor.execute('show tables')
            result = cursor.fetchall()
            data = [c for i in result for c in i]
            return data

    def showtable(self, table_name):
        with self.conn.cursor() as cursor:
            sqllist = '''
                select aa.COLUMN_NAME,aa.DATA_TYPE, aa.COLUMN_COMMENT,
                cc.TABLE_COMMENT from information_schema.`COLUMNS` as aa LEFT JOIN
                (select DISTINCT bb.TABLE_SCHEMA, bb.TABLE_NAME, bb.TABLE_COMMENT from information_schema.`tables` bb) cc
                ON (aa.TABLE_SCHEMA=cc.TABLE_SCHEMA and aa.TABLE_NAME=cc.TABLE_NAME)
                where aa.TABLE_SCHEMA = '%s' and aa.TABLE_NAME = '%s';
            ''' % (self.db, table_name)
            cursor.execute(sqllist)
            result = cursor.fetchall()
            td = [
                {
                    'Field': i[0],
                    'Type': i[1],
                    'Extra': i[2],
                    'TableComment': i[3]
                } for i in result
            ]
        return td
