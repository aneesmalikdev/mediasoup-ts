import WebSocket from 'ws'
import { config } from './config'
import { createWorker } from './worker'
export async function WebSocketConnection(websocket: WebSocket.Server) {
  try {
    let medissoupWorker = await createWorker()
  } catch (error) {
    //
    console.error(error)
    throw error
  }
  websocket.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: WebSocket.RawData) => {
      console.log(`Received message => ${message}`)
      ws.send(`You sent => ${message}`)
    })
  })
}
