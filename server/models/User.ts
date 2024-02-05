import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.verifyPassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
}

export interface UserDocument extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    fname: string;
    lname: string;
    username: string;
    email: string;
    password: string;
    verifyPassword(password: string): Promise<boolean>;
}

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;