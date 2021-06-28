# Polymorphism using Inheritance
class Polygon
  def initialize(no_of_sides)
    @no_of_sides = no_of_sides 
  end

  def name
    puts "I'm a #{@no_of_sides}-sided regular Polygon!"
  end
end

class Square < Polygon
  def initialize
    @no_of_sides = 4
  end

  def name
    puts "You can call me a Square! I'm also known as a #{@no_of_sides}-sided regular Polygon" 
  end
end

square1 = Square.new
square1.name
polygon54 = Polygon.new(54)
polygon54.name

# Polymorphism using Duck-Typing
# Instead of inheriting methods, we explicitly define methods within each class
class Dog
  def make_sound
    "Woof!"
  end
end

class Cat 
  def make_sound
    "Meow~"
  end
end

class Frog
  def make_sound
    "Ribbit."
  end
end

class Fish; end

def let_my_dog_talk(dog)
  puts dog.make_sound
end

let_my_dog_talk(Dog.new)
let_my_dog_talk(Frog.new)
# The let_my_dog_talk function expects a dog object so it can invoke its make_sound method
# A frog is obviously not a dog but with duck-typing it won't matter
# Since the Frog class has a make_sound method, it can be passed into let_my_dog_talk as if 
# it were a dog