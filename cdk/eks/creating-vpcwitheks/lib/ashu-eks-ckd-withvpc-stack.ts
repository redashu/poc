import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AshuEksCkdWithvpcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC for the EKS cluster
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 3, // Maximum availability zones
    });
    // iam role for cluster 
    const eksAdminRole = new iam.Role(this, 'EksAdminRole', {
      assumedBy: new iam.AccountRootPrincipal(),
    });

    const cluster = new eks.Cluster(this, 'ashuEKS', {
      vpc,
      version: eks.KubernetesVersion.V1_29,
      mastersRole: eksAdminRole,
      clusterName: 'cdkekscluster',
      endpointAccess: eks.EndpointAccess.PUBLIC,
      defaultCapacity: 0,
    });

  
    // Add a Fargate profile to the cluster
    cluster.addFargateProfile('MyFargateProfile', {
      selectors: [{ namespace: 'default' }], // Apply Fargate to pods in the 'default' namespace
    });

    // Create a node group with EC2 worker nodes
    cluster.addAutoScalingGroupCapacity('MyNodeGroup', {
      instanceType: new ec2.InstanceType('t2.small'),
      minCapacity: 2,
      maxCapacity: 10,
    });
  }
}

