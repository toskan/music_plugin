// TODO: prompt for authorization
// chrome.storage.sync.set({ color });

// background.js

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ color });
	console.log('Default background color set to %cgreen', `color: ${color}`);
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// 	console.log(request.starredSongInfo);
// });
