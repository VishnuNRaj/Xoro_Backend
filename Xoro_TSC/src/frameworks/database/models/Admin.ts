import Admin from '../../../entities/Admin';
import { Schema, model } from 'mongoose';

const AdminAuthSchema = new Schema<Admin>({
    Name: String,
    Email: String,
    Password: String,
    VerificationLink: String,
    Phone: String,
    LinkTimeout: Date,
    User:Boolean,
    Profile: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/7153/7153150.png'
    },
})

const AdminAuth = model<Admin>('admins', AdminAuthSchema)
export default AdminAuth