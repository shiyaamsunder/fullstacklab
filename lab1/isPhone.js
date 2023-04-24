function containsPhone(ph_num) {
  let pattern = /^\(?(\d{3})\)?(\s|\-)?\d{3}(\s|\-)?\d{4}$/g
  // let pattern = /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/g;
  return ph_num.match(pattern);
}

console.log(containsPhone("123456789 0"));
console.log(containsPhone("123 456 7890"));
console.log(containsPhone("123 456-7890"));
console.log(containsPhone("(123)456-7890"));
console.log(containsPhone("(123) 123-1234"));
