const input = document.getElementById('input');
const button = document.getElementById('button');
button.disabled = true;
const width = document.getElementById('width');
width.disabled = true;
const height = document.getElementById('height');
height.disabled = true;
const download = document.getElementById('download');
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
    img.setAttribute("style", "width:400px;");
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

    download.disabled = false;
    var imgData = ctx.getImageData(0, 0, result.width, result.height);
    console.log(imgData.data.length / 4)
    console.log(result.width + ' ' + result.height)
    // 16色カラーパレット
    const palettes = ['E9ECEC', 'F07613', 'BD44B3', '3AAFD9', 'F8C627', '70B919', 'ED8DAC', '3E4447', '8E8E86', '158991', '792AAC', '35399D', '724728', '546D1B', 'A12722', '141519'];
    // 各ピクセルの色情報設定
    for (i = 0; i < result.width; i++) {
      for (j = 0; j < result.height; j++) {

        var rgb = {
          r: imgData.data[j * 4 + i * imgData.width * 4],
          g: imgData.data[1 + j * 4 + i * imgData.width * 4],
          b: imgData.data[2 + j * 4 + i * imgData.width * 4]
        }
        var color = chooseColor(palettes, rgb);
        var outRGB = convertToRGB(color);
        // 赤成分
        imgData.data[j * 4 + i * imgData.width * 4] = outRGB.r;
        // 緑成分
        imgData.data[1 + j * 4 + i * imgData.width * 4] = outRGB.g;
        // 青成分
        imgData.data[2 + j * 4 + i * imgData.width * 4] = outRGB.b;
      }
    }
    // Canvasのコンテキスト(0, 0)にImageDataを描画
    ctx.putImageData(imgData, 0, 0);
  } //onload close
}, false);

download.addEventListener('click', function() {
  CanvasDataDownload('outputCanvas', 'output');
}, false);

// https://kuroeveryday.blogspot.com/2019/01/finding-nearest-colors-using-euclidean-distance.html

function convertToRGB(hex) {
  const match = hex.match(/[0-9a-f]{2}/gi);
  return {
    r: parseInt(match[0], 16),
    g: parseInt(match[1], 16),
    b: parseInt(match[2], 16)
  }
}

function calcDelta(t, p) {
  // https://en.wikipedia.org/wiki/Relative_luminance
  // 輝度の重み付けはCIEの資料確認
  //  0.3:0.5:0.11
  return Math.pow((p.r - t.r), 2) +
    Math.pow((p.g - t.g), 2) +
    Math.pow((p.b - t.b), 2);
}

function chooseColor(palettes, rgb) {
  let color;
  let d = Number.MAX_SAFE_INTEGER;
  palettes.forEach(phex => {
    const p = convertToRGB(phex);
    const _d = calcDelta(rgb, p);
    if (_d < d) {
      color = phex;
      d = _d;
    }
  });

  return color;
}
