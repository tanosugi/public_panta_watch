#####################
# S3 RESOURCWS
#####################

resource "aws_s3_bucket" "s3_bucket" {
  bucket              = "${local.prefix}-app"
  acl                 = "public-read"
  force_destroy       = true
  acceleration_status = "Enabled"

  policy = <<EOF
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"PublicReadGetObject", 
      "Action":[
        "s3:GetObject"
      ],
      "Effect":"Allow",
      "Resource":"arn:aws:s3:::${local.prefix}-app/*",
      "Principal":"*"
    }
  ]
}
EOF

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  versioning {
    enabled = true
  }

  tags = local.common_tags
}
