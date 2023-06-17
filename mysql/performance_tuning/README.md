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
