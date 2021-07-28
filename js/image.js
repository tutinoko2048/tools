let input = document.getElementById('input');
let button = document.getElementById('button');
button.disabled = true;
let width = document.getElementById('width');
width.disabled = true;
let height = document.getElementById('height');
height.disabled = true;
let download = document.getElementById('download');
download.disabled = true;

function preview(event) {

  var file = event.target.files[0];
  var reader = new FileReader();
  var image = new Image();
  var preview = document.getElementById("preview");
  var previewImage = document.getElementById("previewImage");

  if (previewImage != null) {
    preview.removeChild(previewImage);
  }
  reader.onload = function(event) {
    var img = document.createElement("img");
    img.setAttribute("src", reader.result);
    img.setAttribute("id", "previewImage");
    img.setAttribute("style", "width:100%;");
    preview.appendChild(img);

  };
  reader.onloadend = function() {
    image.src = reader.result;
    result = reader.result
    console.log(result)
    image.onload = function() {
      result = {
        width: image.naturalWidth,
        height: image.naturalHeight,
        size: size_convert(file.size, 2)
      }

      document.getElementById('info').innerHTML = `width: ${result.width}px<br>height: ${result.height}px<br>size: ${result.size}`
      document.getElementById('width').value = result.width;
      document.getElementById('height').value = result.height;
    }
  }
  reader.readAsDataURL(file);
  button.disabled = false;
  width.disabled = false;
  height.disabled = false;
}

function size_convert(bite, decimal) {
  decimal = (decimal) ? Math.pow(10, decimal) : 10;
  var kiro = 1024;
  var size = bite;
  var unit = "B";
  var units = ["B", "KB", "MB", "GB", "TB"];
  for (var i = (units.length - 1); i > 0; i--) {
    if (bite / Math.pow(kiro, i) > 1) {
      size = Math.round(bite / Math.pow(kiro, i) * decimal) / decimal;
      unit = units[i];
      break;
    }
  }
  return String(size) + " " + unit;
}

function CanvasDataDownload(canvas_id_name, download_file_name) {
  var canvas = document.getElementById(canvas_id_name);
  var type = 'image/png';
  var dataurl = canvas.toDataURL(type);
  var bin = atob(dataurl.split(',')[1]);
  var buffer = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) {
    buffer[i] = bin.charCodeAt(i);
  }
  var blob = new Blob([buffer.buffer], {
    type: type
  });

  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = download_file_name;
  link.click();
}

width.addEventListener('keyup', function() {
  let originWidth = document.getElementById('width').value;
  let originHeight = document.getElementById('height').value;
  let ratio = result.width / result.height;
  document.getElementById('height').value = originWidth / ratio;
}, false);

height.addEventListener('keyup', function() {
  let originWidth = document.getElementById('width').value;
  let originHeight = document.getElementById('height').value;
  let ratio = result.height / result.width;
  document.getElementById('width').value = originHeight / ratio;
}, false);

button.addEventListener('click', function() {

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var image = new Image();
  image.src = previewImage.getAttribute('src'); // 元画像
  image.crossOrigin = "Anonymous";
  image.onload = function() {
    var dstWidth = document.getElementById('width').value;
    var dstHeight = document.getElementById('height').value;
    canvas.width = dstWidth;
    canvas.height = dstHeight;
    ctx.drawImage(image, 0, 0, result.width, result.height, 0, 0, dstWidth, dstHeight);
    canvas.id = 'outputCanvas';
    if (document.getElementById("outputCanvas") != null) {
      document.getElementById('outputCanvas').remove();
    }
    document.getElementById('output').appendChild(canvas);
  }
  download.disabled = false;
}, false);

download.addEventListener('click', function() {

  CanvasDataDownload('outputCanvas', 'output');
}, false);
