data "aws_ami" "amazon_linux" {
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-2.0.*-x86_64-gp2"]
  }
  owners = ["amazon"]
}

resource "aws_instance" "saving_instance" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t3.micro"
  user_data     = file("./templates/saving_instance/user-data.sh")

  key_name  = var.saving_instance_key_name
  subnet_id = aws_subnet.saving_vpc.id

  iam_instance_profile = "instance_role-${var.prefix}-${terraform.workspace}"

  vpc_security_group_ids = [
    aws_security_group.saving_vpc.id
  ]

  tags = merge(
    local.common_tags,
    tomap({ "Name" = "${local.prefix}-saving_instance" })
  )
}

