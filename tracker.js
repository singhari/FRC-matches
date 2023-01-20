import { twoTeamMatch } from "./match.js";

export class trackedEvent {
    fields;
    fieldNumbers;
    teamMatches;
    teamNumber;

    constructor(matchSchedule, matchResultData, team, teamSchedule) {
        this.fields = [];
        this.fieldNumbers = [];
        this.teamMatches = [];
        this.totalNumMatches = 0;
        for (let index = 0; index < matchSchedule.length; index++) {
            const element = matchSchedule[index];
            if (!this.fieldNumbers.includes(element.field)) {
                this.fields.push(new trackedField(element.field, matchSchedule, matchResultData));
                this.fieldNumbers.push(element.field);

            }
        }  
        console.log(this.fields);
        for (let index = 0; index < teamSchedule.schedule.length; index++) {
            const scheduleElement = teamSchedule.schedule[index];
            const el = this.fields[this.fieldNumbers.indexOf(scheduleElement.field)].getMatch(scheduleElement.description);
            this.teamMatches.push(el);       
            el.setTeam(team);
            el.createElements();
        }
        // this.updateMatchNumbers(matchSchedule, matchResultData);

    }
    addElements(scrollA, scrollB){
        this.teamMatches.forEach(element => {
            scrollA.appendChild(element.getElementA());
            scrollB.appendChild(element.getElementB());
        });
    }
    updateScoresAndStatus(matchResultData){
        this.fields.forEach(element => {
            element.updateMatchNumber(matchResultData);
        });
    }
    updateRanks(ranks){
        this.teamMatches.forEach(element => {
            element.updateRankings(ranks);
        });
    }
    isChanged(allSchedule){
        let totalMatches = 0;
        this.fields.forEach(element => {
            totalMatches += element.matches.length
        });
        if(totalMatches != allSchedule.length){
            return true;
        }else{
            return false;
        }
    }
    getNextNum(){
        this.teamMatches.forEach(element => {
            if(element.status == "In Progress"){
                return "-";
            }else if(element.status == "Upcoming"){
                return this.fields[this.fieldNumbers.indexOf(element.field)].compareMatch(element);
            }
        });
        return -1;
    }
}
class trackedField {
    fieldNumber;
    currentMatch;
    lastMatch;
    matches;
    
    constructor(fieldNumber, schedule, resultData) {
        // console.log("fn: " + fieldNumber + " BEGIN");
        this.fieldNumber = fieldNumber;
        this.build(schedule);
        this.updateMatchNumber(resultData);
    }
    build(matchSchedule) {
        this.matches = [];
        let ind = 0;
        for (let index = 0; index < matchSchedule.length; index++) {
            // console.log("LOOP : " + index + " Arr IND:" + ind);
            const element = matchSchedule[index];

            if (element.field == this.fieldNumber) {
                this.matches[ind] = new twoTeamMatch(element.description, "Upcoming", this.fieldNumber,
                    element.teams[0].teamNumber, element.teams[1].teamNumber, null, //red
                    element.teams[2].teamNumber, element.teams[3].teamNumber, null); //blue
                // console.log(this.matches);
                ind++;
            }  
        }
    }
    updateMatchNumber(matchResultData) {
        this.currentMatch = -1;
        this.lastMatch = -1;
        let ind = 0;
        for (let index = 0; index < matchResultData.matches.length; index++) {
            // console.log("RESULT LOOP : " + index + " Arr IND:" + ind);
            const result = matchResultData.matches[index];
            if (result.description == this.matches[ind].description) {
                // console.log(this.matches);
                if (index == this.matches.length - 1) {
                     this.currentMatch = -1;
                } else {
                     this.currentMatch = ind + 1;
                }
                this.lastMatch = ind;
                this.matches[ind].setStatus("Completed");
                this.matches[ind].setScore(result.scoreRedFinal, result.scoreBlueFinal);
                ind++;
                if(ind >= this.matches.length){
                    return;
                }
            }
            
        }
        this.matches[ind].setStatus("In Progress");
    }
    compareMatch(match) {
        console.log(this.matches.indexOf(match));
        return this.matches.indexOf(match)-this.currentMatch;
    }
    getStatusForMatch(matchId){
        return this.matches.find(element => element.description == matchId).status;
    }
    getMatch(matchId){
        // console.log(this.matches.find(element => element.description == matchId));
        return this.matches.find(element => element.description == matchId);
    }
}
