function getValueByClass(node, klass) {
	const child = Array.prototype.find.call(node.children, (child) => {
		return child.classList.contains(klass);
	});

	return child?.children?.[0]?.innerText;
}

class Scrape {
	constructor(artist, track, album) {
		this.dropTable = document.querySelector('#drop_table tbody');
		this.artist = artist;
		this.track = track;
		this.album = album;

		this.starObserver = new MutationObserver((mutationList) => {
			mutationList.forEach(({ target, oldValue }) => {
				if (
					target.src.includes('favorited') &&
					oldValue.includes('empty')
				) {
					let parent =
						target.parentNode.parentNode.parentNode.parentNode;

					this.artist =
						parent.querySelectorAll(
							'.col_artist font'
						)[0].innerText;

					this.track = parent.querySelectorAll(
						'.col_song_title font'
					)[0].innerText;

					this.album = parent.querySelectorAll(
						'.col_album_title font'
					)[0].innerText;

					console.log(
						`Favorited Song: artist: ${this.artist} title: ${this.track} album: ${this.album}`
					);
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

					this.artist = this.getValueByClass(node, 'col_artist');
					this.track = this.getValueByClass(node, 'col_song_title');
					this.album = this.getValueByClass(node, 'col_album_title');
					console.log('NEW!', this.artist, this.track, this.album);
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
