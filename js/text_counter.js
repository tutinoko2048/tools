function func1() {
    let min = document.getElementById("min").value;
    let max = document.getElementById("max").value;
    let text = document.getElementById("text").value;


    for (min < max) {
    let output = min + 1;
    
    }

    
    document.getElementById("output").innerHTML = output;
    
    let textarea = document.getElementsByTagName("textarea")[0];
    // 文字をすべて選択
    textarea.select();
    // コピー
    document.execCommand("copy");
    
  }
