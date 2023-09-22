# Bilibili Suggestions OpenSearch
------

A simple nodejs server and Cloudflare Worker script to convert bilibili search suggestions to opensearch format.

(I made this for Listary network searching.)

## Usage

### Deploy

Server Version:

1. Clone this repo
2. Run `npm install`
3. Run `npm start`

Worker Version:

Simply copy&paste contents in worker.js to your worker.

You can use Cloudflare Worker or Vorker to deploy this script.

### Query

HTTP GET:

```
http(s)://<your-domain-and-path-here>/?query=<your-query-here>
```

## License

No license. Do whatever you want.