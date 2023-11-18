//168 lines of poorly indexing HTML elements

import { createDivWithClassAndText, gimmeADivider, createTeamDiv } from './helpfulHTML.js';

export class twoTeamMatch {
  description; //"qualification 69"
  series; //only used for semifinals
  matchNumber;
  tournamentLevel; //"QUALIFICATION", "SEMIFINAL", or "FINAL"
  status; //"in progress"
  field; //a number
  redTeamA; //not just a number anymore
  redTeamB;
  redScore; 
  blueTeamA;
  blueTeamB;
  blueScore;
  elementA; //html elements
  elementB;
  teamNumber;
  hasElements; 
  constructor(description, series, matchNumber, tournamentLevel, status, field, redTeamA, redTeamB, redScore, blueTeamA, blueTeamB, blueScore, teamNumber) {
    this.description = description;
    this.series = series;
    this.matchNumber = matchNumber;
    this.tournamentLevel = tournamentLevel;
    this.status = status;
    this.field = field;
    this.redTeamA = redTeamA;
    this.redTeamB = redTeamB;
    this.redScore = redScore;
    this.blueTeamA = blueTeamA;
    this.blueTeamB = blueTeamB;
    this.blueScore = blueScore;
    this.teamNumber = teamNumber;
    this.hasElements = false;
  }
  createElements() {
    if (!this.hasElements) {
      this.elementA = this.createHTMLElement();
      this.elementB = this.createHTMLElement();
      this.hasElements = true;
    }
  }
  //damn what does this do?
  setScore(redScore, blueScore) {
    if (this.redScore == null) {
      this.redScore = redScore;
      this.blueScore = blueScore;
      if (this.hasElements) {
        this.elementA.children[0].children[2].textContent = this.redScore;
        this.elementA.children[0].children[4].textContent = this.blueScore;
        this.elementB.children[0].children[2].textContent = this.redScore;
        this.elementB.children[0].children[4].textContent = this.blueScore;
        if (this.redScore > this.blueScore) {
          this.elementA.children[0].children[2].className = "light-ftc-red score bold";
          this.elementB.children[0].children[2].className = "light-ftc-red score bold";
          this.elementA.children[0].children[4].className = "light-ftc-blue score";
          this.elementB.children[0].children[4].className = "light-ftc-blue score";
        } else if (this.blueScore > this.redScore) {
          this.elementA.children[0].children[2].className = "light-ftc-red score";
          this.elementB.children[0].children[2].className = "light-ftc-red score";
          this.elementA.children[0].children[4].className = "light-ftc-blue score bold";
          this.elementB.children[0].children[4].className = "light-ftc-blue score bold";
        }
      }
    }
  }
  //takes in the key-pair list for rankings and applies it
  updateRankings(rankList) {
    if (this.hasElements) {
      //elementA.match-stat(1).team-index(#).rank-name-div(1)
      if(rankList[this.redTeamA.teamNumber] != null){
        this.elementA.children[1].children[0].children[1].textContent = 
          "#"+rankList[this.redTeamA.teamNumber]+" | "+this.redTeamA.teamName;
        this.elementB.children[1].children[0].children[1].textContent = 
          "#"+rankList[this.redTeamA.teamNumber]+" | "+this.redTeamA.teamName;
      }
      else {
        this.elementA.children[1].children[0].children[1].textContent = this.redTeamA.teamName;
        this.elementB.children[1].children[0].children[1].textContent = this.redTeamA.teamName;
      }

      if(rankList[this.redTeamB.teamNumber] != null){
        this.elementA.children[1].children[2].children[1].textContent = 
          "#"+rankList[this.redTeamB.teamNumber]+" | "+this.redTeamB.teamName;
        this.elementB.children[1].children[2].children[1].textContent = 
          "#"+rankList[this.redTeamB.teamNumber]+" | "+this.redTeamB.teamName;
      }
      else {
        this.elementA.children[1].children[2].children[1].textContent = this.redTeamB.teamName;
        this.elementB.children[1].children[2].children[1].textContent = this.redTeamB.teamName;
      }

      if(rankList[this.blueTeamA.teamNumber] != null){
        this.elementA.children[1].children[4].children[1].textContent = 
          "#"+rankList[this.blueTeamA.teamNumber]+" | "+this.blueTeamA.teamName;
        this.elementB.children[1].children[4].children[1].textContent = 
          "#"+rankList[this.blueTeamA.teamNumber]+" | "+this.blueTeamA.teamName;
      }
      else {
        this.elementA.children[1].children[4].children[1].textContent = this.blueTeamA.teamName;
        this.elementB.children[1].children[4].children[1].textContent = this.blueTeamA.teamName;
      }

      if(rankList[this.blueTeamB.teamNumber] != null){
        this.elementA.children[1].children[6].children[1].textContent = 
          "#"+rankList[this.blueTeamB.teamNumber]+" | "+this.blueTeamB.teamName;
        this.elementB.children[1].children[6].children[1].textContent = 
          "#"+rankList[this.blueTeamB.teamNumber]+" | "+this.blueTeamB.teamName;
      }
      else {
        this.elementA.children[1].children[6].children[1].textContent = this.blueTeamB.teamName;
        this.elementB.children[1].children[6].children[1].textContent = this.blueTeamB.teamName;
      }

      // this.elementB.children[1].children[0].children[0].textContent = 
      //   "#"+rankList[this.elementA.children[1].children[0].children[1].textContent];
      // this.elementB.children[1].children[2].children[0].textContent = 
      //   "#"+rankList[this.elementA.children[1].children[2].children[1].textContent];
      // this.elementB.children[1].children[4].children[0].textContent = 
      //   "#"+rankList[this.elementA.children[1].children[4].children[1].textContent];
      // this.elementB.children[1].children[6].children[0].textContent = 
      //   "#"+rankList[this.elementA.children[1].children[6].children[1].textContent];
    }
  }
  //sets that upper right hand box
  setStatus(status) {
    this.status = status;
    if (this.hasElements) {
      this.elementA.children[0].children[6].textContent = this.status;
      this.elementB.children[0].children[6].textContent = this.status;
    }
  }
  setTeam(team) {
    this.teamNumber = team;
  }
  getElementA() {
    return this.elementA;
  }
  getElementB() {
    return this.elementB;
  }
  getTeamAlliance() {
    if (this.redTeamA.teamNumber == this.teamNumber || this.redTeamB.teamNumber == this.teamNumber) return "red";
    else if (this.blueTeamA.teamNumber == this.teamNumber || this.blueTeamB.teamNumber == this.teamNumber) return "blue";
    else return null;
  }

  //literally makes an entire 2 elements for the scrolling list
  createHTMLElement() {
    var outerDiv = document.createElement("div");
    //boring white header
    var header = document.createElement("div");
    header.className = "match-header";
    header.appendChild(createDivWithClassAndText("info", this.description));
    header.appendChild(gimmeADivider());
    //OH LOOK SCORE!!!!!
    if (this.redScore == null) {
      //no score
      header.appendChild(createDivWithClassAndText("very-light-gray score", ""));
      header.appendChild(gimmeADivider());
      header.appendChild(createDivWithClassAndText("very-light-gray score", ""));
    } else {
      //checking which score is bigger and bolding it -> these 2 if-else statements
      if (this.redScore > this.blueScore) {
        header.appendChild(createDivWithClassAndText("light-ftc-red score bold", this.redScore));
      } else {
        header.appendChild(createDivWithClassAndText("light-ftc-red score", this.redScore));
      }
      header.appendChild(gimmeADivider());
      if (this.blueScore > this.redScore) {
        header.appendChild(createDivWithClassAndText("light-ftc-blue score bold", this.blueScore));
      } else {
        header.appendChild(createDivWithClassAndText("light-ftc-blue score", this.blueScore));
      }
    }
    header.appendChild(gimmeADivider());
    header.appendChild(createDivWithClassAndText("info", this.status))
    
    outerDiv.appendChild(header);
    //the colorful team stuff (ooohhhh)
    var matchStat = document.createElement("div");
    matchStat.className = "match-stat";

    //red
    //ifs that look like this -> check for team number to bold it
    if (this.redTeamA.teamNumber == this.teamNumber) {
      matchStat.appendChild(createTeamDiv("dark-ftc-red", this.redTeamA.teamNumber, this.redTeamA.teamName, true));
    } else {
      matchStat.appendChild(createTeamDiv("dark-ftc-red", this.redTeamA.teamNumber, this.redTeamA.teamName, false));
    }
    matchStat.appendChild(gimmeADivider());
    if (this.redTeamB.teamNumber == this.teamNumber) {
      matchStat.appendChild(createTeamDiv("dark-ftc-red", this.redTeamB.teamNumber, this.redTeamB.teamName, true));
    } else {
      matchStat.appendChild(createTeamDiv("dark-ftc-red", this.redTeamB.teamNumber, this.redTeamB.teamName, false));
    }
    matchStat.appendChild(gimmeADivider());

    //blue
    if (this.blueTeamA.teamNumber == this.teamNumber) {
      matchStat.appendChild(createTeamDiv("dark-ftc-blue", this.blueTeamA.teamNumber, this.blueTeamA.teamName, true));
    } else {
      matchStat.appendChild(createTeamDiv("dark-ftc-blue", this.blueTeamA.teamNumber, this.blueTeamA.teamName, false));
    }
    matchStat.appendChild(gimmeADivider());
    if (this.blueTeamB.teamNumber == this.teamNumber) {
      matchStat.appendChild(createTeamDiv("dark-ftc-blue", this.blueTeamB.teamNumber, this.blueTeamB.teamName, true));
    } else {
      matchStat.appendChild(createTeamDiv("dark-ftc-blue", this.blueTeamB.teamNumber, this.blueTeamB.teamName, false));
    }
    outerDiv.appendChild(matchStat);
    return outerDiv;
  }
}