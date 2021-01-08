function hasProperty(propName, obj) {
    return obj.hasOwnProperty(propName);
}

let testObject = {
    a: 1,
    b: 2
}

let hasAProp = hasProperty("a", testObject);
console.log(hasAProp); //тут будет true, потому что в testObject есть ключ a

let hasCProp = hasProperty("c", testObject);
console.log(hasCProp); //тут будет false, потому что в testObject нет ключа c