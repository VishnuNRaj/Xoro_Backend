import * as request from "../RequestInterface/ChatInterface";
import * as Responses from "../ResponseInterface/ChatResponseInterface";

interface ChatUsecases {
    getChats: (data: request.getChats) => Promise<Responses.getChats>;
    SendMessage: (data: request.SendMessage) => Promise<Responses.SendMessage>;
    StartChat: (data: request.StartChat) => Promise<Responses.StartChat>;
    getChat: (data: request.getChat) => Promise<Responses.getChat>;
}

export default ChatUsecases;
