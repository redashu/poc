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

