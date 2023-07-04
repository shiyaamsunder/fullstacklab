// Create a server in node js

const http = require('node:http')

const server = http.createServer()

server.on('request', (req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
  res.write('Hello there 👋 <br>', 'utf-8')
  res.end('Bye')

  console.log('Request Object: \n', req)
})

server.listen(8080, (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('Server started successfully 🚀')
})
