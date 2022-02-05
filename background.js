chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.onChanged.addListener(function (changes) {
		for (let [key] of Object.entries(changes)) {
			chrome.storage.sync.get(['apiKey', 'step'], function (obj) {
				let apiKey = obj.apiKey;
				let step = obj.step;
				openAuthWindow(step, apiKey);
			});
		}
	});
});

const openAuthWindow = (step, apiKey) => {
	if (step == 'authentication') {
		var url = `https://www.last.fm/api/auth/?api_key=${apiKey}`;
		chrome.tabs.create({ url });
	}
};
