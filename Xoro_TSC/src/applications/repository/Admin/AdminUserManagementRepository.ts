import * as AdminEntity from '../../../entities/RequestInterface/AdminInterface';
import * as DatabaseFunctions from '../../functions/DatabaseFunctions'
import * as ResponseFunctions from '../../responses/AdminResponse';
import * as Responses from '../../../entities/ResponseInterface/AdminResponseInterface';
import * as CommonFunctions from '../../functions/CommonFunctions';
import UserDocument from '../../../entities/ModelsInterface/User';
import User from '../../../frameworks/database/models/User';
import UnverifiedUsers from '../../../entities/ModelsInterface/UnverifiedUsers';
import AdminAuth from '../../../frameworks/database/models/Admin';
import UserAuth from '../../../frameworks/database/models/UnverifiedUsers';

export const UserDataRepository: Function = async (): Promise<Responses.getUsersResponse> => {
    try {
        const users: UserDocument[] = await DatabaseFunctions.findData(UserAuth, {})
        return ResponseFunctions.AdminUserDataRes(<Responses.getUsersResponse>{
            message: 'All Available Users',
            status: 200,
            users: users
        })
    } catch (e) {
        return ResponseFunctions.AdminUserDataRes(<Responses.getUsersResponse>{
            message: 'Internal Server Error',
            status: 500,
            users: null
        })
    }
}

export const UserManagementRepository: Function = async ({ UserId, Suspended, SuspendedTill, Terminate, Admin }: AdminEntity.AdminUserManagement) => {
    try {
        const user: UnverifiedUsers = await DatabaseFunctions.findUsingId(UserAuth, UserId)
        console.log('______________________________________')
        console.log(user)
        if (!user) {
            return ResponseFunctions.AdminUserManagementRes(<Responses.UsermanageResponse>{
                message: 'Invalid Link',
                status: 203
            })
        }
        user.Suspended = Suspended;
        if (Suspended && SuspendedTill) {
            const date = new Date()
            date.setDate(date.getDate() + parseInt(SuspendedTill.toString()))
            user.SuspendedTill = date
        } else {
            user.SuspendedTill = undefined
        }
        user.Terminated = Terminate;
        if (!Admin) {
            await DatabaseFunctions.deleteUsingId(AdminAuth, user._id)
        } else if (Admin && !user.Suspended && !user.Terminated && !Suspended && !Terminate) {
            await DatabaseFunctions.insertData(AdminAuth, { ...user, User: true });
        } else {
            return ResponseFunctions.AdminUserManagementRes(<Responses.UsermanageResponse>{
                message: 'Account Suspended or Terminated',
                status: 203
            })
        }
        await user.save();
        await DatabaseFunctions.updateById(User, UserId, { Suspended: user.Suspended, SuspendedTill: user.SuspendedTill, Terminated: user.Terminated });
        return ResponseFunctions.AdminUserManagementRes(<Responses.UsermanageResponse>{
            message: 'Account Actions Successfull',
            status: 200
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.AdminUserManagementRes(<Responses.UsermanageResponse>{
            message: 'Internal Server Error',
            status: 500
        })
    }
}