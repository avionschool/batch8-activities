class Confection
    def bake
      "Baking at 350 degrees for 25 minutes"
    end
  end
  
  class Cupcake < Confection
    def bake
      super + " for cupcake"
    end
  end
  
  class Banana_cake < Confection
    def bake
      super + " for banana cake. Applying frosting"
    end
  end
  
  ccake = Cupcake.new
  puts ccake.bake
  
  bcake = Banana_cake.new
  puts bcake.bake