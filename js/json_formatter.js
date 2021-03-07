var inputfile = document.getElementById('inputfile')
var image = document.getElementById('img')
 
inputfile.addEventListener("change", function(e) {
 
 var file = e.target.files 
 var reader = new FileReader()
 reader.readAsDataURL(file[0])
 reader.onload = function() {
   image.src = reader.result;
 }
 var input = document.querySelector('#inputfile').files[0];
// 最後に、反映
document.querySelector('#name').innerHTML = input.name;
document.querySelector('#type').innerHTML = input.type;
document.querySelector('#size').innerHTML = Math.round(input.size / 1024 );
document.querySelector('#daytime').innerHTML = input.lastModifiedDate　;

 }, false)
