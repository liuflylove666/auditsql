from django.db import models

# Create your models here.


class DatabaseList(models.Model):
	'''
	数据库连接信息表
	'''
	conn_name = models.CharField(max_length=50)
	computer_room = models.CharField(max_length=50)
	ip_address = models.CharField(max_length=100)
	port = models.IntegerField()
	conn_user = models.CharField(max_length=50)
	conn_pwd = models.CharField(max_length=50)
	# describe = models.CharField(max_length=100)

class SqlDictionary(models.Model):
	dbname = models.CharField(max_length=100)
	tablename = models.CharField(max_length=100)
	field = models.CharField(max_length=100)
	type = models.CharField(max_length=100)
	null = models.CharField(max_length=100)
	default = models.CharField(max_length=100)
	extra = models.CharField(max_length=100)
	tablecomment = models.CharField(max_length=100)
	name = models.CharField(max_length=100, null=True)

	def __str__(self):
		return self.tablename