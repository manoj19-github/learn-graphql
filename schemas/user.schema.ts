import { Model, Schema, model } from "mongoose";
import { IUserSchema } from "../interfaces/userSchema.interface";

type UserModel = Model<IUserSchema>;

const UserSchema = new Schema<IUserSchema,UserModel>({
    name:{required:true,type:String,trim:true},
    age:{required:true,min:5,type:Number},
    username:{trim:true,required:true,type:String,unique:true},
    nationality:{trim:true,required:true,type:String}
})

const UserModel = model('User', UserSchema);
export default UserModel;