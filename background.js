var running = true;
var list = [
    {url: '//www.youtube.com/', name: 'youtube'},
    {url: '//www.bilibili.com/', name: 'bilibili'}
];

function changeState(){
    running = !running;
    if(running){
        chrome.browserAction.setIcon({
            path: {
                "19": "./img/run-19.png",
                "38": "./img/run-38.png"
            }
        });
    }
    else{
        chrome.browserAction.setIcon({
            path: {
                "19": "./img/stop-19.png",
                "38": "./img/stop-38.png"
            }
        });
    }
}

chrome.browserAction.onClicked.addListener(() => {
    changeState();
    hideDiv();
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log("changeInfo.status:" + changeInfo.status);
    hideDiv();
    // if (changeInfo.status == 'complete') {
    //     console.log(tab.url);
    //     hideDiv();
    // }
});

chrome.webNavigation.onBeforeNavigate.addListener(function(){
    console.log(arguments);
    hideDiv();
})

function hideDiv(){
    console.log("运行：" + running);
    if(!running){
        return;
    }
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var tab = tabs[0];
        list.forEach(function(item){
            if(tab.url.indexOf(item.url) != -1){
                console.log("注入样式：" + item.name);
                chrome.tabs.insertCSS(tab.id, {
                    file: "css/" + item.name + ".css"
                });
            }
        })
    });
}