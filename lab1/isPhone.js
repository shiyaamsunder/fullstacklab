function isPhone(num){
    const re = /^\(?\d{3}\)?(\s|-)?\d{3}(\s|-)?\d{4}$/;
    return re.test(num);
}

// Positive test cases
console.log(isPhone('1111111111'));
console.log(isPhone('111-111-1111'));
console.log(isPhone('111 111 1111'));
console.log(isPhone('(111) 111-1111'));
console.log(isPhone('(111)111-1111'));

// Negative test cases
console.log(isPhone('111111111'));
console.log(isPhone('111_111_111'));
console.log(isPhone('111  111  111'));
console.log(isPhone('(111) 111--1111'));
console.log(isPhone('[111]111-1111'));

const input = document.getElementById("inp")
const result = document.getElementById("result")

result.innerText = "Not a valid phone number"

input.addEventListener("keyup", (e)=> {
    let resultString = isPhone(e.target.value) ?"Valid phone number" : "Not a valid phone number"
    console.log(resultString)
    result.innerText = resultString
})