# How to setup aws CDK

## Steps to setup aws CDK 

### things to install 

- Install aws-cli & Configure access & secret key 
- Install Nodejs
- Install npm 

### Installing aws-cdk using npm 

```
npm install -g aws-cdk 
npm -g install typescript
```

### checking cdk version 

```
cdk --version 
2.136.1 (build 6f21c1d)

```

### Creating a seperate directory & do cdk init 
#### -- > below operation can take time 
```
cdk init --language=typescript

Applying project template app for typescript
# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.      

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template       

Executing npm install...
✅ All done!


```

## Next step is to bootstrap cdk -- this is in general one time job 

```
$ cdk bootstrap 
====>>
 ⏳  Bootstrapping environment aws://751136288263/us-east-1...
Trusted accounts for deployment: (none)
Trusted accounts for lookup: (none)
Using default execution policy of 'arn:aws:iam::aws:policy/AdministratorAccess'. Pass '--cloudformation-execution-policies' to customize.
CDKToolkit: creating CloudFormation changeset...
CDKToolkit |  0/12 | 12:48:08 AM | REVIEW_IN_PROGRESS   | AWS::CloudFormation::Stack | CDKToolkit User Initiated
CDKToolkit |  0/12 | 12:48:19 AM | CREATE_IN_PROGRESS   | AWS::CloudFormation::Stack | CDKToolkit Use
```

### Now we can depoy resources 

```
cdk deploy

===>>

✨  Synthesis time: 5.78s

AwsEcsStack:  start: Building 3e612704d3293200020fd7ed3c6c14957ce62ceddc48d63f0859c4f48e97c5b0:current_account-current_region
AwsEcsStack:  success: Built 3e612704d3293200020fd7ed3c6c14957ce62ceddc48d63f0859c4f48e97c5b0:current_account-current_region   
AwsEcsStack:  start: Publishing 3e612704d3293200020fd7ed3c6c14957ce62ceddc48d63f0859c4f48e97c5b0:current_account-current_region
AwsEcsStack:  success: Published 3e612704d3293200020fd7ed3c6c14957ce62ceddc48d63f0859c4f48e97c5b0:current_account-current_region
AwsEcsStack: deploying... [1/1]
AwsEcsStack: creating CloudFormation changeset...
AwsEcsStack | 0/2 | 12:50:12 AM | REVIEW_IN_PROGRESS   | AWS::CloudFormation::Stack | AwsEcsStack User Initiated
AwsEcsStack | 0/2 | 12:50:22 AM | CREATE_IN_PROGRESS   | AWS::CloudFormation::Stack | AwsEcsStack User Initiated
AwsEcsStack | 0/2 | 12:50:25 AM | CREATE_IN_PROGRESS   | AWS::CDK::Metadata | CDKMetadata/Default (CDKMetadata)
AwsEcsStack | 0/2 | 12:50:26 AM | CREATE_IN_PROGRESS   | AWS::CDK::Metadata | CDKMetadata/Default (CDKMetadata) Resource creation Initiated
AwsEcsStack | 1/2 | 12:50:26 AM | CREATE_COMPLETE      | AWS::CDK::Metadata | CDKMetadata/Default (CDKMetadata)
AwsEcsStack | 2/2 | 12:50:26 AM | CREATE_COMPLETE      | AWS::CloudFormation::Stack | AwsEcsStack

 ✅  AwsEcsStack

✨  Deployment time: 23.23s

Stack ARN:
arn:aws:cloudformation:us-east-1:751136288263:stack/AwsEcsStack/70e8fdd0-078f-11ef-8366-12a2c66487c1

✨  Total time: 29s


```




