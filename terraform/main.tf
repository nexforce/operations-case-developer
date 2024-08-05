provider "aws" {
  region = "us-east-1"
}

# Create a VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "main-vpc"
  }
}

# Create Subnets
resource "aws_subnet" "subnet1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "subnet1"
  }
}

resource "aws_subnet" "subnet2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1b"

  tags = {
    Name = "subnet2"
  }
}

# Create a Security Group for EC2
resource "aws_security_group" "ec2_sg" {
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ec2_sg"
  }
}

# Create a Security Group for RDS
resource "aws_security_group" "rds_sg" {
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds_sg"
  }
}

# Create an EC2 Instance
resource "aws_instance" "web" {
  ami                    = "ami-0c55b159cbfafe1f0" # Amazon Linux 2
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.subnet1.id
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]

  tags = {
    Name = "web-server"
  }

  user_data = <<-EOF
                #!/bin/bash
                yum update -y
                yum install -y docker
                service docker start
                usermod -a -G docker ec2-user
                docker run -d -p 80:80 my-container-image
                EOF
}

# Create a DB Subnet Group
resource "aws_db_subnet_group" "main" {
  name       = "main-subnet-group"
  subnet_ids = [aws_subnet.subnet1.id, aws_subnet.subnet2.id]

  tags = {
    Name = "main-subnet-group"
  }
}

# Create the PostgreSQL RDS instance
resource "aws_db_instance" "postgres" {
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "14"
  instance_class         = "db.t3.micro"
  db_name                = var.db_name
  username               = var.db_username
  password               = var.db_password
  parameter_group_name   = "default.postgres14"
  publicly_accessible    = false
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  tags = {
    Name = "nexforce-case-postgres-instance"
  }
}

# Output the RDS endpoint
output "db_endpoint" {
  value = aws_db_instance.postgres.endpoint
}
