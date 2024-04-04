## Spark is Doing everything using RDD 

### Important point to Remember in RDD data is getting stored in partitioned format

<img src="rddpart.png">


### RDD is having  2 kind of operations 

<ol>
    <li> Transformation </li>
    <li> Action </li>
</ol>

### Example of Transformation and action methods

<img src="rddops.png">


### Now Transformation is also having 2 types 

<ol>
    <li> narrow </li> ----->  Doing operation in ONE RDD (partition) -- and storing in just another RDD (partition)
    <li> Wide </li>  ------> Doing operation in ONE RDD (partition) -- and storing in many other  RDD (partition)
</ol>

### A visual Difference 

## Some Poluplar list of methods in Narrow transfromation 

### Narrorw Transformation 

<img src="narrow.png">

### Wide Transformation

<img src="wide.png">

## Now Popular spark context (sc) operations 

### SC is having lot of method inbuild -- here is some list 

# SparkContext Keywords

Below are some common methods and properties available in the SparkContext (`sc`) object:

1. **parallelize(data, numSlices)**:
   - Creates an RDD from a collection of data by distributing it across the specified number of partitions.

2. **textFile(path, minPartitions)**:
   - Reads a text file from the specified path and creates an RDD of strings, with each line in the file becoming an element of the RDD.

3. **wholeTextFiles(path, minPartitions)**:
   - Reads a directory of text files, where each file is read as a single record, with the file path as the key and the file content as the value.

4. **broadcast(variable)**:
   - Broadcasts a read-only variable to all worker nodes, making it accessible for efficient, distributed operations.

5. **accumulator(initialValue, accumulableParam)**:
   - Creates an accumulator, which is a shared variable that can be used to aggregate information across tasks or stages in a distributed computation.

6. **setCheckpointDir(dirPath)**:
   - Sets the directory for checkpointing RDDs, allowing for fault tolerance by saving RDD lineage information to a reliable storage system.

7. **stop()**:
   - Stops the SparkContext, releasing allocated resources and shutting down all associated components.

8. **appName**:
   - Property representing the name of the Spark application.

9. **defaultMinPartitions**:
   - Property representing the default minimum number of partitions to use when not explicitly specified.

10. **defaultParallelism**:
    - Property representing the default level of parallelism to use for operations like parallelize when the number of partitions is not specified.

These are some of the key methods and properties available in the SparkContext (`sc`) object that you can use to interact with Apache Spark and perform distributed computations.


