function generateUuid() {
    // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
    // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

function func1() {
    let manifest_name = document.getElementById("manifest_name").value;
    let manifest_desc = document.getElementById("manifest_desc").value;

    let element = document.getElementById("manifest_type");
    let manifest_type = element.value;

    let uuid1 = generateUuid();
    let uuid2 = generateUuid();

    let Datajson = {
  "format_version": 2,
  "header": {
    "description": manifest_desc,
    "name": manifest_name,
    "uuid": uuid1,
    "version": [ 1,0,0 ]
  },
  "modules": [
    {
      "description": manifest_desc,
      "type": manifest_type,
      "uuid": uuid2,
      "version": [ 1,0,0 ]
    }
  ]
};

    let Encodejson = JSON.stringify(Datajson, null , 2);

    document.getElementById("manifest_output").innerHTML = Encodejson;
 
    
    let textarea = document.getElementsByTagName("textarea")[0];
    // 文字をすべて選択
    textarea.select();
    // コピー
    document.execCommand("copy");
    
  }