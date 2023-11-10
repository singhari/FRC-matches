const dt = document.getElementById("dt");
function showDate() {
  var d = new Date();
  var hour = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  if (hour > 12) {
    hour -= 12; 
  }else if (hour == 0) hour = 12;

  if(dt.children[0].textContent != Math.trunc(hour/10))
    dt.children[0].style.color = "#000000";
  if(dt.children[1].textContent != hour%10)
    dt.children[1].style.color = "#000000";
  if(dt.children[2].textContent != Math.trunc(min/10))
    dt.children[2].style.color = "#000000";
  if(dt.children[3].textContent != min%10)
    dt.children[3].style.color = "#000000";
  if(dt.children[4].textContent != Math.trunc(sec/10))
    dt.children[4].style.color = "#000000";
  if(dt.children[5].textContent != sec%10)
    dt.children[5].style.color = "#000000";
  var bruh = setTimeout(function(){cont(hour,min,sec)}, 150);
}
function cont(hour, min, sec){
  dt.children[0].textContent=Math.trunc(hour/10);
  dt.children[1].textContent=hour%10;
  dt.children[2].textContent=Math.trunc(min/10);
  dt.children[3].textContent=min%10;
  dt.children[4].textContent=Math.trunc(sec/10);
  dt.children[5].textContent=sec%10;
  dt.children[0].style.color = "#ffc800";
  dt.children[1].style.color = "#ffc800";
  dt.children[2].style.color = "#ffc800";
  dt.children[3].style.color = "#ffc800";
  dt.children[4].style.color = "#ffc800";
  dt.children[5].style.color = "#ffc800";
  var timePulse = setTimeout(function(){showDate()},850);
}

showDate();