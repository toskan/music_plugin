const observer = new MutationObserver((mutationList) => {
	mutationList.forEach(({ target, oldValue }) => {
		if (target.src.includes('favorited') && oldValue.includes('empty')) {
			let parent = target.parentNode.parentNode.parentNode.parentNode;

			let artist =
				parent.querySelectorAll('.col_artist font')[0].innerText;

			let song = parent.querySelectorAll('.col_song_title font')[0]
				.innerText;

			let album = parent.querySelectorAll('.col_album_title font')[0]
				.innerText;

			console.log(
				`Favorited Song: artist: ${artist} title: ${song} album: ${album}`
			);
		}
	});
});

const dropTable = document.querySelector('#drop_table tbody');

observer.observe(dropTable, {
	attribute: true,
	attributeFilter: ['src'],
	subtree: true,
	attributeOldValue: true,
});
