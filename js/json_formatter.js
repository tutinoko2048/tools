window.onpageshow = function(event) {
  if (event.persisted) {
    window.location.reload()
  }
};

var inputfile = document.getElementById('inputfile')
inputfile.addEventListener("change", function(e) {
 
 var file = e.target.files 
 var reader = new FileReader()
 reader.readAsText(file[0])
 reader.onload = function() {
   document.getElementById('input').value = reader.result;
 }
 var input = document.querySelector('#inputfile').files[0];
// 最後に、反映
document.querySelector('#name').innerHTML = input.name;
document.querySelector('#type').innerHTML = input.type;
let size_small = Math.round(input.size / 1024) + 'KB';
document.querySelector('#size').innerHTML = size_small;

 }, false)

var format = document.getElementById('format')
format.addEventListener('click', function() {
  var formatBefore = document.getElementById('input').value
  var formatAfter = JSON.stringify(formatBefore, null , 2);
  document.getElementById('output').innerHTML = formatAfter;
}
);

var copy = document.getElementById('copy')
copy.addEventListener('click', function() {
  alert('こぴーぼたん');
}
);
