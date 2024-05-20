terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  skip_provider_registration = true # This is only required when the User, Service Principal, or Identity running Terraform lacks the permissions to register Azure Resource Providers.
  features {}
}

# calling modules 
module "ashu-azure-vm-resg" {
    source = "./modules/azure-vm"
    vm_name = "ashu-vm-prod" # replacing value of vm_name
  
}

