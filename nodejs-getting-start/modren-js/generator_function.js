function *generatorFUnction(){
    console.log("Generator Function Started!")
    let x = 5;
    yield x;

    x++
    y = yield x;

    return x + y;

}

let iterator = generatorFUnction()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next(4))
console.log(iterator.next(23))
console.log("All the best")