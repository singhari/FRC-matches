//This evades the CORS policy, and it's why this program cannot be offered as a webpage.
chrome.runtime.onMessage.addListener(
    function (data, sender, sendResponse) {
        const prom = fetch(data.url, {
            headers: {
                authorization: "Basic " + btoa("roboravens7159:11a37aa9-5490-434d-8afc-2e60c2c1589b")
            },
            cache: "no-store"
        })
        .then((response) => {
            if(response.ok){
                return response.json();
            }else{
                return JSON.parse("{\"error\": \""+response.status + "\"}");
            }
        })
        .then((deeta) => sendResponse(deeta))
        .catch((reason) => {
            sendResponse(JSON.parse("{\"error\": \"Failed to fetch.\"}"));
        });
        return true;
    }
);
