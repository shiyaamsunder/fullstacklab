function containsPhone(num) {
    const re = /\(?\d{3}\)?(\s|-)?\d{3}(\s|-)?\d{4}/;
    return re.test(num);
}

// Positive test cases
console.log(containsPhone('1111111111'));
console.log(containsPhone('111-111-1111'));
console.log(containsPhone('111 111 1111'));
console.log(containsPhone('(111) 111-1111'));
console.log(containsPhone('(111)111-1111'));

// Negative test cases
console.log(containsPhone('111111111'));
console.log(containsPhone('111_111_111'));
console.log(containsPhone('111  111  111'));
console.log(containsPhone('(111) 111--1111'));
console.log(containsPhone('[111]111-1111'));

const input = document.getElementById("inp")
const result = document.getElementById("result")

result.innerText = "does not contain a valid phone number"

input.addEventListener("keyup", (e)=> {
    let resultString = containsPhone(e.target.value) ?"contains valid phone number" : "does not contain a valid phone number"
    console.log(resultString)
    result.innerText = resultString
})