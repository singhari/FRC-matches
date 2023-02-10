//FTC Matches
//https://github.com/karsteny/FTC-matches
//Definitely not the best code in the world, but hey, it works.

import { trackedEvent } from './tracker.js';
const list = document.getElementById("match_list");
const scrollA = document.getElementById("scroll-container-a");
const scrollB = document.getElementById("scroll-container-b");
const statusTextContainer = document.getElementById("left");
const counter =  document.getElementById("counter");
const allianceIndicator = document.getElementById("alliance");
const counterBorderThing = document.getElementById("counter-container");
let team = window.num;
var tracker;
var schedule;
var allSchedule;
var allResults;
var rankResponse;
var autoRefresh;
//all these functions are async because async properly is genuinely confusing
//the entire program currently assumes that A. the API provides the matches in the order that they would be played B. the schedule api and matches api are in the same order.
//both of these appear to be true

//pre-init: set title
document.title = window.num + " - " + window.evCode;
document.getElementById("team-name").textContent = window.num + " - " + window.teamName;
document.getElementById("meet-details").textContent = window.evName;
//init: make all the elements for the matches, get scores, get ranks, etc etc
async function initialize() {
  if(await getData() == false){
    return;
  }
  const rankPairs = ranksToKeyPairs();
  tracker = new trackedEvent(allSchedule, allResults, window.num, schedule);
  tracker.addElements(scrollA, scrollB);
  tracker.updateRanks(rankPairs);
  //spacing for the infinite scrolling "wraparound"
  const rando = document.createElement("div");
  rando.style.height = "2em";
  scrollA.appendChild(rando);
  statusUpdate();
  console.log(tracker.getNextNum());
  updateScroll();
  autoRefresh = setInterval(() => {
    updateEverything();
  }, 30000);
}
//main refresh
async function updateEverything(){
  if(await getData() == false){
    return;
  }
  const rankPairs = ranksToKeyPairs();
  //literally just creates the event as new as it would be hard to figure out where the new match is
  if(tracker.isChanged(allSchedule)){
    console.log("reset");
    scrollA.innerHTML = "";
    scrollB.innerHTML = "";
    tracker = new trackedEvent(allSchedule, allResults, window.num, schedule);
    tracker.addElements(scrollA, scrollB);
    tracker.updateRanks(rankPairs);
    const rando = document.createElement("div");
    rando.style.height = "2em";
    scrollA.appendChild(rando);
    updateScroll();
    console.log("reset complete");
  }else{
    tracker.updateScoresAndStatus(allResults);
    tracker.updateRanks(rankPairs);
    statusUpdate();
  }
 
  // statusUpdate();
}
//makes it so you can feed in team number to array and get out the rank (ex: ranks["7159"]==11)
function ranksToKeyPairs() {
  var resp = {};
  rankResponse.Rankings.forEach(element => {
    resp[element.teamNumber.toString()] = element.rank;
  });
  return resp;
}
//gets all of the data at the same time to try and avoid having partially inputted data
//returns false if at least one of the API calls failed.
//lots of the commented out stuff is to replace the live data with fake data for testing
async function getData(){
  schedule = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/schedule/"+window.evCode+"?teamNumber="+team});
  const scheduleQual = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/schedule/"+window.evCode+"?tournamentLevel=qual"});
  const schedulePlayoff = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/schedule/"+window.evCode+"?tournamentLevel=playoff"});
  allResults = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/matches/"+window.evCode });
  rankResponse = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/rankings/"+window.evCode });
  // schedule = await fetch("/testTeamSchedule.json").then(response => response.json());
  // allSchedule = await fetch("/testAllSchedule.json").then(response => response.json());
  // allSchedule = allSchedule.schedule;
  // allResults = await fetch("/testMatchResults.json").then(response => response.json());
  if(schedule.error != undefined || scheduleQual.error != undefined || schedulePlayoff.error != undefined || allResults.error != undefined || rankResponse.error != undefined){
    updateTrackerFields("An API error occurred.", "Retrying in 30 seconds...", "X", null, "#f12718");
    return false;
  }
  // if(schedule.error != undefined || allResults.error != undefined || rankResponse.error != undefined){
  //   updateTrackerFields("An API error occurred.", "Retrying in 30 seconds...", "X", null, "#f12718");
  //   return false;
  // }
  allSchedule = scheduleQual.schedule.concat(schedulePlayoff.schedule);

}
//calculates distance, speed, etc for the animation, or turns it off if it all fits
function updateScroll() {
  console.log("scroll update");
  
  if (scrollA.offsetHeight > list.offsetHeight) {
    //if it doesn't fit, cancel animations if they exist and redo them
    if (scrollA.getAnimations().length != 0) {
      scrollA.getAnimations()[0].cancel();
      scrollB.getAnimations()[0].cancel();
    }
    //SCROLL SPEED HERE (offsetHeight*a number)
    scrollA.animate({ top: ["0em", -scrollA.offsetHeight + "px"] }, { duration: scrollA.offsetHeight * 27, easing: "linear", iterations: Infinity });
    scrollB.animate({ top: ["0em", -scrollA.offsetHeight + "px"] }, { duration: scrollA.offsetHeight * 27, easing: "linear", iterations: Infinity });
    scrollB.style.display="block";
  } else {
    //else cancel animations and hide second scroll box
    if (scrollA.getAnimations().length != 0) {
      scrollA.getAnimations()[0].cancel();
      scrollB.getAnimations()[0].cancel();
    }
    scrollB.style.display = "none";
  }
}


//updates the tracker: different states based on match in progress, on deck,
//match upcoming, or the next match needs to increment
async function statusUpdate(){
  const next = tracker.getNextNum();
  console.log(next[0]);
  if(next[0] == -1){
    //no more matches
    updateTrackerFields("No more matches are", "scheduled for this team", "-", null);
  }else if(next[0] == "-"){
    //in progress
    updateTrackerFields(next[1].description, "Match in progress...", "-", next[1].getTeamAlliance(), "#0e89f3");
  }else if(next[0] == 1){
    //on deck
    updateTrackerFields(next[1].description, "On Deck NOW", "0", next[1].getTeamAlliance(), "#ff9800");
  }else if(next[0] > 1){
    //not on deck yet
    updateTrackerFields(next[1].description, "Rounds until On Deck:", next[0]-1, next[1].getTeamAlliance(), "#2dd334");
  }
}
//dedicated function to update the fields to tidy up the code a bit
function updateTrackerFields(top, bottom, ctr, alliance, clr){
  statusTextContainer.children[0].textContent = top;
  statusTextContainer.children[1].textContent = bottom;
  if(clr == undefined || clr == null){
    counterBorderThing.style.borderColor = "#707070";
  }else{
    counterBorderThing.style.borderColor = clr;
  }
  
  counter.textContent = ctr;
  //conversion technology - internal alliance to css
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
//wait a bit before initing
setTimeout(initialize, 500);

//automatically redoes scroll hasn't resized for 1000ms after being resized (thanks stackoverflow question #2996431)
window.addEventListener('resize', function() {
  if(this.resizeTimeout) clearTimeout(this.resizeTimeout);
  this.resizeTimeout = setTimeout(function() {
      updateScroll();
  }, 1000);
});
