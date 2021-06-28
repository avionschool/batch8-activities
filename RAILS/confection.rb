class Confection
 def baking  
      "baking at 350 degrees for 25 minutes." 
 end
end  
    
class Cupcake < Confection
 def baking
    "Cupcake is " + super
 end
end
  
class Banana_Cake < Confection
 def baking
    "Banana Cake is " + super + " Applying frosting."
 end
end  
    
cupcake = Cupcake.new
banana_cake = Banana_Cake.new
puts cupcake.baking
puts banana_cake.baking