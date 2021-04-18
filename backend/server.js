"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var WebSocket = require("ws");
var app = express();
var server = http.createServer(app);
var wsServer = new WebSocket.Server({ server: server });
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
var currentScrap = 0;
var sendScrapAvailableMessagePeriodically = function (ws) {
    setTimeout(function () {
        var request = { method: 'POST', event: 'scrap-metal-available', amount: getRandomInt(10, 50) };
        ws.send(JSON.stringify(request));
        sendScrapAvailableMessagePeriodically(ws);
    }, getRandomInt(10000, 60000));
};
var onIncomingMessage = function (message, ws) {
    var _a;
    try {
        var requestObj = JSON.parse(message);
        switch (requestObj.event) {
            case 'scrap-metal-collected':
                currentScrap += (_a = requestObj.amount) !== null && _a !== void 0 ? _a : 0;
                var response = { method: 'POST', event: 'scrap-metal-update', amount: currentScrap };
                ws.send(JSON.stringify(response));
                break;
        }
    }
    catch (e) {
        console.error(e);
    }
};
wsServer.on('connection', function (ws) {
    sendScrapAvailableMessagePeriodically(ws);
    ws.on('message', function (message) { return onIncomingMessage(message, ws); });
});
server.listen(8999);
