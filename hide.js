if(location.href.indexOf("5.yasemm.com") != -1){
	// var div = document.getElementById("comments");
	// div.style.display = "none";
	console.log(chrome.tabs);
	chrome.tabs.insertCSS(tabId, {file: 'some-style.css'});
}