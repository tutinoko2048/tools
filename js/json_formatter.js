window.onpageshow = function(event) {
  if (event.persisted) {
    window.location.reload()
  }
};

var inputfile = document.getElementById('inputfile');
var format = document.getElementById('format');
var copy = document.getElementById('copy');
copy.disabled = true;
var download = document.getElementById('download');
download.disabled = true;


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


format.addEventListener('click', function() {
  var formatBefore = document.getElementById('input').value;
  var json = JSON.parse(formatBefore);
  var formatAfter = JSON.stringify(json, null , 2);
  document.getElementById('output').innerHTML = formatAfter;
  copy.disabled = false;
  download.disabled = false;
}
);


copy.addEventListener('click', function() {
  var copyText = document.getElementsByTagName("textarea")[0];
  copyText.select();
  document.execCommand("copy");
}
);


download.addEventListener('click', function() {
                var content = document.getElementById('output').value;
                var blob = new Blob([ content ], { "type" : "application/json" });
                document.getElementById("download").href = window.URL.createObjectURL(blob);           
}
);
