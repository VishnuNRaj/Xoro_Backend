"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideoValidate = void 0;
const joi_1 = __importDefault(require("joi"));
const uploadVideoValidate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({
            Caption: joi_1.default.string().required(),
            Video: joi_1.default.array().items(joi_1.default.object().required()).required(),
            Thumbnail: joi_1.default.array().items(joi_1.default.object().required()).required(),
            Duration: joi_1.default.string().required(),
            Settings: joi_1.default.object({
                CommentsOn: joi_1.default.boolean().required(),
                ReactionsOn: joi_1.default.boolean().required(),
                PremiumContent: joi_1.default.boolean().required(),
                ListedContent: joi_1.default.boolean().required()
            }).required(),
            Restriction: joi_1.default.number().required(),
            Hashtags: joi_1.default.array().items(joi_1.default.string()).required(),
            RelatedTags: joi_1.default.string().required(),
            Description: joi_1.default.string().required()
        });
        yield schema.validateAsync(data);
        return {
            errors: '',
            status: true,
        };
    }
    catch (e) {
        return {
            errors: e.message,
            status: false,
        };
    }
});
exports.uploadVideoValidate = uploadVideoValidate;
