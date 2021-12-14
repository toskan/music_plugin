const axios = require('axios');

let currentSong = {
	artist: '',
	track: '',
	album: '',
};

async function getData() {
	const url = 'https://wfmu.org/currentliveshows.php?json=1';
	try {
		const { data } = await axios.get(url);
		if (!data.segment.title_html) {
			currentSong.track = null;
		}
		if (currentSong.track !== data.segment.title_html) {
			currentSong.artist = data.segment.artist_html;
			currentSong.track = data.segment.title_html;
			currentSong.album = data.segment.album_html;
			console.log(currentSong);
		}
	} catch (err) {
		console.error(err);
	}
}

getData();
setInterval(getData, 15000);
