a = [["a","b","c"],["c"],["c","d"]]
result = [["a","b"],["c"],["d"]]


b = []

for i in a:
    for entry in b:
        i[:] = [x for x in i if not x in entry ]
    b.append(i)

print(b)