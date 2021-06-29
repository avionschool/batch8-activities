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