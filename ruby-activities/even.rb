arr = [6,3,1,8,4,2,10,65,102]
arr_even = []
arr.each { |num|
  if num % 2 == 0
    arr_even.push(num)
  end
}
puts arr_even
