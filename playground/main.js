import './style.css'

const obj1 = {
  name: "Shiyaam",
  getThis: function() {
    return this;
  }
}


const obj2 = {
  name: "OBJ2",
  getThis: () =>{
    return this;
  }
}

const obj3 = {
  name: "obj3"
}

function getThis () {
  return this;
}
obj3.getThis = getThis;
console.log(obj1.getThis())
console.log(obj2.getThis())
console.log(obj3.getThis())