import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description: string;
  due_date: Date;
  user_id: mongoose.Types.ObjectId;
  is_completed: Boolean;
  is_deleted: Boolean;
  deleted_by: mongoose.Types.ObjectId;
  deleted_at: Date
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  due_date: { type: Date, required: true },
  user_id: { type: mongoose.Types.ObjectId, required: true },
  is_completed: { type: Boolean, default: false },
  is_deleted : { type: Boolean, default: false },
  deleted_by : { type: mongoose.Types.ObjectId, default: null },
  deleted_at : { type: Date, default: false },
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
