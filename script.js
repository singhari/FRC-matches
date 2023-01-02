import { createDivWithClassAndText } from '/helpfulHTML.js';
import { twoTeamMatch } from '/match.js';

var list = document.getElementById("match_list");
var scrollA = document.getElementById("scroll-container-a");
var scrollB = document.getElementById("scroll-container-b");

async function initialize() {
  var rankPairs = await ranksToKeyPairs();
  console.log(rankPairs);
  var response = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/schedule/USCASDSDGAM2?teamNumber=7159" })
  var response2 = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/matches/USCASDSDGAM2?teamNumber=7159" })
  console.log(response);
  response.schedule.forEach(element => {
    const test = new twoTeamMatch(element.matchNumber, element.description, element.startTime,
      element.teams[0].teamNumber, element.teams[1].teamNumber, null, //red
      element.teams[2].teamNumber, element.teams[3].teamNumber, null); //blue
    test.updateRankings(rankPairs);
    scrollA.appendChild(test.getElementA());
    scrollB.appendChild(test.getElementB());
  });
  var rando = document.createElement("div");
  rando.style.height = "2em";
  scrollA.appendChild(rando);
  console.log("done");
  updateScroll();

}

async function ranksToKeyPairs() {
  var resp = {};
  var response = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/rankings/USCASDSDGAM2" });
  response.Rankings.forEach(element => {

    resp[element.teamNumber.toString()] = element.rank;
    console.log(element.teamNumber.toString());
  });
  console.log(resp);
  return resp;
}
//calculates distance, speed, etc for the animation, or turns it off if it all fits
function updateScroll() {
  console.log("scroll update");
  if (scrollA.offsetHeight > list.offsetHeight) {
    if (scrollA.getAnimations().length != 0) {
      scrollA.getAnimations()[0].cancel();
      scrollB.getAnimations()[0].cancel();
    }
    //SCROLL SPEED HERE (offsetHeight*a number)
    scrollA.animate({ top: ["0em", -scrollA.offsetHeight + "px"] }, { duration: scrollA.offsetHeight * 27, easing: "linear", iterations: Infinity });
    scrollB.animate({ top: ["0em", -scrollA.offsetHeight + "px"] }, { duration: scrollA.offsetHeight * 27, easing: "linear", iterations: Infinity });
  } else {
    if (scrollA.getAnimations().length != 0) {
      scrollA.getAnimations()[0].cancel();
      scrollB.getAnimations()[0].cancel();
    }
    scrollB.style.display = "none";
  }
}
initialize();
