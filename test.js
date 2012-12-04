var http = require('http');
var jsdom = require('jsdom');
var _ = require('underscore');
var url = require('url');

var graph = {};

function crawl(target, depth) {
	if(!depth > 0)
		return;

	if(graph.hasOwnProperty(target)) // Already been crawled
		return;

	else
		graph[target] = [];

	(http.request({
		host: url.parse(target, false, true).host,
		path: url.parse(target, false, true).pathname
	}, function(res) {
		if(/text\/html/.test(res.headers['content-type']))
		{
			console.dir(res.headers);
			jsdom.env(
				target,
				['http://code.jquery.com/jquery.js'],
				function (err, window) {
					if(err)
					{
						console.log("ERROR parsing " + target + ": " + err);
						return;
					}

					var links = {};
					_.each(window.$('a'), function(a) {
						var link = url.resolve(target, window.$(a).attr('href'));
						if(/^https?:\/\//.test(link) && !links.hasOwnProperty(link))
						{
							links[link] = true;
						}
					});
					for(var link in links)
					{
						graph[target].push(link);
						crawl(link, depth - 1);
					}
				});
		}
	}))
	.on('error', function(e) {
		console.log('Problem with request: ' + e.message);
	})
	.end();
}

crawl('http://www.cse.ohio-state.edu/~millsb/', 1);
//console.dir(graph);
setTimeout(function() { console.dir(graph); }, 5000);