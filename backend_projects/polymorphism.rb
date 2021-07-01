# Inheritance
class FunkoPop
    def initialize(name, type, subType, year)
        @name = name
        @type = type
        @subType = subType
        @year = year
    end
    def describe
        puts "Funko Pop Details = Name:#{@name} / Type:#{@type} / Subtype:#{@subType} / Date Released:#{@year}"
    end
end

class Jan < FunkoPop
    def describe
        puts "My Funko Pop is #{@name} from the #{@type} #{@subType} that was released last #{@year}."
    end
    def shout
        puts "I have #{@name}!"
    end
end

class Jeff < FunkoPop
    def describe
        puts "Mine is #{@name} from the #{@subType} #{@type}. I got it last #{@year}."
    end
    def shout
        puts "I have #{@name}!"
    end
end

jan = Jan.new("Superman", "movie", "Justice League", "2021")
jan.describe

jeff = Jeff.new("Captain America", "movie", "Civil War", "2016")
jeff.describe

# Duck-Typing
class Dog
    def talk
      puts "Arf"
    end
    def response
        puts "Yey"
    end
end
    
class Cat
    def talk
        puts "Meow"
    end
    def response
        puts "Nah"
    end
end

def make_it_talk(pet)
    pet.talk
end

puts make_it_talk(Dog.new)
puts make_it_talk(Cat.new)

def make_it_run(pet)
    pet.response
end

puts make_it_run(Dog.new)
puts make_it_run(Cat.new)