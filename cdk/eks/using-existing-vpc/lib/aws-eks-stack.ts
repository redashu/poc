import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as eks from 'aws-cdk-lib/aws-eks'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsEksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromVpcAttributes(this, 'ExistingVpc', {
      vpcId: 'vpc-0613e72a46c8cb335', // Replace with your existing VPC ID
      availabilityZones: ['us-east-1a', 'us-east-1b', 'us-east-1c'], // Add your existing VPC's availability zones
      publicSubnetIds:['subnet-0ffbfed9bbfa3b0ee','subnet-09d3a6a43989df57c','subnet-069de836c3be2a263']
    });

    const eksAdminRole = new iam.Role(this, 'EksAdminRole', {
      assumedBy: new iam.AccountRootPrincipal(),
  });

    const cluster = new eks.Cluster(this, 'ashuEKS', {
      vpc,
      version: eks.KubernetesVersion.V1_29,
      defaultCapacityInstance: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM),
      defaultCapacity: 2,
      mastersRole: eksAdminRole,
      clusterName: 'cdkekscluster',
      vpcSubnets: [{ subnetType: ec2.SubnetType.PUBLIC}],
      securityGroup:  ec2.SecurityGroup.fromSecurityGroupId(this, 'ExistingSecurityGroup', 'sg-05c14cfab5ff1fd6c'),
      endpointAccess: eks.EndpointAccess.PUBLIC
    });
    
    

    new cdk.CfnOutput(this, 'clusterName',{
      value: cluster.clusterName ,
      description: 'cluster name to connect cluster'
      
    });
    new cdk.CfnOutput(this, 'clusterregion',{
      value: cdk.Aws.REGION,
    });

  }
}
