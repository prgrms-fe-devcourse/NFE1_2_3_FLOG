import { WebSocket } from 'ws';
import { Server } from 'http';

const setupWebSocket = (server: Server) => {
  const wss = new WebSocket.Server({ server, path: '/api/notifications' });

  wss.on('connection', (ws) => {
    console.log('WebSocket 클라이언트 연결')

    ws.on('message', (message) => {
      console.log('received: %s', message);
    })

    ws.on('close', () => {
      console.log('WebSocket 클라이언트 연결 종료')
    })
  })

  return wss
}

export default setupWebSocket;