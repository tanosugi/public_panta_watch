# ====================
#
# VPC
#
# ====================
resource "aws_vpc" "saving_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true # DNS解決を有効化
  enable_dns_hostnames = true # DNSホスト名を有効化

  tags = {
    Name = "saving_vpc"
  }
}

# ====================
#
# Subnet
#
# ====================
resource "aws_subnet" "saving_vpc" {
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-northeast-1a"
  vpc_id            = aws_vpc.saving_vpc.id

  # trueにするとインスタンスにパブリックIPアドレスを自動的に割り当ててくれる
  map_public_ip_on_launch = true

  tags = {
    Name = "saving_vpc"
  }
}

# ====================
#
# Internet Gateway
#
# ====================
resource "aws_internet_gateway" "saving_vpc" {
  vpc_id = aws_vpc.saving_vpc.id

  tags = {
    Name = "saving_vpc"
  }
}

# ====================
#
# Route Table
#
# ====================
resource "aws_route_table" "saving_vpc" {
  vpc_id = aws_vpc.saving_vpc.id

  tags = {
    Name = "saving_vpc"
  }
}

resource "aws_route" "saving_vpc" {
  gateway_id             = aws_internet_gateway.saving_vpc.id
  route_table_id         = aws_route_table.saving_vpc.id
  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_route_table_association" "saving_vpc" {
  subnet_id      = aws_subnet.saving_vpc.id
  route_table_id = aws_route_table.saving_vpc.id
}

# ====================
#
# Security Group
#
# ====================
resource "aws_security_group" "saving_vpc" {
  vpc_id = aws_vpc.saving_vpc.id
  name   = "saving_vpc"

  tags = {
    Name = "saving_vpc"
  }
}

# インバウンドルール(ssh接続用)
resource "aws_security_group_rule" "in_ssh" {
  security_group_id = aws_security_group.saving_vpc.id
  type              = "ingress"
  cidr_blocks       = ["0.0.0.0/0"]
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
}

# インバウンドルール(http接続用)
resource "aws_security_group_rule" "in_http" {
  security_group_id = aws_security_group.saving_vpc.id
  type              = "ingress"
  cidr_blocks       = ["0.0.0.0/0"]
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
}

# インバウンドルール(https接続用)
resource "aws_security_group_rule" "in_https" {
  security_group_id = aws_security_group.saving_vpc.id
  type              = "ingress"
  cidr_blocks       = ["0.0.0.0/0"]
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
}

# インバウンドルール(pingコマンド用)
resource "aws_security_group_rule" "in_icmp" {
  security_group_id = aws_security_group.saving_vpc.id
  type              = "ingress"
  cidr_blocks       = ["0.0.0.0/0"]
  from_port         = -1
  to_port           = -1
  protocol          = "icmp"
}

# アウトバウンドルール(全開放)
resource "aws_security_group_rule" "out_all" {
  security_group_id = aws_security_group.saving_vpc.id
  type              = "egress"
  cidr_blocks       = ["0.0.0.0/0"]
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
}
