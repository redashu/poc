import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import autoscaling = require('aws-cdk-lib/aws-autoscaling');
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';




// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsEcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // Reference your existing VPC
    const vpc = ec2.Vpc.fromLookup(this, 'ExistingVpc',   {
      vpcId: 'vpc-0613e72a46c8cb335'
    });

    // this will create a new vpc in ecs cluster with default fargate infra
    const cluster = new ecs.Cluster(this,'mycluster',{
      clusterName: 'ashu-ecs-ckdcluster',
      vpc: vpc, // if we don't define vpc cdk will create its own 
      containerInsights: true, // Enable CloudWatch Container Insights
      enableFargateCapacityProviders: true

    });
    // // Add capacity to it for ec2 type using auto scaling group 
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

  // Creating ALB 
  const lb = new elbv2.ApplicationLoadBalancer(this, 'EcsAlb', {
    vpc: vpc,
    internetFacing: true, // Adjust based on your requirements
    
  });
  // creating listener or ALB 
  const listener = lb.addListener('PublicListener',  { 
    port: 80, open: true
 });
 
   // creating security group 
   const serviceSecurityGroup = new ec2.SecurityGroup(this, 'ServiceSecurityGroup', {
    vpc: vpc,
    description: 'Security group for MyEcsService'
  });
  serviceSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP traffic');
 
  // Create ECS Service to Run Tasks
  const service = new ecs.FargateService(this, 'ashuEcsService', {
    cluster,
    taskDefinition: taskDefinition, 
    desiredCount: 2, // Start with one running task
    serviceName: 'ashusvc1',
    assignPublicIp: true,
    securityGroups: [serviceSecurityGroup],
    
        });
    // attach ALB to service
    // Attach ALB to ECS Service
listener.addTargets('ECS', {
    port: 8080,
    targets: [service.loadBalancerTarget({
      containerName: 'ashucdkc1',
      containerPort: 80
    })],
    // include health check (default is none)
    healthCheck: {
      interval: cdk.Duration.seconds(60),
      path: "/",
      timeout: cdk.Duration.seconds(5),
    }
  });
  
    // **Retrieve the public IP of the first running task (with proper error handling)**
    // Output the ARN of the service
  new cdk.CfnOutput(this, 'ServiceArn', {
    value: service.serviceArn,
  });

  
    }
}




