
class Toyota
    def car_name
        "Corolla"
    end
end

class Ford
    def car_name
        "Everest"
    end
end

class Honda
    def car_name
        "Civic"
    end
end

class Cars
    def my_car(list)
        puts list.car_name
    end
end

list = Cars.new

list.my_car(Toyota.new)
list.my_car(Ford.new)
list.my_car(Honda.new)
