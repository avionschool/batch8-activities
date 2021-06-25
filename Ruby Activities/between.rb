num = -1

while num <= 0 || num >= 100
  # Get input until valid
  puts "Enter a number between 0 and 100"
  num = gets.chomp.to_i
  # Test start
  if num > 0 && num < 100
    if num < 50
      puts "#{num} is between 0 and 50"
    elsif num < 100
      puts "#{num} is between 51 and 100"
    elsif num > 100
      puts "#{num} is above 100"
    end
  end
end
