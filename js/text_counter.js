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
  
  function text() {
    let min = prompt("min", "");
    let max = prompt("max", "");
    alert(min + max)
   
    let text = document.getElementById("text").value;

    for (min < max) {
    let output = min++;
    
    }
    
    document.getElementById("output").innerHTML = output;
    
  }
  
  function disp(){

	// 入力ダイアログを表示 ＋ 入力内容を user に代入
	user =  window.prompt("ユーザー名を入力してください", "");

	// 入力内容が tama の場合は example_tama.html にジャンプ
	if(user == 'tama'){

		location.href = "example_tama.html";

	}

	// 入力内容が hana の場合は example_hana.html にジャンプ
	else if(user == 'hana'){

		location.href = "example_hana.html";

	}

	// 入力内容が一致しない場合は警告ダイアログを表示
	else if(user != "" && user != null){

		window.alert(user + 'さんは登録されていません');

	}

	// 空の場合やキャンセルした場合は警告ダイアログを表示
	else{

		window.alert('キャンセルされました');

	}

}