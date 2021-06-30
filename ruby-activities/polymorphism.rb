# using inheritance
class Phone 

  attr_accessor :model
  def initialize (os,model,price)
    @os = os
    @model = model
    @price = price
  end

  def trademark(phone)
  end

  def local_price
    @price - price_diff
  end

  private

  def price_diff
    @price * 0.05
  end
end

class IPhone < Phone
  
  def local_price
    puts "Local price of #{@model}: Php " + super.to_s
  end

  def price 
    puts super
  end
end

class Samsung < Phone 

  def local_price
    puts "In the Philippines the price of #{@model} is: Php " + super.to_s
  end
end

class CherryMobile

  def trademark
    puts "I'm locally made!"
  end
end

iphone12 = IPhone.new("iOS","iPhone12",70000)
iphone12.local_price

galaxy_s21 = Samsung.new("Android","Galaxy S21",60000)
galaxy_s21.local_price

# using duck typing

class Tablet
  
  def update(device)
    puts device.download
  end
end

class Ipad

  def download
    "Done through Appstore!"
  end
end

class Surface

  def download
    "Done through Playstore!"
  end
end

tablet = Tablet.new
ipad = Ipad.new
tablet.update(ipad)

surface = Surface.new
tablet.update(surface)