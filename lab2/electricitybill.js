function calc() {
  let input = document.getElementById("units");
  let b = Number.parseInt(input.value);
  // let div1 = document.getElementById("div1");
  input.value = ""

  // div1.style.display="none";
  let div2 = document.getElementById("div2");
  div2.style.display = "block";

  let subsidy = 250;
  let f = 0;
  if (b >= 0 && b <= 100) f = 0;
  else if (b > 100 && b <= 150) f = 100;
  else if (b > 150 && b <= 200) f = 100 + 3.75 * b;
  else if (b > 200 && b <= 350) f = 250;
  else if (b > 350 && b <= 400) f = 250 + 4 * b;
  else if (b > 400 && b <= 450) f = 300;
  else if (b > 450 && b <= 600) f = 300 + 4 * b;
  else f = 400 + 5 * (b - 600);

  // let fix = 50;
  if (f < 250) subsidy = 0;
  let net = f + 50 - subsidy;

  document.getElementById("units_b").innerHTML = b;
  document.getElementById("units_b2").innerHTML = f;
  document.getElementById("units_b3").innerHTML = f;
  document.getElementById("sub").innerHTML = subsidy;
  document.getElementById("net").innerHTML = net;
}
