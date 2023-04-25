// for (let i = 0; i < imgs.length; i++) {
//   let current = imgs[i];
//   let next = imgs[i + 1] || imgs[0];
//   imgs[i].addEventListener("click", () => {
//     swap(current, next);
//   });
// }
//
// const swap = function (nodeA, nodeB) {
//   const parentA = nodeA.parentNode;
//   const nextElem = nodeA.nextElementSibling || nodeB;
//   console.log(nextElem);
//   parentA.insertBefore(nextElem, nodeB);
// };


const colors = document.getElementsByTagName("img")
const imgContainer = document.getElementById("img_container")
let index = 0

imgContainer.addEventListener("click", () => {
    colors[index++].style.zIndex = 999
    console.log(index)
    if (index === 5) reset()
})

function reset() {
    for (let color of colors) {
        color.style.zIndex = 1
    }
    index = 0
}

// let counter = 1;
// let imgChange = document.getElementById("imgChange");
// function change_img() {
//   if (counter == 0) {
//     document.getElementById("imgChange").src = "./assets/black.png";
//     counter++;
//   } else if (counter == 1) {
//     document.getElementById("imgChange").src = "./assets/blue.png";
//     counter++;
//   } else if (counter == 2) {
//     document.getElementById("imgChange").src = "./assets/green.png";
//     counter++;
//   } else if (counter == 3) {
//     document.getElementById("imgChange").src = "./assets/white.png";
//     counter++;
//   } else if (counter == 4) {
//     document.getElementById("imgChange").src = "./assets/red.png";
//     counter = 0;
//   }
// }
