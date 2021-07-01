# Encapsulation
class Toblerone
    def initialize(pack, pieces)
        @pack = pack
        @pieces = pieces
    end
    def total
        @pieces * @pack
    end
end

toblerone = Toblerone.new(4, 25)
puts toblerone.total

# Abstraction
class Toblerone
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

toblerone = Toblerone.new(2, 25, 200)
puts toblerone.totalPieces
puts toblerone.totalPrice