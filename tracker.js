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
        //makes the fields, which are themselves a bunch of twoTeamMatches
        for (let index = 0; index < matchSchedule.length; index++) {
            const element = matchSchedule[index];
            if (!this.fieldNumbers.includes(element.field)) {
                this.fields.push(new trackedField(element.field, matchSchedule, matchResultData));
                this.fieldNumbers.push(element.field);

            }
        }  
        console.log(this.fields);
        //finds the twoTeamMatches corresponding to the team's schedule
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
    //detects if the schedule has changed so the main script can reset the tracker
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
    //returns an array: index 0: distance to next match, "-" if in progress, -1 if no more
    //index 1: match element (current/upcoming), if it exists
    getNextNum(){
        console.log("call");
        let ret = {};
        for (let index = 0; index < this.teamMatches.length; index++) {
            
            const element = this.teamMatches[index];
            console.log("loop");
            if(element.status == "In Progress"){
                ret[0]="-";
                ret[1]=element;
                return ret;
            }else if(element.status == "Upcoming"){  
                ret[0]=this.fields[this.fieldNumbers.indexOf(element.field)].compareMatch(element);
                ret[1]=element;
                return ret;
            }
        }
        ret[0]=-1;
        return ret;
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
    //creates all the matches
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
    //updates what match this field is currently on, and updates the scores
    updateMatchNumber(matchResultData) {
        this.currentMatch = 0;
        this.lastMatch = -1;
        let ind = 0;
        for (let index = 0; index < matchResultData.matches.length; index++) {
            const result = matchResultData.matches[index];
            console.log("LOOP");
            if (result.description == this.matches[ind].description) {
                if (index == this.matches.length - 1) {
                     this.currentMatch = -1;
                } else {
                    
                     this.currentMatch = ind;
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
        //
        this.matches[ind].setStatus("In Progress");
    }
    //returns how many matches away this field is from a particular match
    compareMatch(match) {
        console.log(this.matches.indexOf(match));
        console.log(this.currentMatch);
        return this.matches.indexOf(match)-this.currentMatch;
    }

    getStatusForMatch(matchId){
        return this.matches.find(element => element.description == matchId).status;
    }
    //returns a twoTeamMatch
    getMatch(matchId){

        return this.matches.find(element => element.description == matchId);
    }
}
