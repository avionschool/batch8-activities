array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]

def return_count_of_positive_and_sum_of_negative(arr)
  if arr == [] or arr == nil
    return []
  end

  count = 0
  sum = 0
  arr.each {|x|
    if x > 0
      count += 1
    else
      sum += x
    end
  }
  return [count, sum]
end

p return_count_of_positive_and_sum_of_negative(array)
p return_count_of_positive_and_sum_of_negative([])