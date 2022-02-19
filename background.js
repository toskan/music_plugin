chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.onChanged.addListener(function (changes) {
		for (let [key] of Object.entries(changes)) {
			chrome.storage.sync.get(['apiKey', 'step'], function (obj) {
				let apiKey = obj.apiKey;
				let step = obj.step;
				if (key == 'step') openAuthWindow(step, apiKey);
			});
		}
	});
});

const openAuthWindow = (step, apiKey) => {
	if (step == 'authentication') {
		console.log('authenitcation open url');
		var url = `https://www.last.fm/api/auth/?api_key=${apiKey}`;
		chrome.tabs
			.create({ url })
			.then(console.log)
			.catch((error) => {
				chrome.notifications.create({
					type: 'basic',
					iconUrl: '/images/radio_32px.png',
					title: 'Scrobble WFMU Radio with last.fm',
					message:
						'Something went wrong. Reset key and secret and try again.',
					priority: 2,
				});
			});
	}
	if (step == 'scrobbleReady') {
		chrome.notifications.create({
			type: 'basic',
			iconUrl: '/images/radio_32px.png',
			title: 'Scrobble WFMU Radio with last.fm',
			message: 'Success ! Ready to send tracks to last.fm',
			priority: 2,
		});
	}
	if (step == 'failed') {
		chrome.notifications.create({
			type: 'basic',
			iconUrl: '/images/radio_32px.png',
			title: 'Scrobble WFMU Radio with last.fm',
			message:
				'Something went wrong. Reset key and secret and try again.',
			priority: 2,
		});
	}
};
