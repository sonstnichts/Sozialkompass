import copy

a = [["a","b","c"],["c"],["c","d"],["e","f","g"],["f","g"]]
result = [["a","b"],["c"],["d"],["e"],["f","g"]]    
b = copy.deepcopy(a)

def clean_subsets(a):
    print(a)
    for i in range(len(a)):
        for j in range(len(a[i])-1):
            for k in range(len(a)):
                element = a[i][j]
                if element in a[k]:
                    if i == k:
                        continue
                    if len(a[i]) > len(a[k]):
                        a[i].remove(element)
                    else:
                        a[k].remove(element)
    return a

def split_array(array):
    result_array = [] #creates an empty array for the results
    result_array.append(array[0]) #adds the first element of the array to the result array
    array.pop(0) #removes the first element of the array
    for sub_array in array: #iterates over the remaining elements of the array
        for result in result_array: #iterates over the elements of the result array
            for element in sub_array: #iterates over the elements of the sub array
                for result_element in result: #iterates over the elements of the result from the erlier iteration
                    if element == result_element: #if the element is already in the result array
                        sub_array.remove(element) #remove the element from the sub array
                        if len(result) > 1: #if the elment isn't already atomar
                            result.remove(element) #remove the element from the results
                            result_array.append([element]) #add the element to the result array
        if sub_array: #if the sub array isn't empty
            result_array.append(sub_array) #add the sub array to the result array
    return result_array #return the result array

#print(clean_subsets(a))
print(split_array(b))