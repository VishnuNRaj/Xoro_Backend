import firebase, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../../Firebase/storage.json';
import { readFileSync } from 'fs';
import { config } from 'dotenv'

config()
const firebaseSetup: {
    credential: any;
    storageBucket: string;
} = {
    credential: firebase.credential.cert(serviceAccount as ServiceAccount),
    storageBucket: process.env.FIRESTORE_BUCKET || 'xorostreams.appspot.com',
}
firebase.initializeApp(firebaseSetup);
export async function uploadFileToFirebase(file: Express.Multer.File, path: string): Promise<string> {
    const bucket = firebase.storage().bucket();
    try {
        const MAX_EXPIRY_DATE: Date = new Date('9999-12-31T23:59:59Z');
        const buffer: Buffer = readFileSync(file.path)
        await bucket.file(path).save(buffer, {
            metadata: {
                contentType: file.mimetype,
            },
            gzip: true,
        });

        const data = bucket.file(path);
        const signedUrl = await data.getSignedUrl({
            action: 'read',
            expires: MAX_EXPIRY_DATE,
        });

        console.log('File uploaded successfully');
        return signedUrl[0];
    } catch (error) {
        console.error('Error uploading file to Firebase Storage:', error);
        throw error;
    }
}

export default firebase