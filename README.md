# Charlotte

This is a very simple web crawler (spider) written in JavaScript. It runs on [Node.js](http://nodejs.org/) and sends results to a web browser client in realtime using [socket.io](http://socket.io). Results are rendered in the browser as an ordered list of pages' URLs and the URLs to which the links on each page point.

## Usage

Download `git clone https://github.com/btmills/charlotte.git`.

Install dependencies `npm install`.

Run the server `node charlotte.js`.

Open [localhost port 8080](http://localhost:8080) to view. Enter a URL and start the crawling process. Output will appear shortly.

## Todo

1. Visualization
1. Better visualization
1. Cool stats
1. Use a real graph instead of Object
	- Find or make a real graph
1. Optimize

## License

(The MIT License)

Copyright (c) 2012 Brandon Mills

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.