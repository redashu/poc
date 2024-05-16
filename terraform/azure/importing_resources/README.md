## Important points 

- you can create terraform tf files or moduels 
- target any resource which you want to import 
- now create terraform files with all required details 
### example for Resource groups 
## rsgt.tf 
```
resource "azurerm_resource_group" "myname" {
  name = "ashu-manual-resourcesgrp1"
  location = "eastus"
}
```
## Note: 
- here this resource group does not exist in azure
- but the point is you need to right all the info what resource group terraform code need 
- then use 
```
terraform init 
terraform import azurerm_resource_group.myname /subscriptions/0a2bbe44-a2ed-4
```
### this will be resource id that you can get from terraform 
