import { createDivWithClassAndText, gimmeADivider } from './helpfulHTML.js';

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
                this.elementA.children[1].children[8].textContent = this.redScore;
                this.elementA.children[1].children[10].textContent = this.blueScore;
                this.elementB.children[1].children[8].textContent = this.redScore;
                this.elementB.children[1].children[10].textContent = this.blueScore;
                //TODO: FIX THE ELEMENT POSITIONS
                if (this.redScore > this.blueScore) {

                    this.elementA.children[1].children[8].className = "light-ftc-red score bold";
                    this.elementB.children[1].children[8].className = "light-ftc-red score bold";
                    this.elementA.children[1].children[10].className = "light-ftc-blue score";
                    this.elementB.children[1].children[10].className = "light-ftc-blue score";
                } else if (this.blueScore > this.redScore) {
                    this.elementA.children[1].children[10].className = "light-ftc-blue score bold";
                    this.elementB.children[1].children[10].className = "light-ftc-blue score bold";
                    this.elementA.children[1].children[8].className = "light-ftc-red score";
                    this.elementB.children[1].children[8].className = "light-ftc-red score";
                }
            }
        }
    }
    updateRankings(rankList) {
        //TODO: FIX THE ELEMENT POSITIONS 
        if (this.hasElements) {
            this.elementA.children[1].children[0].textContent = rankList[this.elementA.children[1].children[2].textContent];
            this.elementA.children[1].children[4].textContent = rankList[this.elementA.children[1].children[6].textContent];
            this.elementA.children[1].children[12].textContent = rankList[this.elementA.children[1].children[14].textContent];
            this.elementA.children[1].children[16].textContent = rankList[this.elementA.children[1].children[18].textContent];
            this.elementB.children[1].children[0].textContent = rankList[this.elementA.children[1].children[2].textContent];
            this.elementB.children[1].children[4].textContent = rankList[this.elementA.children[1].children[6].textContent];
            this.elementB.children[1].children[12].textContent = rankList[this.elementA.children[1].children[14].textContent];
            this.elementB.children[1].children[16].textContent = rankList[this.elementA.children[1].children[18].textContent];
        }
    }
    setStatus(status) {
        this.status = status;
        if (this.hasElements) {
            this.elementA.children[0].children[2].textContent = this.status;
            this.elementB.children[0].children[2].textContent = this.status;
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
        if (this.redTeamA == this.teamNumber || this.redTeamB == this.teamNumber || this.redTeamC == this.teamNumber) return "red";
        else if (this.blueTeamA == this.teamNumber || this.blueTeamB == this.teamNumber || this.blueTeamC == this.teamNumber) return "blue";
        else return null;
    }

    createHTMLElement() {
        var outerDiv = document.createElement("div");
        //boring white header
        var header = document.createElement("div");
        header.className = "match-header";
        header.appendChild(createDivWithClassAndText("", this.description));
        header.appendChild(gimmeADivider());
        header.appendChild(createDivWithClassAndText("", this.status))
        outerDiv.appendChild(header);
        //the colorful stuff
        var matchStat = document.createElement("div");
        matchStat.className = "match-stat";
        matchStat.appendChild(createDivWithClassAndText("dark-ftc-red rank", ""));
        matchStat.appendChild(gimmeADivider());
        //ifs that look like this -> check for team number to bold it
        if (this.redTeamA == this.teamNumber) {
          matchStat.appendChild(createDivWithClassAndText("dark-ftc-red team bold", this.redTeamA));
        } else {
          matchStat.appendChild(createDivWithClassAndText("dark-ftc-red team", this.redTeamA));
        }
        matchStat.appendChild(gimmeADivider());
        matchStat.appendChild(createDivWithClassAndText("dark-ftc-red rank", ""));
        matchStat.appendChild(gimmeADivider());
        if (this.redTeamB == this.teamNumber) {
          matchStat.appendChild(createDivWithClassAndText("dark-ftc-red team bold", this.redTeamB));
        } else {
          matchStat.appendChild(createDivWithClassAndText("dark-ftc-red team", this.redTeamB));
        }
        matchStat.appendChild(gimmeADivider());
        matchStat.appendChild(createDivWithClassAndText("dark-ftc-red rank", ""));
        matchStat.appendChild(gimmeADivider());
        if (this.redTeamC == this.teamNumber) {
          matchStat.appendChild(createDivWithClassAndText("dark-ftc-red team bold", this.redTeamC));
        } else {
          matchStat.appendChild(createDivWithClassAndText("dark-ftc-red team", this.redTeamC));
        }
        matchStat.appendChild(gimmeADivider());
        if (this.redScore == null) {
          //no score
          matchStat.appendChild(createDivWithClassAndText("very-light-gray score", ""));
          matchStat.appendChild(gimmeADivider());
          matchStat.appendChild(createDivWithClassAndText("very-light-gray score", ""));
          matchStat.appendChild(gimmeADivider());
        } else {
          //checking which score is bigger and bolding it -> these 2 if-else statements
          if (this.redScore > this.blueScore) {
            matchStat.appendChild(createDivWithClassAndText("light-ftc-red score bold", this.redScore));
          } else {
            matchStat.appendChild(createDivWithClassAndText("light-ftc-red score", this.redScore));
          }
          matchStat.appendChild(gimmeADivider());
          if (this.blueScore > this.redScore) {
            matchStat.appendChild(createDivWithClassAndText("light-ftc-blue score bold", this.blueScore));
          } else {
            matchStat.appendChild(createDivWithClassAndText("light-ftc-blue score", this.blueScore));
          }
          matchStat.appendChild(gimmeADivider());
        }
        matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue rank", ""));
        matchStat.appendChild(gimmeADivider());
        if (this.blueTeamA == this.teamNumber) {
          matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue team bold", this.blueTeamA));
        } else {
          matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue team", this.blueTeamA));
        }
        matchStat.appendChild(gimmeADivider());
        matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue rank", ""));
        matchStat.appendChild(gimmeADivider());
        if (this.blueTeamB == this.teamNumber) {
          matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue team bold", this.blueTeamB));
        } else {
          matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue team", this.blueTeamB));
        }
        matchStat.appendChild(gimmeADivider());
        matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue rank", ""));
        matchStat.appendChild(gimmeADivider());
        if (this.blueTeamC == this.teamNumber) {
          matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue team bold", this.blueTeamC));
        } else {
          matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue team", this.blueTeamC));
        }
        outerDiv.appendChild(matchStat);
        return outerDiv;
      }
}