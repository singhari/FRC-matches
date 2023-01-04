// import { createDivWithClassAndText } from '/helpfulHTML.js';
import { twoTeamMatch } from '/match.js';

const list = document.getElementById("match_list");
const scrollA = document.getElementById("scroll-container-a");
const scrollB = document.getElementById("scroll-container-b");
const statusTextContainer = document.getElementById("left");
const counter =  document.getElementById("counter");
const allianceIndicator = document.getElementById("alliance");
let team = 7159;
var nextMatch = -1;
const matches = [];

//all these functions are async cause i'm too lazy to do async properly (and async is genuinely confusing as well) 
//the entire program currently assumes that A. the API provides the matches in the order that they would be played B. the schedule api and matches api are in the same order.

//init: make all the elements for the matches, get scores, get ranks, etc etc
async function initialize() {
  document.title = window.num + " - " + window.evCode;
  document.getElementById("team-name").textContent = window.num + " - " + window.teamName;
  document.getElementById("meet-details").textContent = window.evName;
  var rankPairs = await ranksToKeyPairs();
  var schedule = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/schedule/"+window.evCode+"?teamNumber="+window.num})
  // var schedule = await fetch("/testTeamSchedule.json").then(response => response.json());
  var results = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/matches/"+window.evCode+"?teamNumber="+window.num })
  // var results = await fetch("/testTeamResults.json").then(response => response.json());

  for (let index = 0; index < schedule.schedule.length; index++) {
    const scheduleElement = schedule.schedule[index];
    const resultElement = results.matches[index];
    let siteElement;
    //figures out if a match is completed, up coming and the next event, or upcoming but not the next event
    if(results.matches.length > index){
      console.log("score");
      siteElement = new twoTeamMatch(scheduleElement.matchNumber, scheduleElement.description, "Completed",
        scheduleElement.teams[0].teamNumber, scheduleElement.teams[1].teamNumber, resultElement.scoreRedFinal, //red
        scheduleElement.teams[2].teamNumber, scheduleElement.teams[3].teamNumber, resultElement.scoreBlueFinal); //blue
    }else if(results.matches.length == index){
      console.log("this is nextMatch");
      siteElement = new twoTeamMatch(scheduleElement.matchNumber, scheduleElement.description, "Upcoming",
        scheduleElement.teams[0].teamNumber, scheduleElement.teams[1].teamNumber, null, //red
        scheduleElement.teams[2].teamNumber, scheduleElement.teams[3].teamNumber, null); //blue
      nextMatch = index;
    }else{
      console.log("upcoming");
      siteElement = new twoTeamMatch(scheduleElement.matchNumber, scheduleElement.description, "Upcoming",
        scheduleElement.teams[0].teamNumber, scheduleElement.teams[1].teamNumber, null, //red
        scheduleElement.teams[2].teamNumber, scheduleElement.teams[3].teamNumber, null); //blue
    }
    siteElement.updateRankings(rankPairs);
    matches.push(siteElement);
    scrollA.appendChild(siteElement.getElementA());
    scrollB.appendChild(siteElement.getElementB());
  }
  //spacing for the infinite scrolling "wraparound"
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
  var response = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/rankings/"+window.evCode });
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
//updates the tracker: different states based on match in progress, on deck,
//match upcoming, or the next match needs to increment
async function trackerUpdate(){
  var allResults = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/matches/"+window.evCode })
  // var allResults = await fetch("/testMatchResults.json").then(response => response.json());
  const latest = allResults.matches[allResults.matches.length-1];
  var next = matches[nextMatch];
  if(next == null){
    //no more matches
    updateTrackerFields("No more matches are", "scheduled for this team", "X", null);
  }else if(latest == null){
    updateTrackerFields(next.description, "Rounds until On Deck:", (next.matchNumber-2), next.getTeamAlliance(team));
  }else if(latest.matchNumber == next.matchNumber-1){
    updateTrackerFields(next.description, "Match in progress...", "-", next.getTeamAlliance(team));
    next.setStatus("In Progress");
  }else if(latest.matchNumber == next.matchNumber-2){
    //on deck
    updateTrackerFields(next.description, "On Deck NOW", "0", next.getTeamAlliance(team));
  }else if(latest.matchNumber < next.matchNumber-2){
    updateTrackerFields(next.description, "Rounds until On Deck:", (next.matchNumber-2) - latest.matchNumber, next.getTeamAlliance(team));
  }else if(latest.matchNumber >= next.matchNumber){
    nextMatch++;
    next = matches[nextMatch];
    //if there is no next match say so, else display that information
    if(next == null){
      updateTrackerFields("No more matches are", "scheduled for this team", "X", null);
    }else{
      updateTrackerFields(next.description, "Rounds until On Deck:", (next.matchNumber-2) - latest.matchNumber, next.getTeamAlliance(team));
    }
  }
  //dedicated function to update the fields to tidy up the code a bit
  function updateTrackerFields(top, bottom, ctr, alliance){
    statusTextContainer.children[0].textContent = top;
    statusTextContainer.children[1].textContent = bottom;
    counter.textContent = ctr;
    if(alliance == "red"){
      allianceIndicator.textContent = "RED";
      allianceIndicator.className = "light-ftc-red";
    }else if(alliance == "blue"){
      allianceIndicator.textContent = "BLUE";
      allianceIndicator.className = "light-ftc-blue";
    }else{
      allianceIndicator.textContent = "";
      allianceIndicator.className = "very-light-gray";
    }
  }
}
initialize();
