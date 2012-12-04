var socket = io.connect('http://localhost:8080');

$('#btnCrawl').bind('click', function() {
	socket.emit('crawl', {
		url: $('#url').val(),
		depth: +($('#depth').val())
	});
	return false; // Prevent new page load on form submission
});

var graph = {};
var display = $('#display');

socket.on('link', function(data) {
	var source = data.source;
	var target = data.target;
	if(!graph.hasOwnProperty(source))
	{
		var li = $('<li><a name="' + source + '">' + source + '</a></li>');
		var ol = $('<ol></ol>');
		li.append(ol);

		graph[source] = {
			li: li,
			ol: ol,
			outbound: {}
		};
		display.append(graph[source].li);
	}
	if(!graph[source].outbound.hasOwnProperty(target))
	{
		var li = $('<li><a href="#' + target + '">' + target + '</a></li>')
		graph[source].outbound[target] = {
			li: li
		};
		graph[source].ol.append(li);
	}
	window.scrollTo(0,document.body.scrollHeight);
});

