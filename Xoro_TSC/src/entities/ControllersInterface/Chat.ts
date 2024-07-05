import Middleware from "../Configinterface/Controllers"
interface ChatController {
    getChats: Middleware;
    getChat: Middleware;
    StartChat:Middleware;
    SendMessage:Middleware;
}

export default ChatController;