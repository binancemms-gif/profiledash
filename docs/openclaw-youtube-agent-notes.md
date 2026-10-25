
## Firecrawl YouTube source sync

ProfileDash now uses the configured Firecrawl connector to fetch a public YouTube video record and top-level comments through the `youtube-com` provider. The imported snapshot is the performance-marketing video [My Approach to Analysing Your Performance Marketing Campaigns](https://www.youtube.com/watch?v=ZZkndYLbmow), with 1,143 reported views and five comments returned from an eight-comment public count at crawl time. The YouTube Agent exposes the source URL, crawl status, and a read-only import action that adds the normalized comments to the existing rule-based filter and approval queue.

The current frontend keeps this as a connector snapshot rather than embedding Firecrawl credentials or pretending the browser can call MCP directly. Live recurring crawls should be moved behind a server-side Firecrawl bridge or scheduled connector job; imported comments remain non-public until they pass the configured rules and a human approves a reply.
