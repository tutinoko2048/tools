var inputfile = document.getElementById('inputfile')
var image = document.getElementById('img')
 
inputfile.addEventListener("change", function(e) {
 
 var file = e.target.files 
 var reader = new FileReader()
 reader.readAsDataURL(file[0])
 reader.onload = function() {
   image.src = reader.result;
 }
 }, false)
