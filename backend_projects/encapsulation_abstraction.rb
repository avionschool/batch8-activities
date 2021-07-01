# Encapsulation
class Count
    def initialize(pack, pieces)
        @pack = pack
        @pieces = pieces
    end
    def total
        @pieces * @pack
    end
end

count = Count.new(4, 25)
puts count.total

# Abstraction
class Count
    def initialize(pack, pieces, price)
        @pack = pack
        @pieces = pieces
        @price = price
    end
    def totalPieces
        @pieces * @pack
    end
    def totalPrice
        @price - discount
    end

    private

    def discount
        @price = @price * 0.1
    end
end

count = Count.new(2, 25, 200)
puts count.totalPieces
puts count.totalPrice