chrome.runtime.onMessage.addListener(
    function (data, sender, sendResponse) {
        fetch(data.url, {
            headers: {
                authorization: "Basic " + btoa("karsteny:3298DEAE-A59D-487C-8092-3C4B1C63ECE3")
            }
        })
        .then((response) => response.json())
        .then((deeta) => sendResponse(deeta));
        return true;
    }
);