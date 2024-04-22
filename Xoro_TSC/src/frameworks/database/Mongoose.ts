import mongoose, { Mongoose } from "mongoose"

const mongooseConfig: Function = (config: any) => {
    mongoose.connect(config.MONGO).then(() => { console.log('Mongoose Connected') })
}


export default mongooseConfig;