const getToken = () => {
	let urlString = window.location.href;
	var url = new URL(urlString);
	let token = url.searchParams.get('token');
	chrome.storage.sync.set({ token });
};

getToken();
