const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const btn6 = document.getElementById('btn6');

const p1ById = document.getElementById('p1');
const p2ById = document.getElementById('p2');
const p3ById = document.getElementById('p3');
const p4ById = document.getElementById('p4');
let pNodeList;

const defaultStyle = " border: 1px solid black; border-radius: 8px; padding: 12px;"


const output = document.getElementsByClassName('output')[0];

btn1.onclick = function() {
  const p1 = document.querySelector('p');
  console.log(p1);
  output.innerHTML = p1.textContent;
}

btn2.onclick = function() {

  output.innerText = `
  ${p1ById.textContent} 
  ${p2ById.textContent}
  ${p3ById.textContent}
  ${p4ById.textContent}`

}
btn3.onclick = function() {
  pNodeList = document.getElementsByTagName('p');
  output.innerText = "Got all the p elements as nodeList now click button 4\n"
}


btn4.onclick = function() {
  for (let i = 0; i < pNodeList.length; i++) {
    output.innerText += pNodeList.item(i).innerText + "\n";
  }
}

btn5.onclick = function() {

  p1ById.style = `${defaultStyle} font-size: 8px; color:white; background-color: gray;`
  p2ById.style = `${defaultStyle} font-size: 12px; color: green; background-color: lightblue;`
  p3ById.style = `${defaultStyle} font-size: 16px; color: darkblue; background-color: lightgreen;`
  p4ById.style = `${defaultStyle} font-size: 24px; color: brown; background-color: pink;`
}

btn6.onclick = function() {

  for (let i = 0; i < pNodeList.length; i++) {
    if (i % 2 === 0) {
      let styles = `${defaultStyle} color: red;`
      pNodeList.item(i).style = styles;
    }
    else {
      let styles = `${defaultStyle} color: green;`
      pNodeList.item(i).style = styles
    }
  }
}
