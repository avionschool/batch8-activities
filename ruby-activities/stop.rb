prompt = "Enter a random word or the word 'stop': "
puts prompt

while input = gets.chomp.upcase
  
  case input
  when "STOP"
    puts "Bye! Program will exit now."
    break
  else
    puts prompt
  end
end