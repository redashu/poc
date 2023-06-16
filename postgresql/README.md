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


