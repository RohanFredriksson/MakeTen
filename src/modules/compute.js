/*
Input: 
 - number: A 4 digit string of numbers. Example: "1234"
Output:
 - If a solution exists, a string representing the arithmetic expression equating to the goal is returned,
   else null is returned.
*/
function compute(number) {

    const equations = number.split('');
    const numbers = equations.map(Number);

    function recurse(numbers, equations) {

        if (numbers.length == 2) {

            if (numbers[0] + numbers[1] == 10) {return `${equations[0]} + ${equations[1]}`;}
            if (numbers[0] - numbers[1] == 10) {return `${equations[0]} - ${equations[1]}`;}
            if (numbers[1] - numbers[0] == 10) {return `${equations[1]} - ${equations[0]}`;}
            if (numbers[0] * numbers[1] == 10) {return `${equations[0]} * ${equations[1]}`;}
            if (numbers[0] / numbers[1] == 10) {return `${equations[0]} / ${equations[1]}`;}
            if (numbers[1] / numbers[0] == 10) {return `${equations[1]} / ${equations[0]}`;}

            return null;

        }

        for (var i = 0; i < numbers.length; i++) {

            for (var j = i + 1; j < numbers.length; j++) {

                const e = [...equations];
                const le = e[i];
                const re = e[j];
                e.splice(j, 1);
                e.splice(i, 1);

                const n = [...numbers];
                const l = n[i];
                const r = n[j];
                n.splice(j, 1);
                n.splice(i, 1);

                var result = null;
                result = recurse(n.concat([l + r]), e.concat([`(${le} + ${re})`])); if (result != null) {return result;}
                result = recurse(n.concat([l - r]), e.concat([`(${le} - ${re})`])); if (result != null) {return result;}
                result = recurse(n.concat([r - l]), e.concat([`(${re} - ${le})`])); if (result != null) {return result;}
                result = recurse(n.concat([l * r]), e.concat([`(${le} * ${re})`])); if (result != null) {return result;}
                result = recurse(n.concat([l / r]), e.concat([`(${le} / ${re})`])); if (result != null) {return result;}
                result = recurse(n.concat([r / l]), e.concat([`(${re} / ${le})`])); if (result != null) {return result;}

            }

        }

        return null;

    }

    return recurse(numbers, equations);

}

export {compute};