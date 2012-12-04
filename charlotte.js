//var http = require('http');
var express = require('express');
var http = require('http');
var io = require('socket.io');
var path = require('path');
var url = require('url');
var jsdom = require('jsdom');
var _ = require('underscore');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 8080);
	app.use(require('less-middleware')({ src: __dirname + '/public' }));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log("Listening on port " + app.get('port'));
});

io = io.listen(server);

io.sockets.on('connection', function(socket) {

	var graph = {};

	function crawl(target, depth, socket) {
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
							socket.emit('link', {
								'source': target,
								'target': link
							});
							crawl(link, depth - 1, socket);
						}
					});
			}
		}))
		.on('error', function(e) {
			console.log('Problem with request: ' + e.message);
		})
		.end();
	}

	socket.on('crawl', function(data) {
		crawl(data.url, data.depth, socket);
	});
});