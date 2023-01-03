import { createDivWithClassAndText } from '/helpfulHTML.js';
import { twoTeamMatch } from '/match.js';

const list = document.getElementById("match_list");
const scrollA = document.getElementById("scroll-container-a");
const scrollB = document.getElementById("scroll-container-b");
const statusTextContainer = document.getElementById("left");
console.log(statusTextContainer);
const counter =  document.getElementById("counter");
const allianceIndicator = document.getElementById("alliance");
var nextMatch = -1;
const matches = [];

//all these functions are async cause i'm too lazy to do async properly (and async is genuinely confusing as well) 
//the entire program currently assumes that A. the API provides the matches in the order that they would be played B. the schedule api and matches api are in the same order.

//init: make all the elements for the matches, get scores, get ranks, etc etc
async function initialize() {
  var rankPairs = await ranksToKeyPairs();
  var schedule = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/schedule/USCASDSDGAM2?teamNumber=7159" })
  // var results = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/matches/USCASDSDGAM2?teamNumber=7159" })
  var results = await fetch("/testTeamResults.json").then(response => response.json());

  for (let index = 0; index < schedule.schedule.length; index++) {
    const scheduleElement = schedule.schedule[index];
    const resultElement = results.matches[index];
    let siteElement;
    if(results.matches.length > index){
      console.log("score");
      siteElement = new twoTeamMatch(scheduleElement.matchNumber, scheduleElement.description, "Completed",
        scheduleElement.teams[0].teamNumber, scheduleElement.teams[1].teamNumber, resultElement.scoreRedFinal, //red
        scheduleElement.teams[2].teamNumber, scheduleElement.teams[3].teamNumber, resultElement.scoreBlueFinal); //blue
    }else if(results.matches.length == index){
      console.log("coming up");
      siteElement = new twoTeamMatch(scheduleElement.matchNumber, scheduleElement.description, "Upcoming",
        scheduleElement.teams[0].teamNumber, scheduleElement.teams[1].teamNumber, null, //red
        scheduleElement.teams[2].teamNumber, scheduleElement.teams[3].teamNumber, null); //blue
      nextMatch = index;
    }else{
      console.log("coming up");
      siteElement = new twoTeamMatch(scheduleElement.matchNumber, scheduleElement.description, "Upcoming",
        scheduleElement.teams[0].teamNumber, scheduleElement.teams[1].teamNumber, null, //red
        scheduleElement.teams[2].teamNumber, scheduleElement.teams[3].teamNumber, null); //blue
    }
    siteElement.updateRankings(rankPairs);
    matches.push(siteElement);
    scrollA.appendChild(siteElement.getElementA());
    scrollB.appendChild(siteElement.getElementB());
  }
  var rando = document.createElement("div");
  rando.style.height = "2em";
  scrollA.appendChild(rando);
  console.log("done");
  updateScroll();
  trackerUpdate();
}
//makes it so you can feed in team number to array and get out the rank (ex: ranks["7159"]==11)
async function ranksToKeyPairs() {
  var resp = {};
  var response = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/rankings/USCASDSDGAM2" });
  response.Rankings.forEach(element => {
    resp[element.teamNumber.toString()] = element.rank;
  });
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
async function trackerUpdate(){
  var allResults = await fetch("/testMatchResults.json").then(response => response.json());
  console.log(allResults);
  const latest = allResults.matches[allResults.matches.length-1];
  var next = matches[nextMatch];
  if(next == null){
    statusTextContainer.children[0].textContent = "No more matches are";
      statusTextContainer.children[1].textContent = "scheduled for this team.";
      counter.textContent = "X";
      allianceIndicator.textContent = "";
      allianceIndicator.className = "very-light-gray";
  }else if(latest.matchNumber == next.matchNumber-1){
    statusTextContainer.children[0].textContent = next.description;
    statusTextContainer.children[1].textContent = "Match in progress...";
    counter.textContent = "-";
    next.setStatus("In Progress");
  }else if(latest.matchNumber == next.matchNumber-2){
    statusTextContainer.children[0].textContent = next.description;
    statusTextContainer.children[1].textContent = "On Deck NOW";
    counter.textContent = "0";
  }else if(latest.matchNumber < next.matchNumber-2){
    statusTextContainer.children[0].textContent = next.description;
    statusTextContainer.children[1].textContent = "Rounds until On Deck:";
    counter.textContent = (next.matchNumber-2) - latest.matchNumber;
  }else if(latest.matchNumber >= next.matchNumber){
    nextMatch++;
    next = matches[nextMatch];
    if(next == null){
      statusTextContainer.children[0].textContent = "No more matches are";
      statusTextContainer.children[1].textContent = "scheduled for this team.";
      counter.textContent = "X";
      allianceIndicator.textContent = "";
      allianceIndicator.className = "very-light-gray";
    }else{
      statusTextContainer.children[0].textContent = next.description;
      statusTextContainer.children[1].textContent = "Rounds until On Deck:";
      console.log(next.matchNumber);
      console.log(latest.matchNumber);
      counter.textContent = (next.matchNumber-2) - latest.matchNumber;
    }
    //TODO: detect alliance
  }
}
initialize();
