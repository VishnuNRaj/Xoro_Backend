import Live from "../models/Live"

export const getLive = async (Key: string, isLive: boolean) => {
    try {
        const [live]: any = await Live.aggregate([
            {
                $match: {
                    Key: Key, Live: isLive
                }
            }, {
                $lookup: {
                    from: 'reactions',
                    localField: 'Reactions',
                    foreignField: '_id',
                    as: 'reactions'
                }
            },
            {
                $lookup: {
                    from: 'channels',
                    localField: 'UserId',
                    foreignField: '_id',
                    as: 'channel'
                }
            }
        ])
        if (!live) return {
            message: "No Live Stream Found",
            status: 201,
        };
        return {
            message: "Streaming Now",
            status: 200,
            live
        }

    } catch (e) {
        return null
    }
}
