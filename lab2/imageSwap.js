const imgs = document.getElementsByTagName("img");
console.log(imgs);

for (let i = 0; i < imgs.length; i++) {
  let current = imgs[i];
  let next = imgs[i + 1] || imgs[0];
  imgs[i].addEventListener("click", () => {
    swap(current, next);
  });
}

const swap = function (nodeA, nodeB) {
  const parentA = nodeA.parentNode;
  const nextElem = nodeA.nextElementSibling || nodeB;
  console.log(nextElem);
  parentA.insertBefore(nextElem, nodeB);
};
