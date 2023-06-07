# getting started

## Apache 2.2 ACL 

### module for ACL which is required 

```
[root@ip-172-31-14-54 conf.d]# httpd -M | grep -i authz_host
 authz_host_module (shared)
[root@ip-172-31-14-54 conf.d]# 
```

### In virtual host we have to configure 

```
[root@ip-172-31-14-54 conf.d]# cat acl.conf 
<virtualhost *:80>
servername localhost
documentroot /var/www/html/
<directory /var/www/html/>
order allow,deny
allow from all
deny from 192.168.1.200 103.59.75.239
</directory>

</virtualhost>

```

### OR you can also use like this 

```
<virtualhost *:80>
servername localhost
documentroot /var/www/html/
<directory /var/www/html/>
order deny,allow
deny from all
allow from 192.168.1.200 103.59.75.239
</directory>

</virtualhost>
```

## Apache 2.4 support above method but it has a new way to implement as well

### New way using new module 

```
[root@ip-172-31-14-54 conf.d]# httpd -v
Server version: Apache/2.4.57 ()
Server built:   May  3 2023 16:00:14
[root@ip-172-31-14-54 conf.d]# 
[root@ip-172-31-14-54 conf.d]# httpd -M | grep -i authz_core
 authz_core_module (shared)
[root@ip-172-31-14-54 conf.d]# 


```

### new configuration will look like 

```
[root@ip-172-31-14-54 conf.d]# cat acl.conf 
<virtualhost *:80>
servername localhost
documentroot /var/www/html/
<directory /var/www/html/>
<RequireAll>
  Require all granted
  Require not ip 10.252.46.165
  Require not host hostname.ashu.com
</RequireAll>
</directory>

</virtualhost>

```


