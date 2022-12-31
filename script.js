import {createDivWithClassAndText} from '/helpfulHTML.js';
import {twoTeamMatch} from '/match.js';

var list = document.getElementById("match_list");
var scrollA = document.getElementById("scroll-container-a");
var scrollB = document.getElementById("scroll-container-b");
//calculates distance, speed, etc for the animation, or turns it off if it all fits
function updateScroll(){
  if(scrollA.offsetHeight > list.offsetHeight){
    if(scrollA.getAnimations().length != 0){
      scrollA.getAnimations()[0].cancel();
      scrollB.getAnimations()[0].cancel();
    }
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
//test code!
var test = new twoTeamMatch("Qualification 69", "In Progress", 7159, 7159, null, 6969, 6969, null);
scrollA.appendChild(test.createHTMLElement());
scrollB.appendChild(test.createHTMLElement());
var test2 = new twoTeamMatch("Qualification 21", "Never", 4, 5, 32, 6, 7, 33);
scrollA.appendChild(test2.createHTMLElement());
scrollB.appendChild(test2.createHTMLElement());
var rando = document.createElement("div");
rando.style.height = "2em";
scrollA.appendChild(rando);
updateScroll();