const axios = require('axios');

async function scrapeData() {
	const url = 'https://wfmu.org/currentliveshows.php?json=1';
	try {
		const { data } = await axios.get(url);
		return data;
	} catch (err) {
		console.error(err);
	}
}
