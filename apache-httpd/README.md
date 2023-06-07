# Advaned apache httpd 

## Modules in apache httpd -- are extra plugin which support couple of advantages 

### location of modules loaded 

```
[root@ip-172-31-14-54 httpd]# cd /etc/httpd/
[root@ip-172-31-14-54 httpd]# ls
conf  conf.d  conf.modules.d  logs  modules  run  state
[root@ip-172-31-14-54 httpd]# ls -l
total 0
drwxr-xr-x 2 root root  37 Jun  7 07:55 conf
drwxr-xr-x 2 root root  82 Jun  7 07:55 conf.d
drwxr-xr-x 2 root root 226 Jun  7 07:55 conf.modules.d
lrwxrwxrwx 1 root root  19 Jun  7 07:55 logs -> ../../var/log/httpd
lrwxrwxrwx 1 root root  29 Jun  7 07:55 modules -> ../../usr/lib64/httpd/modules
lrwxrwxrwx 1 root root  10 Jun  7 07:55 run -> /run/httpd
lrwxrwxrwx 1 root root  19 Jun  7 07:55 state -> ../../var/lib/httpd
```

### above you can see modules directory 

```
[root@ip-172-31-14-54 httpd]# ls  modules/
mod_access_compat.so    mod_buffer.so         mod_headers.so              mod_negotiation.so     mod_sed.so
mod_actions.so          mod_cache.so          mod_heartbeat.so            mod_proxy.so           mod_setenvif.so
mod_alias.so            mod_cache_disk.so     mod_heartmonitor.so         mod_proxy_ajp.so       mod_slotmem_plain.so
mod_allowmethods.so     mod_cache_socache.so  mod_http2.so                mod_proxy_balancer.so  mod_slotmem_shm.so
mod_asis.so             mod_cgi.so            mod_include.so              mod_proxy_connect.so   mod_socache_dbm.so
```

### we can list modules using httpd command also 

```
[root@ip-172-31-14-54 httpd]# httpd -M 
Loaded Modules:
 core_module (static)
 so_module (static)
 http_module (static)
 access_compat_module (shared)
 actions_module (shared)
 alias_module (shared)
 allowmethods_module (shared)

```

### To load modules using configuration files there is a seperate directory for that

```
[root@ip-172-31-14-54 ~]# cd /etc/httpd/
[root@ip-172-31-14-54 httpd]# ls
conf  conf.d  conf.modules.d  logs  modules  run  state
[root@ip-172-31-14-54 httpd]# cd conf.modules.d/
[root@ip-172-31-14-54 conf.modules.d]# ls
00-base.conf  00-lua.conf  00-optional.conf  00-systemd.conf  10-h2.conf        README
00-dav.conf   00-mpm.conf  00-proxy.conf     01-cgi.conf      10-proxy_h2.conf
[root@ip-172-31-14-54 conf.modules.d]# 



[root@ip-172-31-14-54 conf.modules.d]# head   00-base.conf 

LoadModule access_compat_module modules/mod_access_compat.so
LoadModule actions_module modules/mod_actions.so
LoadModule alias_module modules/mod_alias.so

```

### Note : 

<p> If we want to Unload any modules then we can comment using #LoadModule </p>



