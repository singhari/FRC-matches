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
        for (let index = 0; index < matchSchedule.schedule.length; index++) {
            const element = matchSchedule.schedule[index];
            if (!this.fieldNumbers.includes(element.field)) {
                console.log("new field");
                this.fields.push(new trackedField(element.field, matchSchedule, matchResultData));
                this.fieldNumbers.push(element.field);
            }
        }
        for (let index = 0; index < teamSchedule.schedule.length; index++) {
            const scheduleElement = teamSchedule.schedule[index];
            console.log(scheduleElement);
            const el = this.fields[this.fieldNumbers.indexOf(scheduleElement.field)].getMatch(scheduleElement.description);
            console.log(el);
            this.teamMatches.push(el);       
            el.createElements();
        }
        // this.updateMatchNumbers(matchSchedule, matchResultData);

    }
    updateScores(matchResultData){
        
    }
    updateStatus(matchResultData){

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
        for (let index = 0; index < matchSchedule.schedule.length; index++) {
            // console.log("LOOP : " + index + " Arr IND:" + ind);
            const element = matchSchedule.schedule[index];

            if (element.field == this.fieldNumber) {
                this.matches[ind] = new twoTeamMatch(element.description, "Upcoming",
                    element.teams[0].teamNumber, element.teams[1].teamNumber, null, //red
                    element.teams[2].teamNumber, element.teams[3].teamNumber, null); //blue
                // console.log(this.matches);
                ind++;
            }  
        }
        console.log(this.matches);
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
                ind++;
                if(ind >= this.matches.length){
                    return;
                }
            }
            
        }
        this.matches[ind].setStatus("In Progress");
    }
    getCurrentMatch() {
        return this.currentMatch
    }
    getStatusForMatch(matchId){
        return this.matches.find(element => element.description == matchId).status;
    }
    getMatch(matchId){
        console.log(this.matches.find(element => element.description == matchId));
        return this.matches.find(element => element.description == matchId);
    }
}
