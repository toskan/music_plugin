let currentSong = {
	artist: '',
	track: '',
	album: '',
};

const wfmuPlayRadioApi = () => {
	const url = 'https://wfmu.org/currentliveshows.php?json=1';
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
			if (currentSong.track !== data.segment.title_html) {
				currentSong.artist = data.segment.artist_html;
				currentSong.track = data.segment.title_html;
				currentSong.album = data.segment.album_html;
				console.log(currentSong);
				return currentSong;
			}
		})
		.catch((error) => console.log('error', error));
};

wfmuPlayRadioApi();
setInterval(wfmuPlayRadioApi, 15000);
