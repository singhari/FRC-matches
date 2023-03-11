function save(){
    chrome.storage.sync.set({
        username: document.getElementById("username").value,
        token: document.getElementById("token").value,
        refresh: document.getElementById("refresh").value
      }, function(){
        document.getElementById("status").textContent = "Saved!";
        setTimeout(function(){
            document.getElementById("status").textContent = "";
        }, 1000)
      });
}
function loadOptions(){
    document.getElementById("username").value="eeeeeeeeee";
    chrome.storage.sync.get({
        refresh: 30,
        username: "",
        token: ""
      }, function(items) {
        document.getElementById("username").value = items.username;
        document.getElementById("token").value = items.token;
        document.getElementById("refresh").value = items.refresh;
      });
}
document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById("submit").addEventListener("click", save);