// const app=require('express')
// const http = require('http');
// const server = http.createServer(app); // Replace 'app' with your Express app
// const io = require('socket.io')(server);

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Example: Listen for a 'clientMessage' event from the client
//   socket.on('clientMessage', (data) => {
//     console.log('Received client message:', data);
//   });

//   // Example: Send a 'message' event to the client
//   socket.emit('message', 'Hello from the server!');
// });

// server.listen(3001, () => {
//   console.log('Server listening on port 3001');
// });


const {Server} =require('socket.io')
const io=new Server(3000,{cors:true})

io.on('connection',socket=>{
console.log('Socket Connected : ',socket.id)









socket.on('message',({message,receivable})=>
socket.broadcast.emit('message',{message:message,receivable:!receivable}))
})