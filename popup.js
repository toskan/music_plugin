const formKey = document.getElementById('credentials-form-key');
const formSecret = document.getElementById('credentials-form-secret');
const resetButton = document.getElementById('reset-button');

const showHide = () => {
	chrome.storage.sync.get('step', function (obj) {
		document.getElementById('scrobble-ready').style.display = 'none';
		document.getElementById('reset').style.display = 'none';
		document.getElementById('secret-submit').style.display = 'none';
		document.getElementById('get-credentials').style.display = 'block';
		document.getElementById('key-submit').style.display = 'block';
		if (obj.step == 'keySubmit') {
			document.getElementById('scrobble-ready').style.display = 'none';
			document.getElementById('reset').style.display = 'none';
			document.getElementById('secret-submit').style.display = 'none';
			document.getElementById('get-credentials').style.display = 'block';
			document.getElementById('key-submit').style.display = 'block';
		}
		if (obj.step == 'secretSubmit') {
			document.getElementById('get-credentials').style.display = 'none';
			document.getElementById('key-submit').style.display = 'none';
			document.getElementById('get-credentials').style.display = 'block';
			document.getElementById('reset').style.display = 'block';
			document.getElementById('secret-submit').style.display = 'block';
		}
		if (obj.step == 'scrobbleReady') {
			document.getElementById('get-credentials').style.display = 'none';
			document.getElementById('key-submit').style.display = 'none';
			document.getElementById('secret-submit').style.display = 'none';
			document.getElementById('scrobble-ready').style.display = 'block';
			document.getElementById('reset').style.display = 'block';
		}
	});
};

const getCredentials = (e) => {
	e.preventDefault();
	if (e.currentTarget.id === 'credentials-form-key') {
		let apiKey = document.getElementById('api-key').value;
		chrome.storage.sync.set({ apiKey });
		chrome.storage.sync.set({ step: 'secretSubmit' }).then(showHide());
	}
	if (e.currentTarget.id === 'credentials-form-secret') {
		let apiSecret = document.getElementById('api-secret').value;
		chrome.storage.sync
			.set({ step: 'scrobbleReady' })
			.then(chrome.storage.sync.set({ apiSecret }))
			.then(showHide());
	}
};

const resetCredentials = () => {
	chrome.storage.sync.set({ step: 'keySubmit' }).then(showHide());
	chrome.storage.sync.set({ apiKey: undefined });
	chrome.storage.sync.set({ apiSecret: undefined });
};

formKey.addEventListener('submit', getCredentials);
formSecret.addEventListener('submit', getCredentials);
resetButton.addEventListener('click', resetCredentials);
showHide();