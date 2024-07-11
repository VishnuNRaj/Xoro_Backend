import {Queue} from "bullmq"
const ShortsQueue = new Queue("Shorts Upload")
export default ShortsQueue