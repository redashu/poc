# Getting started with apache maven 

## Installing Maven on amazon-linux-2 

## Note: Minimum jdk 8 is required to install maven 

### Installing java 11 

```
  yum install java-11-amazon-corretto  -y
```

### Install maven maven-3.0.5-1

```
yum install maven -y
```

### Verify java and maven 

```
[root@ip-172-31-61-69 ~]# java --version 
openjdk 11.0.21 2023-10-17 LTS
OpenJDK Runtime Environment Corretto-11.0.21.9.1 (build 11.0.21+9-LTS)
OpenJDK 64-Bit Server VM Corretto-11.0.21.9.1 (build 11.0.21+9-LTS, mixed mode)

[root@ip-172-31-61-69 ~]# jps
4580 Jps

```

###

```
[root@ip-172-31-61-69 ~]# mvn --version 
Apache Maven 3.0.5 (Red Hat 3.0.5-17)
Maven home: /usr/share/maven
Java version: 11.0.21, vendor: Amazon.com Inc.
Java home: /usr/lib/jvm/java-11-amazon-corretto.x86_64
Default locale: en_US, platform encoding: ANSI_X3.4-1968
OS name: "linux", version: "5.10.205-195.804.amzn2.x86_64", arch: "amd64", family: "unix"
```

## Since maven is all java based project build and management tool 

### SO apache tomcat will be the server where we will deploy webapps by maven 

## setup apache tomcat in linux amazonlinux-2

### prerequisite 

<ol>
    <li> JDK8 or later </li>
      <li> tomcat binary  </li>
</ol>

### Downloading tomcat 10 package

```
cd /opt
 wget https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.18/bin/apache-tomcat-10.1.18.tar.gz
tar xvzf apache-tomcat-10.1.18.tar.gz

===>> verify it

[root@ip-172-31-61-69 tomcat]# ls /opt/
apache-tomcat-10.1.18  apache-tomcat-10.1.18.tar.gz 
```

### Creating a directory and user so that we can run tomcat with non root user power

```
sudo useradd -m -U -d /opt/tomcat -s /bin/false tomcat
```

### Copy data to /opt/tomcat/

```
 cp -rf    /opt/apache-tomcat-10.1.18/*  /opt/tomcat/
```

### fixing permissions

```
 sudo chown -R tomcat: /opt/tomcat
 sudo sh -c 'chmod +x /opt/tomcat/bin/*.sh'
```

## now we can start/stop tomcat service

```
[root@ip-172-31-61-69 tomcat]# /opt/tomcat/bin/startup.sh 
Using CATALINA_BASE:   /opt/tomcat
Using CATALINA_HOME:   /opt/tomcat
Using CATALINA_TMPDIR: /opt/tomcat/temp
Using JRE_HOME:        /
Using CLASSPATH:       /opt/tomcat/bin/bootstrap.jar:/opt/tomcat/bin/tomcat-juli.jar
Using CATALINA_OPTS:   
Tomcat started.


====>>

[root@ip-172-31-61-69 tomcat]# /opt/tomcat/bin/shutdown.sh 
Using CATALINA_BASE:   /opt/tomcat
Using CATALINA_HOME:   /opt/tomcat
Using CATALINA_TMPDIR: /opt/tomcat/temp
Using JRE_HOME:        /
Using CLASSPATH:       /opt/tomcat/bin/bootstrap.jar:/opt/tomcat/bin/tomcat-juli.jar
Using CATALINA_OPTS:   

```

## Additional steps 

### setting env 

```
[root@ip-172-31-61-69 tomcat]# cat  /root/.bashrc 
# .bashrc

# User specific aliases and functions

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi


TOMCAT=/opt/tomcat
PATH=$PATH:$TOMCAT/bin/
export PATH

```

### outcome --

```
[root@ip-172-31-61-69 ~]# shutdown.sh 
Using CATALINA_BASE:   /opt/tomcat
Using CATALINA_HOME:   /opt/tomcat
Using CATALINA_TMPDIR: /opt/tomcat/temp
Using JRE_HOME:        /
Using CLASSPATH:       /opt/tomcat/bin/bootstrap.jar:/opt/tomcat/bin/tomcat-juli.jar
Using CATALINA_OPTS:

=====>>

[root@ip-172-31-61-69 ~]# 
[root@ip-172-31-61-69 ~]# startup.sh 
Using CATALINA_BASE:   /opt/tomcat
Using CATALINA_HOME:   /opt/tomcat
Using CATALINA_TMPDIR: /opt/tomcat/temp
Using JRE_HOME:        /
Using CLASSPATH:       /opt/tomcat/bin/bootstrap.jar:/opt/tomcat/bin/tomcat-juli.jar
Using CATALINA_OPTS:   
Tomcat started.

```

### Configure Apache Tomcat Application Manager

<p> You will only have access to the Tomcat default page by default. You must configure the admin and administrator user accounts to access admin and other parts such as Server Status, App Manager, and Host Manager. The two manager apps referenced in the next sections must be configured per our requirements.

We must update the Tomcat User XML file, <b> /opt/tomcat/conf/tomcat-users.xml, </b> to create the users and set their roles. Don’t forget to take the backup of the current file. You can execute the following command to take the backup: 
</p>
