import server from './server'

const serverPort = process.env.PORT || 3333
server.listen(serverPort, () => console.log(`Listing on port ${serverPort}`))
