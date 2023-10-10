### Installing aws cloud in amazon linux 2 

### Install using Yum 

```
 sudo yum install amazon-cloudwatch-agent
```
### checking files 

```
[root@ip-172-31-40-145 ~]# rpm -ql amazon-cloudwatch-agent 
/etc/amazon/amazon-cloudwatch-agent
/etc/init/amazon-cloudwatch-agent.conf
/etc/systemd/system/amazon-cloudwatch-agent.service
/opt/aws/amazon-cloudwatch-agent
/opt/aws/amazon-cloudwatch-agent/LICENSE
/opt/aws/amazon-cloudwatch-agent/NOTICE
/opt/aws/amazon-cloudwatch-agent/RELEASE_NOTES
/opt/aws/amazon-cloudwatch-agent/THIRD-PARTY-LICENSES
/opt/aws/amazon-cloudwatch-agent/bin
/opt/aws/amazon-cloudwatch-agent/bin/CWAGENT_VERSION
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl
/opt/aws/amazon-cloudwatch-agent/bin/config-downloader
/opt/aws/amazon-cloudwatch-agent/bin/config-translator
/opt/aws/amazon-cloudwatch-agent/bin/start-amazon-cloudwatch-agent
/opt/aws/amazon-cloudwatch-agent/doc
/opt/aws/amazon-cloudwatch-agent/doc/amazon-cloudwatch-agent-schema.json
```

