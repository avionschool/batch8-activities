class Car
    attr_reader :make, :model, :color
    # attr_writer :make
    # attr_accessor :make
    def initialize(make, model, color)
        @make = make
        @model = model
        @color = color
    end
    def desOwn
        puts "Jan owns a #{@make} car."
    end
    def desModel
        puts "Jan's car is a #{@model} model"
    end
    def desColor
        puts "Jan's car is #{@color}."
    end
end

jan = Car.new("Kia", "2015", "Dark Blue")
# jan.make = "Honda"

puts jan.desOwn
puts jan.desModel
puts jan.desColor

puts "#{jan.make}"
puts "#{jan.model}"
puts "#{jan.color}"