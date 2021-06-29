arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]
countPositives = 0
addNegatives = 0
newArr = []

arr.each do |n|
  if n > 0
    countPositives += 1
    puts countPositives
  else n < 0
    addNegatives += n
    puts addNegatives
  end
end

newArr.push(countPositives, addNegatives)
puts newArr