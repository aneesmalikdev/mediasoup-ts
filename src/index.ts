import express, { Request, Response } from 'express'
import http from 'http'
import ws from 'ws'
import { WebSocketConnection } from './lib/ws'
import os from 'os'

const app = express()
const server = http.createServer(app)

const wss = new ws.Server({ server, path: '/ws' })
WebSocketConnection(wss)

const port = process.env.PORT || 8000
app.get('/', (req, res) => {
  res.json(os.cpus().length)
})
server.listen(port, () => console.log(`Server listening on port ${port}`))
