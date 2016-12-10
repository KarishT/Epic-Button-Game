var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req,res){
  res.render("index");
});

var server = app.listen(8000, function(){
  console.log('listening on port 8000');
});

var io = require('socket.io').listen(server);
var count = 0;
io.sockets.on('connection', function(socket){
  socket.on("button_clicked", function(){
    count += 1;
    io.emit("times", {response: count});
  });

  socket.on("reset", function(){
    count = 0;
    io.emit('updatedcount', {response: count});
  });

})
