import cron from 'node-cron';
import RewardsModel from '../models/Rewards';


cron.schedule('0 0 * * *', async () => {
    try {
        await RewardsModel.updateMany({}, { $set: { Completed: { Date: new Date(), UserId: [] } } });
        console.log('Users array emptied successfully');
    } catch (error) {
        console.error('Error emptying Users array:', error);
    }
});

