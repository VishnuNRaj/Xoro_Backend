import Admin, { AdminWallet } from '../../../entities/ModelsInterface/Admin';
import { Schema, Types, model } from 'mongoose';

const AdminAuthSchema = new Schema<Admin>({
    Name: String,
    Email: String,
    Password: String,
    VerificationLink: String,
    Phone: String,
    LinkTimeout: Date,
    User: Boolean,
    Profile: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/7153/7153150.png'
    },
})

const WalletAdminSchema = new Schema<AdminWallet>({
    balance: {
        type: Number,
        default: 0,
    },
    transactions: {
        type: [Types.ObjectId],
        default: [],
    }
})
export const WalletAdmin = model<AdminWallet>('walletadmins', WalletAdminSchema)

const AdminAuth = model<Admin>('admins', AdminAuthSchema)
export default AdminAuth