const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  const server = http.createServer(app)
  const io = socketIO(server)

  io.on('connection', socket => {
    console.log('user connect')

    socket.on('chat', res => {
      io.emit('chat', {
        msg: res.msg
      })
    })

    socket.on('disconnect', () => {
      console.log('User was disconnected')
    })
  })

  server.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()
