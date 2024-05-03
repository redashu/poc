import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import autoscaling = require('aws-cdk-lib/aws-autoscaling');



// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsEcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // Reference your existing VPC
    const vpc = ec2.Vpc.fromLookup(this, 'ExistingVpc', {
      vpcId: 'vpc-0613e72a46c8cb335'
    });

    // this will create a new vpc in ecs cluster with default fargate infra
    const cluster = new ecs.Cluster(this,'mycluster',{
      clusterName: 'ashu-ecs-ckdcluster',
      vpc: vpc, // if we don't define vpc cdk will create its own 
      containerInsights: true, // Enable CloudWatch Container Insights
      enableFargateCapacityProviders: true

    });
    // Add capacity to it for ec2 type using auto scaling group 
      cluster.addCapacity('DefaultAutoScalingGroupCapacity', {
        instanceType: new ec2.InstanceType("t2.small"),
        desiredCapacity: 0,
        maxCapacity: 5,
        minCapacity: 0
      });

    // adding taskdefintion 
    // Define an ECS task definition for Fargate
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'ashuTaskDef', {
      cpu: 256, // CPU units
      memoryLimitMiB: 512, // Memory limit in MiB
    });

    // Add a container to the task definition
    const container = taskDefinition.addContainer('ashucdkc1', {
      image: ecs.ContainerImage.fromRegistry('docker.io/library/nginx:latest'), // Example image from Docker Hub
      memoryLimitMiB: 256, // Memory limit for the container in MiB
      portMappings: [{ containerPort: 80 }],
      
    });

    // Output the ARN of the task definition
    new cdk.CfnOutput(this, 'TaskDefinitionArn', {
      value: taskDefinition.taskDefinitionArn,
    });
  
    }
  }


