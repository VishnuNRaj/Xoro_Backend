import joi, { Schema } from 'joi';
import * as interfaces from '../../entities/RequestInterface/VideoInterface';

export const uploadVideoValidate: Function = async (data: interfaces.uploadVideo): Promise<{
    errors: string;
    status: boolean;
}> => {
    try {
        const schema: Schema = joi.object({
            Caption: joi.string().required(),
            Video: joi.array().items(
                joi.object().required()
            ).required(),
            Thumbnail: joi.array().items(
                joi.object().required()
            ).required(),
            Duration: joi.string().required(),
            Settings: joi.object({
                CommentsOn: joi.boolean().required(),
                ReactionsOn: joi.boolean().required(),
                PremiumContent: joi.boolean().required(),
                ListedContent: joi.boolean().required()
            }).required(),
            Restriction: joi.number().required(),
            Hashtags: joi.array().items(joi.string()).required(),
            RelatedTags: joi.string().required(),
            Description:joi.string().required()
        });

        await schema.validateAsync(data);

        return {
            errors: '',
            status: true,
        };
    } catch (e: any) {
        return {
            errors: e.message,
            status: false,
        };
    }
};
