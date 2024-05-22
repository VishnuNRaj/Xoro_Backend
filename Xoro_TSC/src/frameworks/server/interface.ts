import { Application } from "express";
import { Server } from "http";

export interface createServerResponse {
    app:Application;
    httpServer:Server;
} 
export interface webSocketEvent {
    type:string;
    data:Buffer;
}