var http=require('http')
var fs=require('fs')
var url=require('url')
var util=require('util')
http.createServer(function (request,response) {
	var post=''
	var pathname=url.parse(request.url).pathname
	request.on('data',function (chunk) {
		post+=chunk
		console.log(post)
	})
	// request.on('end',function () {
	// 	post=querystring.parse(post)
	// 	response.end(util.inspect(post))
	// })
	fs .readFile(pathname.substr(1),function (err,data) {
		if (err) {
			console.log(err)
			response.writeHead(	404 , {'content-Type':'text/html'})
		}
		else {
			response.writeHead(200,{'content-Type':'text/html'})
			response.write(data)
		}
		response.end()
	})
}).listen(4000)