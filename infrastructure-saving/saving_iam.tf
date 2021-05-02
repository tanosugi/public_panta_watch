resource "aws_iam_role" "instance_role" {
  name               = "instance_role-${var.prefix}-${terraform.workspace}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_policy_attachment" "ec2-role-attach" {
  name       = "ec2-role-attach-${var.prefix}-${terraform.workspace}"
  roles      = ["${aws_iam_role.instance_role.name}"]
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "instance_role" {
  name = "instance_role-${var.prefix}-${terraform.workspace}"
  role = aws_iam_role.instance_role.name
}
