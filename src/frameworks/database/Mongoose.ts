import mongoose from "mongoose"

const mongooseConfig: Function = (config: any) => {
    const connect: Function = () => {
        mongoose.connect(config.MONGO).then(() => console.log('Mongoose Connected'))
    }
    return {
        connect: connect
    }
}

export default mongooseConfig;