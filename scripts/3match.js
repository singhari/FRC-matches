import { createDivWithClassAndText, gimmeADivider, createTeamDiv } from './helpfulHTML.js';

export class threeTeamMatch {
    description;
    status;
    field;
    redTeamA;
    redTeamB;
    redTeamC;
    redScore;
    blueTeamA;
    blueTeamB;
    blueTeamC;
    blueScore;
    elementA;
    elementB;
    teamNumber;
    hasElements;
    constructor(description, status, field, redTeamA, redTeamB, redTeamC, redScore, blueTeamA, blueTeamB, blueTeamC, blueScore, teamNumber) {
        this.description = description;
        this.status = status;
        this.field = field;
        this.redTeamA = redTeamA;
        this.redTeamB = redTeamB;
        this.redTeamC = redTeamC;
        this.redScore = redScore;
        this.blueTeamA = blueTeamA;
        this.blueTeamB = blueTeamB;
        this.blueTeamC = blueTeamC;
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
    updateRankings(rankList) {
        if (this.hasElements) {
          this.elementA.children[1].children[0].children[1].textContent = 
            "#"+rankList[this.redTeamA.teamNumber]+" | "+this.redTeamA.teamName;
          this.elementA.children[1].children[2].children[1].textContent = 
            "#"+rankList[this.redTeamB.teamNumber]+" | "+this.redTeamB.teamName;
          this.elementA.children[1].children[4].children[1].textContent = 
            "#"+rankList[this.redTeamC.teamNumber]+" | "+this.redTeamC.teamName;
          this.elementA.children[1].children[6].children[1].textContent = 
            "#"+rankList[this.blueTeamA.teamNumber]+" | "+this.blueTeamA.teamName;
          this.elementA.children[1].children[8].children[1].textContent = 
            "#"+rankList[this.blueTeamB.teamNumber]+" | "+this.blueTeamB.teamName;
          this.elementA.children[1].children[10].children[1].textContent = 
            "#"+rankList[this.blueTeamB.teamNumber]+" | "+this.blueTeamB.teamName;

          this.elementB.children[1].children[0].children[1].textContent = 
            "#"+rankList[this.redTeamA.teamNumber]+" | "+this.redTeamA.teamName;
          this.elementB.children[1].children[2].children[1].textContent = 
            "#"+rankList[this.redTeamB.teamNumber]+" | "+this.redTeamB.teamName;
          this.elementB.children[1].children[4].children[1].textContent = 
            "#"+rankList[this.redTeamC.teamNumber]+" | "+this.redTeamC.teamName;
          this.elementB.children[1].children[6].children[1].textContent = 
            "#"+rankList[this.blueTeamA.teamNumber]+" | "+this.blueTeamA.teamName;
          this.elementB.children[1].children[8].children[1].textContent = 
            "#"+rankList[this.blueTeamB.teamNumber]+" | "+this.blueTeamB.teamName;
          this.elementB.children[1].children[10].children[1].textContent = 
            "#"+rankList[this.blueTeamB.teamNumber]+" | "+this.blueTeamB.teamName;

            // this.elementA.children[1].children[0].textContent = rankList[this.elementA.children[1].children[2].textContent];
            // this.elementA.children[1].children[4].textContent = rankList[this.elementA.children[1].children[6].textContent];
            // this.elementA.children[1].children[8].textContent = rankList[this.elementA.children[1].children[10].textContent];
            // this.elementA.children[1].children[16].textContent = rankList[this.elementA.children[1].children[18].textContent];
            // this.elementA.children[1].children[20].textContent = rankList[this.elementA.children[1].children[22].textContent];
            // this.elementA.children[1].children[24].textContent = rankList[this.elementA.children[1].children[26].textContent];
            // this.elementB.children[1].children[0].textContent = rankList[this.elementA.children[1].children[2].textContent];
            // this.elementB.children[1].children[4].textContent = rankList[this.elementA.children[1].children[6].textContent];
            // this.elementB.children[1].children[8].textContent = rankList[this.elementA.children[1].children[10].textContent];
            // this.elementB.children[1].children[16].textContent = rankList[this.elementA.children[1].children[18].textContent];
            // this.elementB.children[1].children[20].textContent = rankList[this.elementA.children[1].children[22].textContent];
            // this.elementB.children[1].children[24].textContent = rankList[this.elementA.children[1].children[26].textContent];
        }
    }
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
        if (this.redTeamA.teamNumber == this.teamNumber || this.redTeamB.teamNumber == this.teamNumber || this.redTeamC.teamNumber == this.teamNumber) return "red";
        else if (this.blueTeamA.teamNumber == this.teamNumber || this.blueTeamB.teamNumber == this.teamNumber || this.blueTeamC.teamNumber == this.teamNumber) return "blue";
        else return null;
    }

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
        //the colorful stuff
        var matchStat = document.createElement("div");
        matchStat.className = "match-stat";
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
        if (this.redTeamC.teamNumber == this.teamNumber) {
          matchStat.appendChild(createTeamDiv("dark-ftc-red", this.redTeamC.teamNumber, this.redTeamC.teamName, true));
        } else {
          matchStat.appendChild(createTeamDiv("dark-ftc-red", this.redTeamC.teamNumber, this.redTeamC.teamName, false));
        }
        matchStat.appendChild(gimmeADivider());
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
        matchStat.appendChild(gimmeADivider());
        if (this.blueTeamC.teamNumber == this.teamNumber) {
          matchStat.appendChild(createTeamDiv("dark-ftc-blue", this.blueTeamC.teamNumber, this.blueTeamC.teamName, true));
        } else {
          matchStat.appendChild(createTeamDiv("dark-ftc-blue", this.blueTeamC.teamNumber, this.blueTeamC.teamName, false));
        }
        outerDiv.appendChild(matchStat);
        return outerDiv;
      }
}