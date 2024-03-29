
var inputfile = document.getElementById('inputfile');
var format = document.getElementById('format');
var copy = document.getElementById('copy');
copy.disabled = true;
var download = document.getElementById('download');
download.disabled = true;
var input = document.getElementById('input');
var output = document.getElementById('output');
var comment = document.getElementById('comment');

/*
input.addEventListener('keyup', function (input) {
var inputText = input.target.files
var inputReader = new FileReader()
reader.readAsText(file[0])
reader.onload = function () {
var 
 var inputSize = size_convert();
  
}
*/
                       
inputfile.addEventListener('change', function (e) {
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
  var sizeSmall = size_convert(input.size,2);
  document.querySelector('#size').innerHTML = sizeSmall;
}, false)


format.addEventListener('click', function () {
 document.getElementById('output').innerHTML = '';
  var formatBefore = document.getElementById('input').value;
  if ( comment.checked === true ) { 
    var formatBefore = formatBefore.replace( /\/\*.*\*\//gs , "");
    var formatBefore = formatBefore.replace( /(?=\/\/).*/g , "");
  }
  try {
      let json = jsonlint.parse(formatBefore);
      document.getElementById('output').setAttribute('style', 'background-color:#EAEAEA;');

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
  document.getElementById('output').value = formatAfter;
  copy.disabled = false;
  download.disabled = false;
  } catch (err) {
      document.getElementById('output').value = err.message;
      document.getElementById('output').setAttribute('style', 'background-color:#ffd2cf;');
  }
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


function size_convert(bite , decimal){
  decimal = (decimal) ? Math.pow(10,decimal) : 10;
  var kiro = 1024;
  var size = bite;
  var unit = "B";
  var units = ["B" , "KB" , "MB" , "GB" , "TB"];
  for(var i=(units.length-1); i>0; i--){
    if(bite / Math.pow(kiro,i) > 1){
      size = Math.round(bite / Math.pow(kiro,i) * decimal) / decimal ;
      unit = units[i];
      break;
    }
  }
  return String(size) +" "+ unit;
}
