import AdminDocument from "../ModelsInterface/Admin";
import UserDocument from "../ModelsInterface/User";
import { CategoryInterface } from "../ModelsInterface/Category"
import VoucherInterface from "../ModelsInterface/Vouchers";
export interface normals {
    message: string;
    status: number;
}
export interface AdminLoginResponse {
    message: string;
    errors: string[];
    status: number;
    admin?: AdminDocument;
}

export interface AdminOTPResponse {
    message: string;
    admin?: AdminDocument;
    status: number;
    token?: string;
}

export interface AdminOTPResendResponse {
    message: string;
    status: number;
}

export interface AdminVerifyAuthResponse {
    message: string;
    status: number;
    admin?: AdminDocument
}

export interface getUsersResponse {
    message: string;
    status: number;
    users: UserDocument[] | null;
}

export interface UsermanageResponse {
    status: number;
    message: string;
}

export interface addCategoryResponse extends normals {
    Category: CategoryInterface;
}

export interface deleteCategoryResponse extends normals {
    CategoryId: string;
}

export interface getCategoryResponse extends normals {
    Category: CategoryInterface[];
    total?: number;
}


export interface addVoucherResponse extends normals {
    Voucher: VoucherInterface;
}

export interface editVoucherResponse extends normals {
    Voucher: VoucherInterface;
}