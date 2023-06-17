## getting started

# Installing on RHEL 9 

### Installing postgresql-server

```
[root@ip-172-31-27-51 ~]# dnf install postgresql-server
Updating Subscription Management repositories.
Unable to read consumer identity

This system is not registered with an entitlement server. You can use subscription-manager to register.

Red Hat Enterprise Linux 9 for x86_64 - AppStream from RHUI (RPMs)   24 MB/s |  21 MB     00:00    
Red Hat Enterprise Linux 9 for x86_64 - BaseOS from RHUI (RPMs)      14 MB/s |  12 MB     00:00    
Red Hat Enterprise Linux 9 Client Configuration                      26 kB/s | 3.0 kB     00:00    
Dependencies resolved.
====================================================================================================
 Package                      Arch        Version             Repository                       Size
====================================================================================================
Installing:
 postgresql-server            x86_64      13.10-1.el9_1       rhel-9-appstream-rhui-rpms      5.8 M
Installing dependencies:

```

### creating configuration -- by Initializing 

```
[root@ip-172-31-27-51 ~]# postgresql-setup --initdb
 * Initializing database in '/var/lib/pgsql/data'
 * Initialized, logs are in /var/lib/pgsql/initdb_postgresql.log
```

### starting service 

```
[root@ip-172-31-27-51 ~]# systemctl start postgresql.service
[root@ip-172-31-27-51 ~]# systemctl enable postgresql.service
Created symlink /etc/systemd/system/multi-user.target.wants/postgresql.service → /usr/lib/systemd/system/postgresql.service.
[root@ip-172-31-27-51 ~]# systemctl status  postgresql.service
● postgresql.service - PostgreSQL database server
     Loaded: loaded (/usr/lib/systemd/system/postgresql.service; enabled; preset: disabled)
     Active: active (running) since Fri 2023-06-16 02:41:04 UTC; 11s ago
   Main PID: 14467 (postmaster)
      Tasks: 8 (limit: 4421)
```

# PSQL query 

### help 

```
[root@ip-172-31-27-51 ~]# su - postgres 
Last login: Fri Jun 16 02:52:32 UTC 2023 on pts/0
[postgres@ip-172-31-27-51 ~]$ psql 
psql (13.10)
Type "help" for help.

postgres=# \h
Available help:
  ABORT                            CHECKPOINT                       CREATE USER                      DROP TRIGGER
  ALTER AGGREGATE                  CLOSE                            CREATE USER MAPPING              DROP TYPE
  ALTER COLLATION                  CLUSTER                          CREATE VIEW                      DROP USER
```

## setting  password for postgres user

```
postgres=# alter user postgres with password 'Redhat@1234';
ALTER ROLE

```

### creating some new user 

```
[postgres@ip-172-31-27-51 ~]$ psql 
psql (13.10)
Type "help" for help.

postgres=# 
postgres=# \du
                                   List of roles
 Role name |                         Attributes                         | Member of 
-----------+------------------------------------------------------------+-----------
 ashu      |                                                            | {}
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}

postgres=# 
postgres=# 
postgres=# create user  mack with password 'okGoogle' Create db ;
ERROR:  syntax error at or near "Create"
LINE 1: create user  mack with password 'okGoogle' Create db ;
                                                   ^
postgres=# create user  mack with password 'okGoogle'  CREATEDB CREATEROLE ;
CREATE ROLE
postgres=# \du
                                   List of roles
 Role name |                         Attributes                         | Member of 
-----------+------------------------------------------------------------+-----------
 ashu      |                                                            | {}
 mack      | Create role, Create DB                                     | {}
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}


```


### listing of databases

```
postgres=# \l
                                  List of databases
   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges   
-----------+----------+----------+-------------+-------------+-----------------------
 postgres  | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 template0 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |          |          |             |             | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |          |          |             |             | postgres=CTc/postgres
(3 rows)

```

### creating database 

```
postgres=# create database helloc;
CREATE DATABASE
postgres=# \l
                                  List of databases
   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges   
-----------+----------+----------+-------------+-------------+-----------------------
 helloc    | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 postgres  | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 

```

### create table 

```
postgres=# \c helloc;
You are now connected to database "helloc" as user "postgres".

helloc=# create table emp (
helloc(# id serial primary key,
helloc(# name varchar(30) not null,
helloc(# email char(50) not null,
helloc(# remarks varchar(50)
helloc(# );
CREATE TABLE
helloc=# 


```

### listing table 

```
helloc=# \dt
        List of relations
 Schema | Name | Type  |  Owner   
--------+------+-------+----------
 public | emp  | table | postgres
(1 row)

```

### OR we can list it 

```
helloc=# \d
             List of relations
 Schema |    Name    |   Type   |  Owner   
--------+------------+----------+----------
 public | emp        | table    | postgres
 public | emp_id_seq | sequence | postgres
(2 rows)


```

## Note: in above you seel one extra table of id field -- 

#### when you use serial indexing this is for auto_increment which got created

### Inserting data into table

```
helloc=# INSERT INTO emp (name,  email)
VALUES
  ('John Doe', 'john.doe@example.com'),
  ('Jane Smith', 'jane.smith@example.com');
INSERT 0 2
helloc=# 

```

### how to describe table

```
helloc=# \d emp;
                                    Table "public.emp"
 Column  |         Type          | Collation | Nullable |             Default             
---------+-----------------------+-----------+----------+---------------------------------
 id      | integer               |           | not null | nextval('emp_id_seq'::regclass)
 name    | character varying(30) |           | not null | 
 email   | character(50)         |           | not null | 
 remarks | character varying(50) |           |          | 
Indexes:
    "emp_pkey" PRIMARY KEY, btree (id)

```

### printing some info 

```
 helloc=# select  * from emp;
 id |    name    |                       email                        | remarks 
----+------------+----------------------------------------------------+---------
  1 | John Doe   | john.doe@example.com                               | 
  2 | Jane Smith | jane.smith@example.com                             | 
(2 rows)

helloc=# select id,email from emp;
 id |                       email                        
----+----------------------------------------------------
  1 | john.doe@example.com                              
  2 | jane.smith@example.com                            
(2 rows)

helloc=# select email from emp where id=2;
                       email                        
----------------------------------------------------
 jane.smith@example.com                            
(1 row)

```

