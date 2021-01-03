var click = function(){
let min = prompt("min");
let max = prompt("max");

for (i = min; i <= max; i++) {
  min = min + i + "\n";
}

document.getElementById("output").innerHTML = min;
};
