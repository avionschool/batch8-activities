module AdminPermisson
    def edit_users_profile
      puts "Admin updated all users profile"
    end
end
  
module BuyerPermission
    def buy
      puts "Buyer has bought an item"
    end 
end
  
class User
    def initialize(username, password, ip_address)
        @username = username
        @password = password
        @ip_address = ip_address
    end
    # protected
    def admin_login
      puts "User logged in. IP address: #{@ip_address}"
    end
    def change_password
        puts "Password changed to: #{@password}"
    end
    def buyer_login
        puts "Buyer logged in. Name: #{@username}"
    end
end
  
class Admin < User
end
  
class Buyer < User
end
  
## execute
  
my_admin = Admin.new('avionuser', 'password', '127.0.0.1')
my_admin.admin_login
include AdminPermisson
my_admin.edit_users_profile

# my_admin.change_password = 'new_password'
my_admin.change_password
  
buyer = Buyer.new('juan', 'password', '127.0.0.1')
buyer.buyer_login
buyer.buy
  
# buyer.change_password = 'new_password'
buyer.change_password