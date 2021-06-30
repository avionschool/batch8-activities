# Polymorph by inheritance =============================================

class Music
    def initialize(key, type)
        @key = key
        @type = type
    end

    def chords
        puts "This song is in the key of #{@key}."
    end
end

class Percussion < Music
    def chords
        puts "The drums will follow the key of #{@key}."
    end
end

class Guitar < Music
    def chords
        puts "Guitar will be a higher key than the key of #{@key}."
    end
end

telecaster = Guitar.new("a", "stringed")
telecaster.chords

conga = Percussion.new("b", "percuss")
conga.chords

# polymorph by duck-typing ==========================================================================

class Music

    def key (music)
        music.key
    end
end


class Guitar
    def key
        puts 'this is a guitar'
    end
end

class Drums
    def key
        puts 'this is a drums'
    end
end

class Violin
    def key
        puts 'this is a violin'
    end
end

Musika = Music.new

guitara = Guitar.new
drum = Drums.new
violin = Violin.new

Musika.key(guitara)
Musika.key(drum)
Musika.key(violin)