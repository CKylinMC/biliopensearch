const Koa = require('koa');
const cors = require('@koa/cors');
const axios = require('axios');

const app = new Koa();
app.use(cors());

// bilibili opensearch port
app.use(async ctx => {
    const query = ctx.URL.searchParams.get('query')?.trim();
    if (!query) {
        ctx.body = [];
        return;
    }
    console.log(`[>] Searched "${query}".`);
    let response = (await axios.get(`https://s.search.bilibili.com/main/suggest`, { params: { term: query } })).data;
    let keys = [], urls = [];
    for (const result of Object.values(response)) {
        keys.push(result.value);
        urls.push(`https://search.bilibili.com/all?keyword=${encodeURIComponent(result.term)}`);
    }
    console.log(`[<] Got ${keys.length} results for query "${query}".`);
    ctx.body = [
        query,
        keys,
        [],
        urls
    ]
});

console.log("Server running at :" + (process.env.PORT || 3000));
app.listen(process.env.PORT || 3000);