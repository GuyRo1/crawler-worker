# Crawler worker

A micro service for the web crawler.
Consuming a queue containing urls.
For each url the worker will get all of the urls in the document and publish them.

Built with :

* node
* redis
* rabbitmq
* cheerio
* axios
