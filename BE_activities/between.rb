def check_num (a)
    if a >= 1 && a <= 50
      puts "1-50 range"
    elsif a >= 51 && a <= 100
      puts "51-100 range"
    else
      puts "Over 100"
    end
  end
  
  print check_num(12),"\n"
  print check_num(58),"\n"
  print check_num(105),"\n"
  print check_num(70),"\n"