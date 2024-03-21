## Tips for spark command 

### launching spark shell locally 

<p> By default it is going to consider Local system as spark master which is like standalone Mode </p>

```
I have no name!@551c674e792a:/opt/bitnami/spark$ spark-shell 
Setting default log level to "WARN".
To adjust logging level use sc.setLogLevel(newLevel). For SparkR, use setLogLevel(newLevel).
24/03/21 05:41:49 WARN NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
Spark context Web UI available at http://551c674e792a:4040
Spark context available as 'sc' (master = local[*], app id = local-1710999709904).
Spark session available as 'spark'.
Welcome to
      ____              __
     / __/__  ___ _____/ /__
    _\ \/ _ \/ _ `/ __/  '_/
   /___/ .__/\_,_/_/ /_/\_\   version 3.5.1
      /_/
         
Using Scala version 2.12.18 (OpenJDK 64-Bit Server VM, Java 17.0.10)
Type in expressions to have them evaluated.
Type :help for more information.

```

### launching spark shell in remote master 

```
I have no name!@551c674e792a:/opt/bitnami/spark$ spark-shell --master spark://spark-master:7077
Setting default log level to "WARN".
To adjust logging level use sc.setLogLevel(newLevel). For SparkR, use setLogLevel(newLevel).
24/03/21 05:42:51 WARN NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
Spark context Web UI available at http://551c674e792a:4040
Spark context available as 'sc' (master = spark://spark-master:7077, app id = app-20240321054251-0001).
Spark session available as 'spark'.
Welcome to
      ____              __
     / __/__  ___ _____/ /__
    _\ \/ _ \/ _ `/ __/  '_/
   /___/ .__/\_,_/_/ /_/\_\   version 3.5.1
      /_/
         
Using Scala version 2.12.18 (OpenJDK 64-Bit Server VM, Java 17.0.10)
Type in expressions to have them evaluated.
Type :help for more information.

scala> 


```


## Submiting job to cluster mode -- Make sure you have shared storage where your jar file is available 

```
 spark-submit  --class org.example.spark.BasicDataFrame --master spark://spark-master:7077     --deploy-mode cluster   target/basic-dataframe-maven-1.0-SNAPSHOT.jar


24/03/21 08:09:08 INFO SecurityManager: Changing view acls to: root,spark
24/03/21 08:09:08 INFO SecurityManager: Changing modify acls to: root,spark
24/03/21 08:09:08 INFO SecurityManager: Changing view acls groups to: 
24/03/21 08:09:08 INFO SecurityManager: Changing modify acls groups to: 
24/03/21 08:09:08 INFO SecurityManager: SecurityManager: authentication disabled; ui acls disabled; users with view permissions: root, spark; groups with view permissions: EMPTY; users with modify permissions: root, spark; groups with modify permissions: EMPTY
24/03/21 08:09:08 WARN NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
24/03/21 08:09:09 INFO Utils: Successfully started service 'driverClient' on port 35725.
24/03/21 08:09:09 INFO TransportClientFactory: Successfully created connection to spark-master/172.20.0.4:7077 after 13 ms (0 ms spent in bootstraps)
24/03/21 08:09:09 INFO ClientEndpoint: ... waiting before polling master for driver state
24/03/21 08:09:09 INFO ClientEndpoint: Driver successfully submitted as driver-20240321080909-0000
24/03/21 08:09:14 INFO ClientEndpoint: State of driver-20240321080909-0000 is FINISHED
24/03/21 08:09:14 INFO ClientEndpoint: State of driver driver-20240321080909-0000 is FINISHED, exiting spark-submit JVM.
24/03/21 08:09:14 INFO ShutdownHookManager: Shutdown hook called
24/03/21 08:09:14 INFO ShutdownHookManager: Deleting directory /tmp/spark-2ad95139-d377-4139-a034-157eba036026
root@af5b6b91e676:/opt/bitnami/spark/code1# spark-submit  --class org.example.spark.BasicDataFrame --master spark://spark-master:7077     --deploy-mode cluster   target/basic-dataframe-maven-1.0-SNAPSHOT.jar 
24/03/21 08:09:32 INFO SecurityManager: Changing view acls to: root,spark
24/03/21 08:09:32 INFO SecurityManager: Changing modify acls to: root,spark
24/03/21 08:09:32 INFO SecurityManager: Changing view acls groups to: 
24/03/21 08:09:32 INFO SecurityManager: Changing modify acls groups to: 
24/03/21 08:09:32 INFO SecurityManager: SecurityManager: authentication disabled; ui acls disabled; users with view permissions: root, spark; groups with view permissions: EMPTY; users with modify permissions: root, spark; groups with modify permissions: EMPTY
24/03/21 08:09:32 WARN NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
24/03/21 08:09:32 INFO Utils: Successfully started service 'driverClient' on port 38699.
24/03/21 08:09:32 INFO TransportClientFactory: Successfully created connection to spark-master/172.20.0.4:7077 after 11 ms (0 ms spent in bootstraps)
24/03/21 08:09:32 INFO ClientEndpoint: ... waiting before polling master for driver state
24/03/21 08:09:32 INFO ClientEndpoint: Driver successfully submitted as driver-20240321080932-0001
24/03/21 08:09:37 INFO ClientEndpoint: State of driver-20240321080932-0001 is FINISHED
24/03/21 08:09:37 INFO ClientEndpoint: State of driver driver-20240321080932-0001 is FINISHED, exiting spark-submit JVM.
24/03/21 08:09:37 INFO ShutdownHookManager: Shutdown hook called
24/03/21 08:09:37 INFO ShutdownHookManager: Deleting directory /tmp/spark-75339966-09dc-4982-bfd4-6e0224633309
```

### note: --- in this case you have to check logs in selected worker node only -- under $SPARK_HOME/work directory 

