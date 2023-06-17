## There are several parameter for performance tunning 

### listed below 

1. Indexing 

2. Query optimization

3. Configuration settings

4. Caching

5. Partitioning

6. Connection pooling

7. Buffering

8. Regular maintenance

9. Hardware upgrades

## Indexing 

<p>
Identify the columns: Determine which columns are frequently used in your queries and would benefit from indexing. These are typically columns involved in JOINs, WHERE clauses, and ORDER BY or GROUP BY operations.
</p>
<p>
Choose the index type: MySQL supports several index types, including B-tree, Hash, and Full-Text indexes. B-tree indexes are the most commonly used type and suitable for most scenarios. Select the appropriate index type based on the data characteristics and query requirements.
</p>
<p>
Create the index: You can create indexes using the CREATE INDEX statement or by adding the INDEX keyword when creating or altering a table.

Here's an example of creating an index using the CREATE INDEX statement:
</p>

### Indexing tables

```
mysql> desc emp;
+---------+-------------+------+-----+---------+----------------+
| Field   | Type        | Null | Key | Default | Extra          |
+---------+-------------+------+-----+---------+----------------+
| id      | int         | NO   | PRI | NULL    | auto_increment |
| name    | char(20)    | NO   |     | NULL    |                |
| email   | varchar(20) | NO   |     | NULL    |                |
| contact | int         | NO   |     | NULL    |                |
| remarks | char(30)    | YES  |     | NULL    |                |
+---------+-------------+------+-----+---------+----------------+
5 rows in set (0.01 sec)

mysql> create index emp_index  on emp (id,email,contact);
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0


```

## COnfiguration setting 

### innodb_buffer_pool_size

<p>
    This setting determines the size of the InnoDB buffer pool, which caches frequently accessed data and indexes in memory. It is one of the most critical settings for InnoDB performance. The recommended value for this setting is typically around 70-80% of the available memory on the server.
</p>


### max connection 

```
show variables like 'max_connections';
+-----------------+-------+
| Variable_name   | Value |
+-----------------+-------+
| max_connections | 151   |
+-----------------+-------+
1 row in set (0.00 sec)

```
