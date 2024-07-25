import { RequestHandler } from "express";
import path from "path";

const StreamFile: RequestHandler = (req, res) => {
    try {
        const { videoId, channelId } = req.params
        const videoPath = path.join(__dirname, "../../../../Public", "/videos", `${channelId}`, `${videoId}.mp4`)
    } catch (e) {

    }
}

export default StreamFile