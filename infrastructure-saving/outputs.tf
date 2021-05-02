output "bucket_name" {
  value = aws_s3_bucket.s3_bucket.id
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}

output "ec2_public_ip" {

  description = "List of public IP addresses assigned to the instances, if applicable"
  value       = aws_instance.saving_instance.public_ip
}
