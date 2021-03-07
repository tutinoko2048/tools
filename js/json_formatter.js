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
let size_small = Math.round(input.size / 1024) + 'KB';
document.querySelector('#size').innerHTML = size_small;
document.querySelector('#daytime').innerHTML = input.lastModifiedDate　;

 }, false)



document.addEventListener('DOMContentLoaded',()=>{

  //対象エリア
  var dropArea = document.getElementById('drop_area');

  //dragoverイベントでクラスを付与
  dropArea.addEventListener("dragover",(event) => {
    event.preventDefault(); //こいつが注意点
    event.target.classList.add('drop');
  });
  //dragleaveイベントでクラスを削除
  dropArea.addEventListener("dragleave",(event) => {
    event.target.classList.remove('drop');
  });

});
