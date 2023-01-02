import {createDivWithClassAndText, gimmeADivider} from '/helpfulHTML.js';
// interface genericMatch {
//   title;
//   redScore;
//   blueScore;
// }

export class twoTeamMatch {
  matchNo;
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
  constructor(matchNo, title, status, redTeamA, redTeamB, blueTeamA, blueTeamB){
    this.matchNo = matchNo
    this.title = title;
    this.status = status;
    this.redTeamA = redTeamA;
    this.redTeamB = redTeamB;
    this.blueTeamA = blueTeamA;
    this.blueTeamB = blueTeamB;
    this.elementA = this.createHTMLElement();
    this.elementB = this.createHTMLElement();
  }
  setScore(redScore, blueScore){
    this.redScore = redScore;
    this.blueScore = blueScore;
    this.elementA.children[1].children[8].textContent=this.redScore;
    this.elementA.children[1].children[10].textContent=this.blueScore;
  }
  setStatus(status){
    this.status = status;
  }
  //takes in the key-pair list for rankings and applies it
  updateRankings(rankList){
    this.elementA.children[1].children[0].textContent=rankList[this.elementA.children[1].children[2].textContent];
    this.elementA.children[1].children[4].textContent=rankList[this.elementA.children[1].children[6].textContent];
    this.elementA.children[1].children[12].textContent=rankList[this.elementA.children[1].children[14].textContent];
    this.elementA.children[1].children[16].textContent=rankList[this.elementA.children[1].children[18].textContent];
    this.elementB.children[1].children[0].textContent=rankList[this.elementA.children[1].children[2].textContent];
    this.elementB.children[1].children[4].textContent=rankList[this.elementA.children[1].children[6].textContent];
    this.elementB.children[1].children[12].textContent=rankList[this.elementA.children[1].children[14].textContent];
    this.elementB.children[1].children[16].textContent=rankList[this.elementA.children[1].children[18].textContent];
  }
  //sets that upper right hand box
  setStatus(status){
    this.status = status;
    this.elementA.children[0].children[3].textContent=this.status;
  }

  getElementA(){
    return this.elementA;
  }
  getElementB(){
    return this.elementB;
  }

  //literally makes an entire 2 elements for the scrolling list
  createHTMLElement(){
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
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-red rank", ""));
    matchStat.appendChild(gimmeADivider());
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-red team", this.redTeamA));
    matchStat.appendChild(gimmeADivider());
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-red rank", ""));
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
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue rank", ""));
    matchStat.appendChild(gimmeADivider());
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue team", this.blueTeamA));
    matchStat.appendChild(gimmeADivider());
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue rank", ""));
    matchStat.appendChild(gimmeADivider());
    matchStat.appendChild(createDivWithClassAndText("dark-ftc-blue team", this.blueTeamB));
    outerDiv.appendChild(matchStat);
    return outerDiv;
  } 
}

