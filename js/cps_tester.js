var click_count = 0;
function count() {
    document.getElementById("output").innerHTML = ++ click_count;
    
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

count = 10; //カウントの初期値
timerID = setInterval('countdown()',1000); //1秒毎にcountup()を呼び出し

function countdown() {
	count--;
	document.getElementById("timer").innerHTML = count;
}
