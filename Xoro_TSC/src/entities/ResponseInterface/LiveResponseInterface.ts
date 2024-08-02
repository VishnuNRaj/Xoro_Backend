import LiveInterface from "../ModelsInterface/Live";

export interface createLiveResponse {
    message:string;
    status:number;
    live:LiveInterface;
}

export interface startLiveResponse {
    message:string;
    status:number;
}