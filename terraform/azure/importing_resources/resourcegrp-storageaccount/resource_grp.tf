resource "azurerm_resource_group" "example" {
  name = "ashu-manual-grp"
  location = "eastus"
}
resource "azurerm_storage_account" "example" {
  name                     = "ashutoshhstname"
  resource_group_name      = azurerm_resource_group.example.name
  location                 = azurerm_resource_group.example.location
  account_tier             = "Standard"
  account_replication_type = "RAGRS"
  allow_nested_items_to_be_public = false # added 
}

resource "azurerm_storage_container" "example" {
  name                  = "ashu-container"
  storage_account_name  = azurerm_storage_account.example.name
  container_access_type = "private"
}

resource "azurerm_storage_blob" "example" {
  name                   = "cmsec.png"
  storage_account_name   = azurerm_storage_account.example.name
  storage_container_name = azurerm_storage_container.example.name
  type                   = "Block"
  source                 = "cmsec.png"
  content_type = "image/png" # added
  content_md5 = "32b1c16a50921257ac1391f2d4a5cb98" # added
}