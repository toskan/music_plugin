const dropTable = document.querySelector('#drop_table tbody');

const starObserver = new MutationObserver((mutationList) => {
	mutationList.forEach(({ target, oldValue }) => {
		if (target.src.includes('favorited') && oldValue.includes('empty')) {
			let parent = target.parentNode.parentNode.parentNode.parentNode;

			let artist =
				parent.querySelectorAll('.col_artist font')[0].innerText;

			let track = parent.querySelectorAll('.col_song_title font')[0]
				.innerText;

			let album = parent.querySelectorAll('.col_album_title font')[0]
				.innerText;

			console.log(
				`Favorited Song: artist: ${artist} title: ${track} album: ${album}`
			);
		}
	});
});

starObserver.observe(dropTable, {
	attribute: true,
	attributeFilter: ['src'],
	subtree: true,
	attributeOldValue: true,
});

//Nathan's code to collect currently playing info
const observerLive = new MutationObserver((mutationList) => {
	mutationList.forEach(({ addedNodes }) => {
		addedNodes.forEach((node) => {
			if (!/^drop_/.test(node.id)) {
				return true;
			}

			const artist = getValueByClass(node, 'col_artist');
			const track = getValueByClass(node, 'col_song_title');
			const album = getValueByClass(node, 'col_album_title');
			console.log('NEW!', { artist, track, album });
		});
	});
});

observerLive.observe(dropTable, {
	childList: true,
});

function getValueByClass(node, klass) {
	const child = Array.prototype.find.call(node.children, (child) => {
		return child.classList.contains(klass);
	});

	return child?.children?.[0]?.innerText;
}
