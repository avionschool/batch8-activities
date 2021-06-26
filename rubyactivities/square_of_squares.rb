def square?(num)
  # remove negative numbers
  if num < 0
    return false
  else
    # get square root , then discard decimal
    sqrt = (num**0.5).to_i
    if sqrt*sqrt == num
      return true
    else 
      return false 
    end
  end
end

puts square?(-1) == false
puts square?(0) == true
puts square?(3) == false
puts square?(4) == true
puts square?(25) == true
puts square?(26) == false