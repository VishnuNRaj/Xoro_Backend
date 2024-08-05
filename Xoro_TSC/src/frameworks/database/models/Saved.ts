import { Types, model, Schema } from "mongoose";
import SavedPost from "../../../entities/ModelsInterface/Saved";

const savedSchema = new Schema<SavedPost>({
    PostId:{
        type:[Types.ObjectId],
        default:[]
    },
    UserId:Types.ObjectId
})

const Saved = model<SavedPost>("savedposts",savedSchema);
export default Saved;