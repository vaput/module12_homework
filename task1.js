function keyValues(obj) {
    console.log(Object.keys(obj));
    console.log(Object.values(obj));
}

let testObject = {
    a: "1",
    b: 2,
    c: {
        c1: "1",
        c2: 2
    }
};

keyValues(testObject);