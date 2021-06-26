number = 101

if number > 100
    puts "Error: Choose between 0 to 100 only"
elsif number == 0 || number == 50 || number < 50
    puts "Number is between 0 to 50"
elsif number == 51 || number == 100 || number < 100
    puts "Number is between 51 to 100"
end