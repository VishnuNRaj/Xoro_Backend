import { hash, compare } from 'bcryptjs'
function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export function generateRandomName(prefix: string, randomStringLength: number): string {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    const randomString = generateRandomString(randomStringLength);
    return `${prefix}${randomNumber}${randomString}`;
}

export function generateVerificationLink(): string {
    const VerificationToken = generateRandomString(32);
    return VerificationToken
}


export const HashPassword: Function = async (Password: string) => {
    return await hash(Password, 10)
}


export const CalculateTime: Function = (time:number): Date => {
    const currentDate = new Date();
    return new Date(currentDate.getTime() + (time * 60000));
}


export const ComparePassword: Function = async (Password: string, Hashed: string) => {
    return await compare(Password, Hashed)
}


export const OTPgenerate: Function = (): string => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}