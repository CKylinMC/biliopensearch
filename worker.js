addEventListener("fetch", (event) => {
	event.respondWith(handler(event));
});

async function handler(event) {
	try {
		const url = new URL(event.request.url);
		const query = url.searchParams.get('query')?.trim();
		if(!query){
			return new Response("[]", {status: 400});
		}
		const response = await fetch("https://s.search.bilibili.com/main/suggest?term="+encodeURIComponent(query)).then(r=>r.json());
		let keys = [], urls = [];
		for (const result of Object.values(response)) {
			keys.push(result.value);
			urls.push(`https://search.bilibili.com/all?keyword=${encodeURIComponent(result.term)}`);
		}
		const result = [
			query,
			keys,
			[],
			urls
		];
		return new Response (JSON.stringify(result));
	} catch(e) {
		return new Response("Server fault", { status: 500 })
	}
}