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
  var formatBefore = document.getElementById('input').value;
  var json = JSON.parse(formatBefore);
  var formatAfter = JSON.stringify(json, null , 2);
  document.getElementById('output').innerHTML = formatAfter;
}
);

var copy = document.getElementById('copy')
copy.addEventListener('click', function() {
  alert('copy');
}
);

var download = document.getElementById('download')
download.addEventListener('click', function() {
                var content = document.getElementById('output').value;
                var blob = new Blob([ content ], { "type" : "application/json" });

                if (window.navigator.msSaveBlob) { 
                    window.navigator.msSaveBlob(blob, "output.json"); 

                    // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
                    window.navigator.msSaveOrOpenBlob(blob, "output.json"); 
                } else {
                    document.getElementById("download").href = window.URL.createObjectURL(blob);
                }
            
}
);
