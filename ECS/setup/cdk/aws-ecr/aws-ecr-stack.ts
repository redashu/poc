import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
 

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsEcrStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // creating ECR private Repo 
    const repo = new ecr.Repository(this,'ashu-repo-ref', {
      //repositoryName: 'ashu-cdk-repo1',
      removalPolicy: cdk.RemovalPolicy.DESTROY , // to delete on destroy command 
      imageTagMutability: ecr.TagMutability.IMMUTABLE,
      imageScanOnPush: true
            
    });
    
    

  }
}
