import { Schema, Document, model } from "mongoose";

// Define the User interface
export interface User extends Document {
    firstName: string;
    lastName: string;
    email:string;
    phone: number;
    dob: string;
    password: string;
    photo: string;
    preferences: Array<Schema.Types.ObjectId>;
    isVerified:boolean, // Array of ObjectIds referring to Preferences
}

// Create the User schema
const UserSchema = new Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email:{type:String,required:true},
    phone: { type: Number, required: true, unique: true },
    dob: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String, default: '' },
    preferences: [{ type: Schema.Types.ObjectId, ref: 'Preferences' }], 
    isVerified:{type:Boolean,default:false}
});


export default model<User>("Users", UserSchema);
