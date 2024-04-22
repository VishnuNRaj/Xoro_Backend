import * as dotenv from 'dotenv'
dotenv.config()
const config: Object = {
    PORT: process.env.PORT,
    MONGO:process.env.MONGO
}
export default config