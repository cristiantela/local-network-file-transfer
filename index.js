var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
	console.log('a user connected');

	socket.on('data', (result) => {
		socket.broadcast.emit('data', result)
	})

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
})