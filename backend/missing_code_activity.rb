# class Car
#     attr_reader :make, :model, :color
#     # attr_writer :make
#     # attr_accessor :make
#     def initialize(make, model, color)
#         @make = make
#         @model = model
#         @color = color
#     end
#     def desOwn
#         puts "Jan owns a #{@make} car."
#     end
#     def desModel
#         puts "Jan's car is a #{@model} model"
#     end
#     def desColor
#         puts "Jan's car is #{@color}."
#     end
# end

# jan = Car.new("Kia", "2015", "Dark Blue")
# # jan.make = "Honda"

# puts jan.desOwn
# puts jan.desModel
# puts jan.desColor

# puts "#{jan.make}"
# puts "#{jan.model}"
# puts "#{jan.color}"

class Profile
    attr_accessor :full_name, :age, :address, :work 
    def initialize(full_name, age, address, work)
      @full_name = full_name
      @age = age
      @address = address
      @work = work
    end
end
  
  my_profile = Profile.new('Juan', 18, 'Bulacan', 'Instructor')
  
  puts my_profile.full_name
  my_profile.full_name = 'Juan Cruz'
  
  my_profile.age = 25
  my_profile.work = 'Software Engineer'
  
  puts my_profile.full_name
  puts my_profile.age
  puts my_profile.work
  puts my_profile.address