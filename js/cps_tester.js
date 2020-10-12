var click_count = 0;
function count() {
    ++ click_count;
    
  }

/* ダブルタップによる拡大を禁止 */
  var t = 0;
  document.documentElement.addEventListener('touchend', function (e) {
  var now = new Date().getTime();
  if ((now - t) < 350){
    e.preventDefault();
  }
  t = now;
  }, false);

function countstart() {
	count = 10
	timerID = setInterval('countdown()',1000);
}

function countstop() {
	clearInterval(timerID);
	document.getElementById("timer").innerHTML = 10 //初期値に戻す
}

function countdown() {
	document.getElementById("timer").innerHTML = count; //カウント表示
	count--; //カウントダウン
	if (count < 0) countstop(); //カウント終了
}
