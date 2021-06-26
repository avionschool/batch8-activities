# evaluate_num.rb
puts "Please enter a number between 0 and 100."
number = gets.chomp.to_i
if number < 0
  puts "You can't enter a negative number!"
elsif number <= 50
  puts "#{number} is between -1 and 50."
elsif number <= 100
  puts "#{number} is between 50 and 100."
else
  puts "#{number} is above 99. Number should be between 0 and 100."
end