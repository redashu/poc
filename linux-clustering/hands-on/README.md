### Linux server clustering using pacemaker and corosync 

## lab details 

<ul>
  <li> using 4 Oracle linux 8.8 VM  </li>
  <li> DNS must be configured   </li>
  <li> If firewalld is running then configure it accordingly   </li>
</ul>

# Creating 3 node cluster 

## Things to be performed on each node 

### Installing software required

```
yum install pcs fence-agents-all pacemaker corosync -y 
```

### activating firewall

```
firewall-cmd --permanent --add-service=high-availability
firewall-cmd --reload
```

### enable pcsd 

```
systemctl enable --now pcsd
```

### setting passwor for default user

```
echo Mypassword@123 | passwd --stdin hacluster
```

## Time to create cluster 

### step 1 
```
pcs host auth node1.example.com  node2.example.com  node3.example.com 
```

### step 2 

```
pcs cluster setup mycluster node1.example.com  node2.example.com  node3.example.com
```

### step 3 

```
pcs cluster enable --all
```

## Creating Resources and Resource groups 

### Filesystem resource creationn 


