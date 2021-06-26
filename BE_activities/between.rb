def check_num (a)
    if a >= 1 && a <= 50
      puts "number is between 1-50 range"
    elsif a >= 51 && a <= 100
      puts "number is between  51-100 range"
    else
      puts "number is between Over 100"
    end
  endcd 
  
  print check_num(12),"\n"
  print check_num(58),"\n"
  print check_num(105),"\n"
  print check_num(70),"\n"