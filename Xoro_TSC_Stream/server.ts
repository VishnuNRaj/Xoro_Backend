import { WebSocket } from "ws";
import { createServer } from 'http'
import express, { Application } from "express";

const app:Application = express();
const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    
    ws.on('message', (message) => {
        console.log(message);
    })
    ws.on('close', () => {
        console.log('close');
    });

    
    console.log('WebSocket Setup')

})

server.listen(6701,()=>{
    console.log('Stream Running')
})


export default wss




 