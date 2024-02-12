class Operation {

    constructor(symbol, operation, parentheses) {
        this.symbol = symbol;
        this.operation = operation;
        this.parentheses = parentheses;
    }

    execute(x, y) {
        return this.operation(x, y);
    }

}

function add(x, y) {
    return x + y;
}

function sub(x, y) {
    return x - y;
}

function mul(x, y) {
    return x * y;
}

function div(x, y) {
    return x / y;
}

const operations = [new Operation("+", add, false), new Operation("-", sub, false), new Operation("*", mul, true), new Operation("/", div, true)];

function step(product, elements) {

    const result = [];

    if (product.length == 0) {
        
        elements.forEach(element => {
            result.push([element]);
        });

        return result;
    }

    product.forEach(tuple => {
        elements.forEach(element => {
            const newTuple = [...tuple];
            newTuple.push(element);
            result.push(newTuple);
        });
    });

    return result;
}

function product(elements) {

    var result = [];
    for (var i = 0; i < elements.length; i++) {
        result = step(result, elements);        
    }

    return result;
}

function permutations(elements) {

    var length = elements.length,
        result = [elements.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;

    while (i < length) {

        if (c[i] < i) {
            k = i % 2 && c[i];
            p = elements[i];
            elements[i] = elements[k];
            elements[k] = p;
            ++c[i];
            i = 1;
            result.push(elements.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }

    return result;
}

function generate(numbers, operations, goal) {

    var result = numbers[0]; 

    for (var i = 1; i < numbers.length; i++) {

        const operation = operations[i-1];
        if (operation.parentheses && i > 1) {
            result = "(" + result + ")";
        }

        result = result + " " + operations[i-1].symbol + " " + numbers[i];
    }

    return result;
}

/*
Input: 
 - number: A 4 digit string of numbers. Example: "1234"
 - goal: The goal number that we are trying to make using each digit and the basic arithmetic operations.
Output:
 - If a solution exists, a string representing the arithmetic expression equating to the goal is returned,
   else null is returned.
*/
function compute(number, goal) {

    const numbers = number.split('').map(Number);
    const numbersPermutations = permutations(numbers);
    const operationsProduct = product(operations);
    
    for (var i = 0; i < numbersPermutations.length; i++) {
        const nums = numbersPermutations[i];

        for (var j = 0; j < operationsProduct.length; j++) {
            const ops = operationsProduct[j];

            var value = nums[0];
            for (var k = 1; k < numbers.length; k++) {
                value = ops[k-1].execute(value, nums[k]);
            }

            if (value == goal) {
                return generate(nums, ops, goal);
            }

        }
    }

    return null;
}

export {compute};