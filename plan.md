
## Firecrawl YouTube integration update

Use the configured Firecrawl YouTube provider to crawl a public performance-marketing video and its top-level comments. Surface the fetched source in the YouTube Agent as a read-only Firecrawl source card with page metadata, crawl freshness, returned comment count, and an import action. Normalize imported comments into the existing rule-based reply filter and human approval queue. Keep this frontend-safe as a connector snapshot; live recurring crawls require a server-side bridge or scheduled connector job.
