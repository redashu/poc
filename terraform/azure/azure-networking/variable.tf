variable "resource_group_name" {
    type = string
    default = "ashu-tf-group"
  
}

variable "azure_region" {
    type = string
    default = "Central US"
  
}
variable "azure_network_name" {
    type = string
    default = "ashu_virtual_network1"
  
}
# New variable for address space
variable "vnet_address_space" {
  type = list(string)
  default = ["10.0.0.0/16"]
}
# New variable for subnet space
variable "frontsubnet_address_space" {
  type = list(string)
  default = ["10.0.1.0/24"]
}
variable "backsubnet_address_space" {
  type = list(string)
  default = ["10.0.2.0/24"]
}

variable "vm_size" {
    type = string
    default = "Standard_B1s"
  
}