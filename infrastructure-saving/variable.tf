variable "prefix" {
  default = "pandatch"
}

variable "project" {
  default = "pandatch-project"
}

variable "saving_instance_key_name" {
  default = "pandatch-key"
}

variable "DOMAIN_NAME" {}
variable "MAIN_SAVING_API" {}
variable "STAGING_SAVING_API" {}
variable "DEVELOP_SAVING_API" {}

locals {
  # default     = "tanosugi.com"
  dns_zone_name = var.DOMAIN_NAME
  # dns_zone_name = var.MAIN_SAVING_API
}

variable "subdomain" {
  description = "Subdomain per environment"
  type        = map(string)
  default     = {}
}

locals {
  tags = merge(
    var.subdomain,
    {
      main    = var.MAIN_SAVING_API
      staging = var.STAGING_SAVING_API
      develop = var.DEVELOP_SAVING_API
    }
  )
}
