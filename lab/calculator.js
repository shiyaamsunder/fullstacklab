// let btns = document.querySelectorAll(".btn")
// let input = document.querySelector(".input")

// console.log(input.innerText)
// btns.forEach(item => {
//     item.addEventListener("click", (e)=> {
//         input.innerText+=e.target.innerText;
//     })
// })

let form = document.getElementById("form")


let btn = document.querySelector(".submit");

let result = document.querySelector(".result")

form.addEventListener("submit", (e) => {
    // on form submission, prevent default
    e.preventDefault();
  
    // construct a FormData object, which fires the formdata event
    new FormData(form);

});

form.addEventListener("formdata", (e)=> {
    result.innerHTML=""
    e.preventDefault()
    const data = e.formData;
    

    let a = data.get("a")

    let b = data.get("b")


    let operation = data.get("operation")
    if(!a || !b ){
        alert("Enter the inputs!")
    }
    else if(!operation){
        alert("Select an operation")
    }


      else{  console.log("result is " + eval(a+operation+b))
        result.innerHTML+=`
        <h3>Result</h3>

        <p>${eval(a+operation+b)}</p>
        `
}
})
