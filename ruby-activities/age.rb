# 4. Write a program called age.rb that asks a user how old they are and then tells them how old they will be in 10, 20, 30 and 40 years. Below is the output for someone 20 years old.

puts 'How old are you?'
age = gets.chomp.to_i
index = 0
interval = 0
while index < 4
  index += 1
  age += 10
  interval += 10
  puts 'In ' + interval.to_s + ' years you will be:' 
  puts age
end

