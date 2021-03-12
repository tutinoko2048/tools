const dropzone = document.getElementById('js-dropzone');
const overlayText = document.getElementById('js-overlay-text');
const overlayArea = document.getElementById('js-overlay-area');
const fileInput = document.getElementById('file_upload');
const selectedFile = document.getElementById('js-selected-file');

// ドロップ可能エリアに入った時
dropzone.addEventListener('dragenter', () => {
    overlayArea.classList.add('overlay');
    overlayText.classList.add('overlay-text');
    overlayText.classList.remove('no-active');
});

// ドロップ可能エリアを出た時
overlayArea.addEventListener('dragleave', () => {
    overlayArea.classList.remove('overlay');
    overlayText.classList.remove('overlay-text');
    overlayText.classList.add('no-active');
});

// ドロップ可能エリアにカーソルがある時
overlayArea.addEventListener('dragover', (e) => {
    e.preventDefault();
});

// ファイルをドロップした時
overlayArea.addEventListener('drop', (e) => {
    e.preventDefault();
    var fileName = e.dataTransfer.files[0].name;
    selectedFile.innerText = fileName;
    selectedFile.classList.remove('no-active');
    overlayArea.classList.remove('overlay');
    overlayText.classList.remove('overlay-text');
    overlayText.classList.add('no-active');
});

fileInput.addEventListener('change', () => {
    var fileName = fileInput.files[0].name;
    selectedFile.classList.remove('no-active');
    selectedFile.innerText = fileName;
});
