arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15] 
arr_2 = []
positive_counter = 0
sum_of_negatives = 0

if arr.length == 0
  p []
else
  arr.each { |num|
    if num > 0
      positive_counter += 1 
    elsif num < 0
      sum_of_negatives += num
    end
  }
  arr_2.push(positive_counter)
  arr_2.push(sum_of_negatives)
  p arr_2
end
