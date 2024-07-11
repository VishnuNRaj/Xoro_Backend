import { CorsOptions } from "cors";
import { config } from "dotenv";
config()
const origin: string[] = []
for (let i = 1; i <= 5; i++) {
    const data = process.env["API_" + i]
    if (!data) break;
    if (data) origin.push(data)
}
 
const CorsConfig = <CorsOptions>{
    preflightContinue: true,
    origin: origin,
    credentials: true
}

export default CorsConfig