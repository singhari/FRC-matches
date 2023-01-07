//thing that saves 3 lines of code when i want a simple div with class and text
export function createDivWithClassAndText(classN, text){
  var div = document.createElement("div");
  div.className = classN;
  div.appendChild(document.createTextNode(text));
  return div;
}
//because you can't just automatically duplicate elements, they are live objects
export function gimmeADivider(){
  var divider = document.createElement("div");
  divider.className = "divider";
  return divider;
}

