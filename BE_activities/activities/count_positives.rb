arr [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]

def arr (arr)
  return [] if arr.empty?
  arr.each_with_object([0,0]) do |n,a|
    a[0] += 1 if n > 0
    a[1] += n if n < 0
  end
end