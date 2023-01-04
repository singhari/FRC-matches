document.getElementById("submit").addEventListener("click", openSite);
const team = document.getElementById("team");
const teamErr = document.getElementById("team-error");
const code = document.getElementById("code");
const codeErr = document.getElementById("code-error");
const regex = new RegExp("^[0-9]+$");
async function openSite(){
  teamErr.textContent="";
  codeErr.textContent="";
  let bad = false;
  if(team.value.trim() == ""){
    bad = true;
    teamErr.textContent = "Team number is blank."
  }else if(!regex.test(team.value)){
    bad = true;
    teamErr.textContent = "Team number is not a number."
  }
  if(code.value.trim() == ""){
    bad = true;
    codeErr.textContent = "Event code is blank."
  }
  if(!bad){
    var event = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/events?eventCode="+code.value.trim() })
    var tm = await chrome.runtime.sendMessage({ url: "https://ftc-api.firstinspires.org/v2.0/2022/teams?teamNumber="+team.value.trim() })
    console.log(tm);
    console.log(event);
    if(typeof tm === "string"){
      bad = true;
      teamErr.textContent = "Invalid team number"
    }
    if(typeof event === "string"){
      bad = true;
      codeErr.textContent = "Invalid event code."
    }
    if(!bad){
      const wind = window.open("/index.html", "", "popup");
      wind.num = team.value.trim();
      wind.teamName = tm.teams[0].nameShort;
      wind.evCode = code.value.trim();
      wind.evName = event.events[0].name;
    }
  }
}