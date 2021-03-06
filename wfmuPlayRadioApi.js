let currentSong = {
	artist: '',
	track: '',
	album: '',
};

let apiKey;
let secret;
let sessionKey;
let apiRoot = 'https://ws.audioscrobbler.com/2.0/';
let regExSpecialChars = /[\&\:\+\?\=]/g;

const values = chrome.storage.sync.get(
	['apiKey', 'apiSecret', 'sessionKey'],
	function (res) {
		apiKey = res.apiKey;
		secret = res.apiSecret;
		sessionKey = res.sessionKey;
	}
);

const sign = (params) => {
	params = [...params].filter((e) => e !== '&' && e !== '=').join('');
	return Encrypt.MD5(`${params}${secret}`);
};

const scrobbleTrack = () => {
	let method = 'track.scrobble';
	let timestamp = Math.round(new Date().getTime() / 1000);
	let params = `album=${currentSong.album}&api_key=${apiKey}&artist=${currentSong.artist}&method=${method}&sk=${sessionKey}&timestamp=${timestamp}&track=${currentSong.track}`;
	let s = sign(params);
	var requestOptions = {
		method: 'POST',
		redirect: 'follow',
	};
	fetch(`${apiRoot}?${params}&api_sig=${s}`, requestOptions)
		.then((response) => response.text())
		.then(console.log)
		.catch(console.log);
};

const wfmuPlayRadioApi = () => {
	const url =
		'https://accesscontrolalloworiginall.herokuapp.com/https://wfmu.org/currentliveshows.php?json=1';
	let requestOptions = {
		method: 'GET',
		redirect: 'follow',
	};
	fetch(url, requestOptions)
		.then((response) => response.json())
		.then((data) => {
			if (!data.segment.title_html) {
				currentSong.track = null;
			}
			if (!data.segment.album_html) {
				currentSong.album = null;
			}
			if (!data.segment.artist_html) {
				currentSong.artist = null;
			}
			if (!!data.segment.title_html) {
				if (
					currentSong.track !==
					data.segment.title_html
						.trim()
						.replace(regExSpecialChars, ' ')
				) {
					if (!!data.segment.artist_html) {
						currentSong.artist = data.segment.artist_html.replace(
							regExSpecialChars,
							' '
						);
					}
					currentSong.track = data.segment.title_html
						.trim()
						.replace(regExSpecialChars, ' ');
					if (!!data.segment.album_html) {
						currentSong.album = data.segment.album_html.replace(
							regExSpecialChars,
							' '
						);
					}
					scrobbleTrack();
					return currentSong;
				}
			}
		})
		.catch(console.log);
};

wfmuPlayRadioApi();
setInterval(wfmuPlayRadioApi, 15000);
