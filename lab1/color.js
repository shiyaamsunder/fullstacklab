function extractColorNumber(str) {
    str = str.toUpperCase();
    const hex6 = /#[0-9A-F]{6}/;
    const hex3 = /#[0-9A-F]{3}([^\d]|$)/;
    const rgbD = /RGB\((\d{1,3},\s?){2}\d{1,3}\)/;
    const rgbP = /RGB\((\d{1,3}%,\s?){2}\d{1,3}%\)/;
    let result = null;
    if (hex6.test(str)) {
        return hex6.exec(str)[0];
    } else if (hex3.test(str)) {
        return hex3.exec(str)[0].split('').map(x => x + x).join('').substring(1);
    } else if (rgbD.test(str)) {
        result = '#' + rgbD.exec(str)[0]
            .match(/\d{1,3}/g)
            .map(x => parseInt(x).toString(16).toUpperCase().padStart(2, '0'))
            .join('');
    } else if (rgbP.test(str)) {
        result = '#' + rgbP.exec(str)[0]
            .match(/\d{1,3}/g)
            .map(x => (parseInt(x) * 2.55 | 0).toString(16).toUpperCase().padStart(2, '0'))
            .join('');
    } else {
        return null;
    }

    return hex6.test(result) && [4, 7].includes(result.length) ? result : null;
}

// Postive test cases
console.log(extractColorNumber('#1234AB'));
console.log(extractColorNumber('#123'));
console.log(extractColorNumber('rgb(18,52,86)'));
console.log(extractColorNumber('rgb(7%, 20%, 34%)'));

// Negative test cases
console.log(extractColorNumber('#1234GH'));
console.log(extractColorNumber('#1234'));
console.log(extractColorNumber('rgb(18,52,286)'));
console.log(extractColorNumber('rgb(7%, 20%, 134%)'));


const input = document.getElementById("inp")
const result = document.getElementById("result")


input.addEventListener("keyup", (e)=> {
    let resultString = extractColorNumber(e.target.value)  || "Not a valid color"
    console.log(resultString)
    result.innerText = resultString
})