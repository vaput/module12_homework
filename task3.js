function createWithoutPrototype() {
    return Object.create(null);
}

let testObject = createWithoutPrototype();
console.log(testObject);