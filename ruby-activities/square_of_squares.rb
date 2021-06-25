def is_square(num) 
  for n in 0..num
    result = n * n
    if num < 0 
      passed = false
    elsif  num == result
      passed = true
    else 
      passed = false
    end
  end
  puts passed
end

is_square(0)
