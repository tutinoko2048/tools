var inputfile = document.getElementById('inputfile')
var image = document.getElementById('img')


document.addEventListener('DOMContentLoaded',() => {

  var uploadArea = document.getElementById('drop_area');

  uploadArea.addEventListener("dragover",(event) => {
    event.preventDefault();
    event.target.classList.add('drag');
  });

  uploadArea.addEventListener("dragleave",(event) => {
    event.target.classList.remove('drag');
  });

  // 追加のdropイベント
  uploadArea.addEventListener("drop",(event) => {
    event.preventDefault();
    var inputfile = document.querySelectorAll('input[name="fileupload"]'); //好きなようにDOMを取得してください
    input[0].files = event.dataTransfer.files; //取得したinput[type=file]にDropしたファイルを突っ込む
  });
});

 
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
