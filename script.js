import {createDivWithClassAndText} from '/helpfulHTML.js';
import {twoTeamMatch} from '/match.js';

var list = document.getElementById("match_list");
var scrollA = document.getElementById("scroll-container-a");
var scrollB = document.getElementById("scroll-container-b");

function updateList(){
  // let request = new XMLHttpRequest();
  // request.open("GET", "https://ftc-api.firstinspires.org/v2.0/2022/schedule/USCASDSDGAM2?teamNumber=7159&end=999");
  // request.setRequestHeader("Authorization", "Basic " + btoa("karsteny:NO"));

  // request.send();
  // request.onload = () => {
  //   console.log(request.response);
  //   if(request.status == 200){
  //     console.log(JSON.parse(request.response));
  //   }
  // }
}
//calculates distance, speed, etc for the animation, or turns it off if it all fits
function updateScroll(){
  if(scrollA.offsetHeight > list.offsetHeight){
    if(scrollA.getAnimations().length != 0){
      scrollA.getAnimations()[0].cancel();
      scrollB.getAnimations()[0].cancel();
    }
    //SCROLL SPEED HERE (offsetHeight*a number)
    scrollA.animate({top: ["0em", -scrollA.offsetHeight+"px"]}, {duration: scrollA.offsetHeight*27, easing: "linear", iterations: Infinity});
    scrollB.animate({top: ["0em", -scrollA.offsetHeight+"px"]}, {duration: scrollA.offsetHeight*27, easing: "linear", iterations: Infinity});
  }else{
    if(scrollA.getAnimations().length != 0){
      scrollA.getAnimations()[0].cancel();
      scrollB.getAnimations()[0].cancel();
    }
    scrollB.style.display = "none";
  }
}
// test code!
var test = new twoTeamMatch("Qualification 69", "In Progress", 7159, 7159, null, 6969, 6969, null);
scrollA.appendChild(test.getElementA());
scrollB.appendChild(test.getElementB());
var test2 = new twoTeamMatch("Qualification 21", "Never", 4, 5, 32, 6, 7, 33);
scrollA.appendChild(test2.getElementA());
scrollB.appendChild(test2.getElementB());
var rando = document.createElement("div");
rando.style.height = "2em";
scrollA.appendChild(rando);
updateScroll();
// updateList();