let apiKey;
let secret;
let token;
let apiRoot = 'https://ws.audioscrobbler.com/2.0/';

values = chrome.storage.sync.get(['apiKey', 'apiSecret'], async function (res) {
	apiKey = res.apiKey;
	secret = res.apiSecret;
	getTokenAndSessionKey();
});

const signAuth = (method) => {
	return Encrypt.MD5(`api_key${apiKey}method${method}token${token}${secret}`);
};

const authUrl = () => {
	let method = 'auth.getSession';
	let s = signAuth(method);
	var requestOptions = {
		method: 'GET',
		redirect: 'follow',
	};
	fetch(
		`${apiRoot}?method=${method}&api_key=${apiKey}&token=${token}&api_sig=${s}`,
		requestOptions
	)
		.then((data) => data.text())
		.then((result) => {
			let sessionKey = new window.DOMParser()
				.parseFromString(result, 'text/xml')
				.getElementsByTagName('key')[0].innerHTML;
			chrome.storage.sync.set({ sessionKey });
			if (sessionKey) {
				chrome.storage.sync.set({ step: 'scrobbleReady' });
			}
			if (!sessionKey) {
				chrome.storage.sync.set({ step: 'failed' });
			}
		})
		.catch(console.log);
};

function getTokenAndSessionKey() {
	let urlString = window.location.href;
	var url = new URL(urlString);
	token = url.searchParams.get('token');
	authUrl();
}
