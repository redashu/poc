## getting started

### Mysql / mariadb  master & slave configuration 

### Master machine 

<ol>
    <li> It handle Read and Write both </li>
    <li>Changes in master will replicated to Slave </li>
</ol>

### Master slaves  

<ol>
    <li> It handle Read only operations </li>
    <li> Any changes in database on the master side will be replicating to slave </li>
</ol>

### Generic pic 

<img src="mastersl.png">

### Installation & configuration -- mysql / mariadb -- both are same 

## THings to perform on Master System 

###  Installing mariadb-server 

```
yum install mariadb-server
```
### Configuration 

```
[root@mysql-master ~]#  cd /etc/my.cnf.d/
[root@mysql-master my.cnf.d]# ls
client.cnf  mysql-clients.cnf  server.cnf
```

### adding configuration in server.conf  under [mysql] section 

```

[mysqld]
server-id = 1
log-bin = mariadb-bin

```
### starting mariadb-server 

```
[root@mysql-master ~]# systemctl start mariadb 
[root@mysql-master ~]# systemctl enable mariadb 
```

### setup root password and other configuration 

```
mysql_secure_installation 
```
### login to database 


```
[root@mysql-master ~]# mysql -u root -pRedhat
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 3
Server version: 5.5.68-MariaDB MariaDB Server

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> CREATE USER 'replica'@'%' IDENTIFIED BY 'Redhat';
MariaDB [(none)]> GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'replica'@'%';
MariaDB [(none)]> flush privileges;
MariaDB [(none)]>  FLUSH TABLES WITH READ LOCK;

===> checking 
MariaDB [(none)]> MariaDB [(none)]> show master status;
+--------------------+----------+--------------+------------------+
| File               | Position | Binlog_Do_DB | Binlog_Ignore_DB |
+--------------------+----------+--------------+------------------+
| mariadb-bin.000005 |      245 |              |                  |
+--------------------+----------+--------------+------------------+
1 row in set (0.00 sec)


```

## Things to perform on Slave systems

###  Installing mariadb-server 

```
[root@mysql-replica1 ~]# yum install mariadb-server
```

### configuration 

```
[root@mysql-replica1 ~]#  cd /etc/my.cnf.d/
[root@mysql-replica1 ~]# my.cnf.d]# ls
client.cnf  mysql-clients.cnf  server.cnf
```

### adding configuration server.cnf 

```
[mysqld]
server-id = 2
```

### starting mariadb-server 

```
[root@mysql-replica1 ~]# systemctl start mariadb 
[root@mysql-replica1 ~]# systemctl enable mariadb 
```

### setup root password and other configuration 

```
[root@mysql-replica1 ~]# mysql_secure_installation 
```

### login to database 

```
[root@mysql-replica1 my.cnf.d]# mysql -u root -pRedhat
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 4
Server version: 5.5.68-MariaDB MariaDB Server

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> CHANGE MASTER TO 
MASTER_HOST='172.31.32.63' ,
MASTER_USER='replica', 
MASTER_PASSWORD='Redhat', 
MASTER_PORT=3306, 
MASTER_LOG_FILE='mariadb-bin.000003',  # this file name you can check from master server using show master status;
MASTER_CONNECT_RETRY=10;

MariaDB [(none)]> start slave;
MariaDB [(none)]> show slave status;
```


# Now you create a new database or table entry in mysql master and check in slave 

### creating new database in master 

```
[root@mysql-master my.cnf.d]# mysql -u root -pRedhat
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 6
Server version: 5.5.68-MariaDB MariaDB Server

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> 
MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| hello              |
| mysql              |
| performance_schema |
+--------------------+
4 rows in set (0.00 sec)

MariaDB [(none)]> create database ok;
Query OK, 1 row affected (0.00 sec)

MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| hello              |
| mysql              |
| ok                 |
| performance_schema |
+--------------------+
5 rows in set (0.00 sec)

MariaDB [(none)]> exit;
Bye

```

## Now checking in slave side 

```
[root@mysql-replica1 my.cnf.d]# mysql -u root -pRedhat
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 6
Server version: 5.5.68-MariaDB MariaDB Server

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| hello              |
| mysql              |
| ok                 |
| performance_schema |
+--------------------+

```

## Happy Learning 




