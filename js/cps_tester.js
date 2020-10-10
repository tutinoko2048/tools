var click_count = 0;
document.getElementById("output").innerHTML = click_count;
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
