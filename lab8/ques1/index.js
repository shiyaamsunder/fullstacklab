// Create a server in node js
const http = require('node:http')

const server = http.createServer()

server.on('request', (req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
  if (req.url == '/') {
    res.write(
      `Hello there 👋 <br> <script>console.log('${JSON.stringify(
        req.headers
      )}')</script>`,
      'utf-8'
    )
  }
  if (req.url == '/getrequest') {
    res.write(`<p>Check the console for the request object</p>
    <script>
    console.log('Request Method: ${req.method}')
    console.log('Request Headers:  Host - ${req.headers.host}')
    console.log('Request Headers:  User Agent - ${req.headers['user-agent']}')
      </script>
        `)
  }
  console.log('Request Method: ', req.method)
  console.log('Request Headers:  Host - ', req.headers.host)
  console.log('Request Headers:  User Agent - ', req.headers['user-agent'])
  res.end()
})

server.listen(8080, (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('Server started successfully at http://localhost:8080 🚀')
})
