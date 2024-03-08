### Introduction to Runners 

## choosing windows runners 

```
tags:  # using tags keyword we can refer specific runners
  - windows 
first-job:
  script:
    - systeminfo 
```


## Installing runner in aws amazon linux 2 

### Step - Installation 

```
yum install git -y 
```

### Installing gitlab runner rpm 

```
rpm -ivh https://s3.dualstack.us-east-1.amazonaws.com/gitlab-runner-downloads/latest/rpm/gitlab-runner_amd64-fips.rpm
```

## Note:  this may show some warning 

### :- 

1.  THis will install all the commands and create a gitlab-runner user also

2. You just to perform Register and start operation -- it was not in previous version

### Register with gitlab server 

```
[ec2-user@ip-172-31-85-47 ~]$ sudo gitlab-runner register

====>>> it gonna ask things like given below
Runtime platform                                    arch=amd64 os=linux pid=3742 revision=782c6ecb version=16.9.1
Running in system-mode.                            
                                                   
Enter the GitLab instance URL (for example, https://gitlab.com/):
https://gitlab.com/
Enter the registration token:
GR1348941qFfJfi88Nd7kDN84RBC8
Enter a description for the runner:
[ip-172-31-85-47.ec2.internal]: 
Enter tags for the runner (comma-separated):
aws2,linux2
Enter optional maintenance note for the runner:

WARNING: Support for registration tokens and runner parameters in the 'register' command has been deprecated in GitLab Runner 15.6 and will be replaced with support for authentication tokens. For more information, see https://docs.gitlab.com/ee/ci/runners/new_creation_workflow 
Registering runner... succeeded                     runner=GR1348941qFfJfi88
Enter an executor: shell, ssh, parallels, virtualbox, docker, custom, docker+machine, kubernetes, docker-autoscaler, instance, docker-windows:
shell
Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
 
Configuration (with the authentication token) was saved in "/etc/gitlab-runner/config.toml"
```

### Now starting service 

```
sudo systemctl restart  gitlab-runner
```
