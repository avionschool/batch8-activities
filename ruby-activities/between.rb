puts "Enter a number: "
input = gets

#checks if input is integer using regex
if input =~ /^-?[0-9]+$/ 
  num = input.to_i
  if num < 0
    puts "Negative numbers not allowed."
  elsif num >= 0 && num <= 50
    puts "Number between 0 and 50."
  elsif num >= 51 && num <= 100
    puts "Number between 51 and 100."
  else
    puts "Number above 100."
  end
else   
  puts "Only numbers are allowed."
end