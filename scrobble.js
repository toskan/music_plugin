export default class Scrape {
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
					console.log(this);
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
					this.method = 'track.scrobble';
					this.artist = this.getValueByClass(node, 'col_artist');
					this.track = this.getValueByClass(node, 'col_song_title');
					this.album = this.getValueByClass(node, 'col_album_title');
					console.log(this);
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
