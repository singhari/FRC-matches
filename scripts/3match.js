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
}