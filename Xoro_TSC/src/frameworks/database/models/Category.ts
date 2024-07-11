import { model, Schema, Types } from "mongoose";
import { CategoryInterface } from "../../../entities/ModelsInterface/Category";

const categorySchmea = new Schema<CategoryInterface>({
    Name: String,
    Listed: {
        type: Boolean,
        default: true
    },
    CreatedBy: Types.ObjectId,
    CreatedAt:Date,
})

const CategoryModel = model<CategoryInterface>("categorys", categorySchmea);
export default CategoryModel;