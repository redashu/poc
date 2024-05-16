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
# creating resource group 
resource "azurerm_resource_group" "ashu-rsg-name" {
    name = var.resource_group_name
    location = var.azure_region
  
}
# creating azure network
resource "azurerm_virtual_network" "ashu-network" {
    name = var.azure_network_name
    location = var.azure_region
    resource_group_name = azurerm_resource_group.ashu-rsg-name.name
    address_space = var.vnet_address_space
  
}

# creating subnet 1 
resource "azurerm_subnet" "ashu-fronend-subnet" {
    name = "ashu-subnet1"
    resource_group_name = azurerm_resource_group.ashu-rsg-name.name
    virtual_network_name = azurerm_virtual_network.ashu-network.name
    address_prefixes = var.frontsubnet_address_space
  
}

resource "azurerm_subnet" "ashu-backend-subnet" {
    name = "ashu-subnet2"
    resource_group_name = azurerm_resource_group.ashu-rsg-name.name
    virtual_network_name = azurerm_virtual_network.ashu-network.name
    address_prefixes = var.backsubnet_address_space
  
}

# creating security group 
resource "azurerm_network_security_group" "ashu_net_rule_frontend" {
    name = "ashu_firewall_frontend"
    resource_group_name = azurerm_resource_group.ashu-rsg-name.name
    location = var.azure_region
  
}

# allow security group to 80 and 22
resource "azurerm_network_security_rule" "ssh" {
    name = "ashu_firewall1"
    network_security_group_name = azurerm_network_security_group.ashu_net_rule_frontend.name
    resource_group_name = azurerm_resource_group.ashu-rsg-name.name
    priority = 102
    direction = "Inbound"
    access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22-80"  # we can put * 
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  
}
# associate security group with NIC  
resource "azurerm_network_interface_security_group_association" "ashunic-attach" {
    network_interface_id = azurerm_network_interface.ashu_nic1[count.index].id
    network_security_group_id = azurerm_network_security_group.ashu_net_rule_frontend.id
    count = 2 
}

# associate security group with subnet also
# resource "azurerm_subnet_network_security_group_association" "subnetfron-associate" {
#   subnet_id = azurerm_subnet.ashu-fronend-subnet
#   network_security_group_id = azurerm_network_security_group.ashu_net_rule_frontend.id
# }
resource "azurerm_public_ip" "ashu-pubIP" {
  name                = "acceptanceTestPublicIp1-${count.index}"
  resource_group_name = azurerm_resource_group.ashu-rsg-name.name
  location            = var.azure_region
  allocation_method   = "Static"
  count = 2 

  tags = {
    environment = "Production"
  }
}

resource "azurerm_network_interface" "ashu_nic1" {
  name                = "ashu-nicc-${count.index}"
  location            = var.azure_region
  resource_group_name = azurerm_resource_group.ashu-rsg-name.name
  count = 2

  ip_configuration {
    name                          = "internal-${count.index}"
    subnet_id                     = azurerm_subnet.ashu-fronend-subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id = azurerm_public_ip.ashu-pubIP[count.index].id
  }
}

resource "azurerm_linux_virtual_machine" "main-ashuvm" {
  name                = "ashu-vm-${count.index}"
  resource_group_name = azurerm_resource_group.ashu-rsg-name.name
  location            = var.azure_region
  size                = var.vm_size
  count = 2 
  admin_username      = "adminuser"
  network_interface_ids = [ azurerm_network_interface.ashu_nic1[count.index].id     ]

  admin_ssh_key {
    username   = "adminuser"
    public_key = file("~/.ssh/id_rsa.pub")
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }

  os_disk {
    storage_account_type = "Standard_LRS"
    caching              = "ReadWrite"
  }
}

# store ip 
