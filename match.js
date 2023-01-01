import {createDivWithClassAndText, gimmeADivider} from '/helpfulHTML.js';
// interface genericMatch {
//   title;
//   redScore;
//   blueScore;
// }

export class twoTeamMatch {
  title;
  status;
  redTeamA;
  redTeamB;
  redScore;
  blueTeamA;
  blueTeamB;
  blueScore;
  elementA;
  elementB;
  constructor(title, status, redTeamA, redTeamB, redScore, blueTeamA, blueTeamB, blueScore){
    this.title = title;
    this.status = status;
    this.redTeamA = redTeamA;
    this.redTeamB = redTeamB;
    this.redScore = redScore;
    this.blueTeamA = blueTeamA;
    this.blueTeamB = blueTeamB;
    this.blueScore = blueScore;
    this.elementA = this.createHTMLElement();
    this.elementB = this.createHTMLElement();
  }
  setScore(redScore, blueScore){
    this.redScore = redScore;
    this.blueScore = blueScore;
  }
  setStatus(status){
    this.status = status;
  }
  getElementA(){
    return this.elementA;
  }
  getElementB(){
    return this.elementB;
  }
  //literally makes an entire 2 elements for the scrolling list
  createHTMLElement(){
    var divider = document.createElement("div");
    divider.className = "divider";
    var outerDiv = document.createElement("div");
    //boring white header
    var header = document.createElement("div");
    header.className = "match-header";
    header.appendChild(createDivWithClassAndText("", this.title));
    header.appendChild(gimmeADivider());
    header.appendChild(createDivWithClassAndText("", this.status))
    outerDiv.appendChild(header);
    //the colorful stuff
    var matchStat = document.createElement("div");
    matchStat.className = "match-stat";
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-red rank", "-"));
    matchStat.appendChild(gimmeADivider());
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-red team", this.redTeamA));
    matchStat.appendChild(gimmeADivider());
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-red rank", "-"));
    matchStat.appendChild(gimmeADivider());
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-red team", this.redTeamB));
    matchStat.appendChild(gimmeADivider());
    if(this.redScore == null){
      matchStat.appendChild(createDivWithClassAndText("very-light-gray score", ""));
      matchStat.appendChild(gimmeADivider());
      matchStat.appendChild(createDivWithClassAndText("very-light-gray score", ""));
      matchStat.appendChild(gimmeADivider());
    }else{
      matchStat.appendChild(createDivWithClassAndText("light-ftc-red score", this.redScore));
      matchStat.appendChild(gimmeADivider());
      matchStat.appendChild(createDivWithClassAndText("light-ftc-blue score", this.blueScore));
      matchStat.appendChild(gimmeADivider());
    }
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue rank", "-"));
    matchStat.appendChild(gimmeADivider());
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue team", this.blueTeamA));
    matchStat.appendChild(gimmeADivider());
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue rank", "-"));
    matchStat.appendChild(gimmeADivider());
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue team", this.blueTeamB));
    outerDiv.appendChild(matchStat);
    return outerDiv;
  }
}

