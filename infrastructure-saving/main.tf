provider "aws" {
  region = "ap-northeast-1"
}

terraform {
  backend "s3" {
    bucket         = "pandatch-tf-state"
    key            = "pandatch.tfstate"
    region         = "ap-northeast-1"
    dynamodb_table = "pandatch-tf-state-lock"
    # primary key of dynamodb_table is "LockID"
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"
  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManagedBy   = "Terraform"
    Owner       = "Tanosugi"
  }
}
