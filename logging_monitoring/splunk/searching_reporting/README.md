![Splunk Logo](https://upload.wikimedia.org/wikipedia/commons/f/f8/Splunk_logo.png)

# Splunk Searching and Reporting Overview

## Introduction to Search 
- splunk uses SPL to search into indexed data

<img src="spl.png">

## Key Features of SPL

### 1. Search Commands
- **Basic Search**: The most fundamental command used to retrieve events from the index.

```
  index=_internal error
  index=web sourcetype=access_combined | rex "user=(?<user>\w+)"
  index=web status=200 | where bytes > 1000
  index=web | fields host, status, bytes
  index=web | stats count by status
  index=web | chart count by status
  index=web | timechart count by status
  index=web | bucket _time span=1h | stats count by _time
  index=web | transaction session_id
  index=web | eventstats avg(bytes) as avg_bytes
  index=web | lookup user_lookup user OUTPUT user_fullname
```


### searching all the indexes 

<img src="allindex.png">

### Using OR operator in index 

<img src="orindex.png">

### matching some pattern using wild card 

<img src="wild.png">

### counting uniq ip address using stats

<img src="table1.png">

### counting number of events in particular index 

```
source="MOCK_DATA.csv" host="DESKTOP-52F5653" index="findmore" sourcetype="csv" | stats count
```

### using OR , AND 

```
index="security" OR index="webapp"  host=web1 AND process=sshd
```

### explanation 

- OR will be used in first 2 keywords like in indexes 
- AND will be used in last 2 keywords like host and process

### printing uniq host count 

```
(index="security" OR index="webapp")   AND process=sshd | stats dc(host)
```

### printing uniq host name 

```
(index="security" OR index="webapp")   AND process=sshd | stats count by host
```

## printing values of all different host along with count 

```
(index="security" OR index="webapp")   AND process=sshd | stats values(host) dc(host)
```

### using Alias to rename column in above example 

<img src="alias.png">

### searching for oldest and newest time 

```
(index="security" OR index="webapp")   AND process=sshd | stats first(_time) , last(_time)

```

## Some specific commands in SPL 

### top/rare 
- they oposite to each other 
- to see most occuring items use top 
- to see least occuring items use rare 

### most frequently occuring processes

```
(index="security" OR index="webapp")  | top limit=10 process

```
### least occuring processes

```
(index="security" OR index="webapp")  | rare limit=4 process
```


### view 

<img src="top.png">

## search / where command 

### Note: by default splunk is using search commnad 

```
search (index="security" OR index="webapp")  | stats count by host 
```

### printing uniq host which has occured more than 23000 times 

```
(index="security" OR index="webapp")  | stats count by host | where count>23000
```

## Timechart 
- in time chart time is always going to be in any of axis like either x or y

```
index="security" | timechart count
```

### events that happened more than 4000 times 

```
index="security" | timechart count | where count>4000
```

### check in span of 1 minute

```
index="security" | timechart span=1m count | where count>2000
```



## Knowledge Objects {KO's}

### Examples 

-- Getting an alert when i get 30 sales on my website is KO 
-- Getting an alert when a user is loggined on my website is an example of KO

<img src="ko.png">

