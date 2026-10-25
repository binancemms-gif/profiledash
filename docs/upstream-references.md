# Upstream implementation references

Reviewed on 25 October 2026 for ProfileDash.

## youtube/youtube-ios-player-helper

Source: https://github.com/youtube/youtube-ios-player-helper

This archived Apache 2.0 project is an Objective-C/Swift helper for embedding YouTube playback in an iOS `WebView`, with CocoaPods and Swift Package Manager installation. It is not applicable to the current React/Vite web dashboard and should not be vendored. The useful reference is the separation between a player adapter, a source video ID, explicit playback configuration, and callbacks. If ProfileDash later gets a native mobile shell, this repository is the starting reference for an embedded player component.

## youtube/cobalt_sandbox

Source: https://github.com/youtube/cobalt_sandbox

This BSD 3-Clause repository is a large Chromium/Cobalt CI sandbox, not an application SDK. Its reusable ideas are explicit workflow stages, scoped permissions, artifact upload, retry/filter steps, and separate platform-specific jobs. ProfileDash keeps its own lightweight CI instead of copying Cobalt's build system or vendoring this repository.

## youtube/geo-search-tool

The supplied `youtube/geo-search-too` URL does not resolve. The matching repository is https://github.com/youtube/geo-search-tool. It is an Apache 2.0 example web app using the YouTube Data API v3 and Google Maps to search geo-tagged videos with keyword, location/radius, channel, time-window, live, embeddable, and Creative Commons filters. Its location/time/channel filter model is a useful reference for ProfileDash's geography and campaign-source filters. Its historical client-side API key must not be copied.

## ScrapeCreators/social-media-research-skills

Source: https://github.com/ScrapeCreators/social-media-research-skills

This MIT-licensed skill pack is workflow-first and public-data-only. Its most relevant YouTube workflows are `comment-mining`, `transcript-intelligence`, `outlier-post-finder`, and `social-listening-brief`. The pack emphasizes preserving exact audience language, citing source URLs, separating sample size from confidence, using creator-specific baselines for outliers, and ending with actionable recommendations. ProfileDash integrates these as YouTube Agent research actions and routes the current Firecrawl comment snapshot through comment mining before the existing rule filter and approval gate.

## Integration decision

ProfileDash does not fork or vendor the large upstream runtimes. It keeps source links and license notes here, adopts the small reusable workflow patterns, and adds a local research-skill adapter in the YouTube Agent. The Firecrawl connector remains the current public-data source; credentials stay outside the browser. Live multi-page research and recurring jobs should be implemented behind a server-side connector or an authenticated automation bridge.
