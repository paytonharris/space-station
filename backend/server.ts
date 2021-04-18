import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { Request } from '../frontend/src/globalTypes';

const app = express();

const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server });

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

let currentScrap = 0;

const sendScrapAvailableMessagePeriodically = (ws: WebSocket) => {
  setTimeout(() => {
    let request: Request = { method: 'POST', event: 'scrap-metal-available', amount: getRandomInt(10, 50) };
    ws.send(JSON.stringify(request));

    sendScrapAvailableMessagePeriodically(ws);
  }, getRandomInt(10000, 60000))
}

const onIncomingMessage = (message: string, ws: WebSocket) => {
  try {
    let requestObj = JSON.parse(message) as Request

    switch (requestObj.event) {
      case 'scrap-metal-collected':
        currentScrap += requestObj.amount ?? 0;

        let response: Request = { method: 'POST', event: 'scrap-metal-update', amount: currentScrap };
        ws.send(JSON.stringify(response));
        break;
    }
  } catch (e) {
    console.error(e);
  }
}

wsServer.on('connection', (ws: WebSocket) => {
  sendScrapAvailableMessagePeriodically(ws);

  ws.on('message', (message: string) => onIncomingMessage(message, ws));
});

server.listen(8999);