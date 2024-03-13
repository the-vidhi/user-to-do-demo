import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
    first_name: string,
    last_name: string,
    username: string;
    password: string;
    verifyPassword: (password: string) => Promise<boolean>;
    generateAuthToken: () => string;
}

const UserSchema: Schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

// Method to verify the password
UserSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// Method to generate JWT token
UserSchema.methods.generateAuthToken = function (): string {
    return jwt.sign({ _id: this._id, username: this.username }, process.env.JWT_SECRET || 'your_default_secret', {
        expiresIn: '1h', // Token expires in 1 hour
    });
};

export default mongoose.model<IUser>('User', UserSchema);
