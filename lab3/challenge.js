const year = document.getElementById("year");
const dateTime = document.getElementById("date_time");



const randomColor = function() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

setInterval(() => {
  dateTime.innerText = `Date: ${new Date().toLocaleDateString('en-GB')} Time: ${new Date().toLocaleTimeString()}`
  dateTime.style.backgroundColor = `#${randomColor()}`
}, 1000);
setInterval(() => {
  year.style = `color: #${randomColor()}`;
}, 3000);

const items = document.getElementsByTagName('li');

for (let i = 0; i < 3; i++) {
  items.item(i).style.background = "green";
}
for (let i = 3; i < 5; i++) {
  items.item(i).style.background = "yellow";
}
for (let i = 5; i < items.length; i++) {
  items.item(i).style.background = "red";
}
