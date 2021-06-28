class Confection
  def prepare
    puts "Baking at 350 degrees for 25 minutes."
  end
end

class Cupcake < Confection
  def prepare
    super; puts "Appyling frosting"
  end
end

class BananaCake < Confection; end

banana_jumbo = BananaCake.new
banana_jumbo.prepare

velvet_cupcake = Cupcake.new
velvet_cupcake.prepare