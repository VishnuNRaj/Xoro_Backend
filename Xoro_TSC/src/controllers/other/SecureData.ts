import Jwt from 'jsonwebtoken';
import auth from '../../config/auth'

export const createPayloadSecure = async (data: any) => {
    return Jwt.sign(data, auth.JWT_SECRET)
}

export const verifyPayloadSecure = async (data: any) => {
    Jwt.verify(data, auth.JWT_SECRET, (err:any, data:any) => {
        console.log(err)
        return data ? data : null
    })
}