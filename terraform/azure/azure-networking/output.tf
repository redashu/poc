# output "vm_ips1" {
#     value = azurerm_linux_virtual_machine.main-ashuvm[0].public_ip_address
# }

# output "vm_ips2" {
#     value = azurerm_linux_virtual_machine.main-ashuvm[1].public_ip_address  
# }

output "my_public_ips" {
    value = azurerm_public_ip.ashu-pubIP[*].ip_address
  
}
resource "null_resource" "store_ips" {
  provisioner "local-exec" {
    command = <<EOT
        #!/bin/bash
        echo "${join("\n", azurerm_public_ip.ashu-pubIP[*].ip_address)}" > public_ips.txt
EOT
  }
  
  depends_on = [azurerm_linux_virtual_machine.main-ashuvm]
}