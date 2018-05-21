const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socketio(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const data = {
  material: 0,
  health: 0,
}

io.on('connection', (socket) => {
  console.log('a user connected')
  io.emit('material', data.material)
  io.emit('health', data.health)

  socket.on('dig', () => {
    data.material += 1
    io.emit('material', data.material)
  })
  socket.on('heal', () => {
    data.material -= 1
    data.health += 1
    io.emit('material', data.material)
    io.emit('health', data.health)
  })
  socket.on('shoot', () => {
    data.health -= 1
    io.emit('health', data.health)
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
})

server.listen(3000, () => {
  console.log('listening on port: 3000')
})
