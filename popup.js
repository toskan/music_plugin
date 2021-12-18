chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
	document.getElementById('url').textContent = tabs[0].url;
});
