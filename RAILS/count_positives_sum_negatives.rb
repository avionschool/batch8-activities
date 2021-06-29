array_num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]
pos, neg = 0, 0

array_num.each do |a|
  if a > 0
    pos += 1
  elsif a < 0
    neg += a
  end
end

if array_num.empty?
  puts "[]"
else
  puts "[#{pos}, #{neg}]"
end