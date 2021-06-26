# 1
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].each {|n| puts n}

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
arr.each {|n| puts n}

# 2
h = {a:1, b:2, c:3, d:4}
h.store(:e, 5)
h.merge!(e: 5, f: 6)

# 3
contact_data = [["ana@email.com", "123 Main st.", "555-123-4567"], ["avion@email.com", "404 Not Found Dr.", "123-234-3454"]]
contacts = {"Analyn Cojocson" => {}, "Avion School" => {}}

a = contact_data[0][0]
b = contact_data[0][1]
c = contact_data[0][2]
d = contact_data[1][0]
e = contact_data[1][1]
f = contact_data[1][2]

x = {email: a, address: b, phone: c}
y = {email: d, address: e, phone: f}

contacts["Analyn Cojocson"] = x
contacts["Avion School"] = y

puts contacts

# 4
age = 10

a = age + 10
b = age + 20
c = age + 30
d = age + 40

display = {"In 10 years you will be": 0, "In 20 years you will be": 0, "In 30 years you will be": 0, "In 40 years you will be": 0}

display["In 10 years you will be"] = a
display["In 20 years you will be"] = b
display["In 30 years you will be"] = c
display["In 40 years you will be"] = d

puts display