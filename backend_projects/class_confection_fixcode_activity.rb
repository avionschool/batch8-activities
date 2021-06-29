class Confection
    def ingredients
      puts "Flour, Sugar, Baking Powder, Salt, Milk, Vegtable Oil, Eggs, Water"
    end
end
  
class Cupcake < Confection
    def bake
        puts "Baking at 350 degrees for 25 minutes"
    end
    def frost
        puts "Apply frosting"
    end
    def success
        puts "Cupcake made!"
    end
end
  
class BananaCake < Confection
    def bake
        puts "Baking at 350 degrees for 25 minutes."
    end
    def success
        puts "Banana Cake made!"
    end
end
  
confection = Confection.new()
confection.ingredients

cupcake = Cupcake.new()
cupcake.ingredients
cupcake.bake
cupcake.frost
cupcake.success

bananaCake = BananaCake.new()
bananaCake.ingredients
bananaCake.bake
bananaCake.success

# class Jan
#     def say_hello
#         puts "Hello"
#     end
#     def say_hi
#         puts "Hi"
#     end
#     def introduce
#         puts "I'm Jan"
#     end
# end
  
# class Jeff < Jan
#     def introduce
#         puts "I'm Jeff"
#     end
# end
  
# greet = Jan.new()
# greet.say_hello
# greet.say_hi
# greet.introduce

# greetToo = Jeff.new()
# greetToo.say_hello
# greetToo.say_hi
# greetToo.introduce

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
end
  
    protected
    def login
      puts "User logged in. IP address: #@{ip_address}"
    end
end
  
class Admin < User
    def admin_login
        puts "Admin logged in"
    end
end
  
  
class Buyer < User
end

## execute

my_admin = Admin.new('avionuser', 'password', '127.0.0.1')
my_admin.admin_login
my_admin.edit_users_profile

my_admin.change_password = 'new_password'

buyer = Buyer.new('juan', 'password', '127.0.0.1')
buyer.buyer_login
buyer.buy

buyer.change_password = 'new_password'