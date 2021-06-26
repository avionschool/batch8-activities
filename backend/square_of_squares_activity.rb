number = 25

if number < 0
    puts false
else
    squareRoot = (number**0.5).to_i
    if squareRoot*squareRoot == number
        puts true
    else
        puts false
    end
end