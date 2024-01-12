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


