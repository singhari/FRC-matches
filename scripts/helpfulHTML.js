//Extra things I wrote that were useful in the creation of FTC Matches

//thing that saves 3 lines of code when i want a simple div with class and text
export function createDivWithClassAndText(classN, text){
  var div = document.createElement("div");
  div.className = classN;
  div.appendChild(document.createTextNode(text));
  return div;
}
//oh no way an all-in-one solution to make a score thing
export function createTeamDiv(colorClass, teamNumber, teamName, isBold){
  var div = document.createElement("div");
  div.className = colorClass + " team";
  // var s1 = document.createElement("span");
  // s1.textContent="#0";
  // s1.className = "rank";
  // div.appendChild(s1);
  var s2 = document.createElement("span");
  s2.textContent = teamNumber;
  if(isBold){
    s2.className = "bold";
  }
  div.appendChild(s2);
  div.appendChild(createDivWithClassAndText("team-name", teamName));
  return div;
}
//because you can't just automatically duplicate elements, they are live objects
export function gimmeADivider(){
  var divider = document.createElement("div");
  divider.className = "divider";
  return divider;
}

