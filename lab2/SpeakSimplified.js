function exclusion(string){
    return `un${string}`

}
function strengthen(string){
    return `plus${string}`
}
function emphasize(string){
    return `doubleplus${string}`
}


let form = document.querySelector(".form")


form.addEventListener("submit", (e)=> {
    e.preventDefault();

    new FormData(form);
})

form.addEventListener("formdata", (e)=> {
    let inputString = e.formData.get("string")
    let outPutHtml = `
        <li class="list_item">${exclusion(inputString)}</li>
        <li class="list_item">${strengthen(inputString)}</li>
        <li class="list_item">${emphasize(inputString)}</li>
    `
    document.getElementById("result_list").innerHTML = outPutHtml;
})
