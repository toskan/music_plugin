let apiKey;
let secret;
let sessionKey;
let apiRoot = 'https://ws.audioscrobbler.com/2.0/';

const sign = (params) => {
	params = [...params].filter((e) => e !== '&' && e !== '=').join('');
	return Encrypt.MD5(`${params}${secret}`);
};

const loveTrack = (artist, method, track) => {
	let params = `api_key=${apiKey}&artist=${artist}&method=${method}&sk=${sessionKey}&track=${track}`;
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

const scrobbleTrack = (album, artist, method, track) => {
	let timestamp = Math.round(new Date().getTime() / 1000);
	//the parameters need to be ordered alphabetically
	let params = `album=${album}&api_key=${apiKey}&artist=${artist}&method=${method}&sk=${sessionKey}&timestamp=${timestamp}&track=${track}`;
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

class Scrape {
	constructor(artist, track, album, apiMethod) {
		this.dropTable = document.querySelector('#drop_table tbody');
		this.artist = artist;
		this.track = track;
		this.album = album;
		this.apiMethod = apiMethod;

		this.starObserver = new MutationObserver((mutationList) => {
			mutationList.forEach(({ target, oldValue }) => {
				if (
					target.src.includes('favorited') &&
					oldValue.includes('empty')
				) {
					let parent =
						target.parentNode.parentNode.parentNode.parentNode;

					this.apiMethod = 'track.love';
					if (
						this.track !==
							parent.querySelectorAll('.col_song_title font')[0]
								.innerText &&
						parent.querySelectorAll('.col_song_title font')[0]
							.innerText !== undefined
					) {
						this.artist = parent
							.querySelectorAll('.col_artist font')[0]
							.innerText.trim();

						this.track = parent
							.querySelectorAll('.col_song_title font')[0]
							.innerText.trim();

						this.album = parent
							.querySelectorAll('.col_album_title font')[0]
							.innerText.trim();
						loveTrack(this.artist, this.apiMethod, this.track);
					}
				}
			});
		});

		this.getValueByClass = (node, klass) => {
			const child = Array.prototype.find.call(node.children, (child) => {
				return child.classList.contains(klass);
			});

			return child?.children?.[0]?.innerText;
		};

		this.observerLive = new MutationObserver((mutationList) => {
			mutationList.forEach(({ addedNodes }) => {
				addedNodes.forEach((node) => {
					if (!/^drop_/.test(node.id)) {
						return true;
					}
					this.apiMethod = 'track.scrobble';
					if (
						this.track !==
							this.getValueByClass(node, 'col_song_title') &&
						this.getValueByClass(node, 'col_song_title') !==
							undefined
					) {
						this.artist = this.getValueByClass(
							node,
							'col_artist'
						).trim();
						this.track = this.getValueByClass(
							node,
							'col_song_title'
						).trim();
						this.album = this.getValueByClass(
							node,
							'col_album_title'
						).trim();
						scrobbleTrack(
							this.album,
							this.artist,
							this.apiMethod,
							this.track
						);
					}
				});
			});
		});

		this.starObserver.observe(this.dropTable, {
			attribute: true,
			attributeFilter: ['src'],
			subtree: true,
			attributeOldValue: true,
		});
		this.observerLive.observe(this.dropTable, {
			childList: true,
		});
	}
}

let scrape = new Scrape();
let values = chrome.storage.sync.get(
	['apiKey', 'apiSecret', 'sessionKey'],
	function (res) {
		apiKey = res.apiKey;
		secret = res.apiSecret;
		sessionKey = res.sessionKey;
	}
);

Promise.all([values]).then(scrape);
