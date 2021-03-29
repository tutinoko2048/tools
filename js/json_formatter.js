
var inputfile = document.getElementById('inputfile');
var format = document.getElementById('format');
var copy = document.getElementById('copy');
copy.disabled = true;
var download = document.getElementById('download');
download.disabled = true;
var output = document.getElementById('output');
var comment = document.getElementById('comment');

alert('a');

inputfile.addEventListener("change", function (e) {
  var file = e.target.files
  var reader = new FileReader()
  reader.readAsText(file[0])
  reader.onload = function () {
    document.getElementById('input').value = reader.result;
  }
  var input = document.querySelector('#inputfile').files[0];
  // 最後に、反映
  document.querySelector('#name').innerHTML = input.name;
  document.querySelector('#type').innerHTML = input.type;
  var sizeSmall = Math.round(input.size / 1024) + 'KB';
  document.querySelector('#size').innerHTML = sizeSmall;
}, false)


format.addEventListener('click', function () {
  var formatBefore = document.getElementById('input').value;
  if ( comment.checked === true ) { 
    var formatBefore = formatBefore.replace( /\/\*.*\*\//gs , "");
    var formatBefore = formatBefore.replace( /(?=\/\/).*/g , "");
  }
  var json = JSON.parse(formatBefore);
  var indent = document.getElementById('indent').value
  switch (indent) {
  case 'half1':
    var formatAfter = JSON.stringify(json, null, 1);
    break;
  case 'half2':
    var formatAfter = JSON.stringify(json, null, 2);
    break;
  case 'half4':
    var formatAfter = JSON.stringify(json, null, 4);
    break;
  case 'tab':
    var formatAfter = JSON.stringify(json, null, "\t");
    break;
  case 'no-lh':
    var jsonReplace = JSON.stringify(json, null, 0);
    var formatAfter = jsonReplace.replace("\n", "");
    break;
  default:
    alert('えらー');
  }
  document.getElementById('output').innerHTML = formatAfter;
  copy.disabled = false;
  download.disabled = false;
});


copy.addEventListener('click', function () {
  var copyText = document.getElementsByTagName("textarea")[1];
  output.readOnly = true;
  copyText.select();
  output.readOnly = false;
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  alert('コピーしました');
});


download.addEventListener('click', function () {
  var content = document.getElementById('output').value;
  var blob2 = new Blob([content], {
    "type": "application/json"
  });
  document.getElementById("download").href = window.URL.createObjectURL(blob2);
});
