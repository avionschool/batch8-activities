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