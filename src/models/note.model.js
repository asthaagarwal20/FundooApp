import { Schema, model } from 'mongoose';
const userSchema = new Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    color: {
      type: String
    },
    isArchieve: {
      type: Boolean,
    },
    isDeleted: {
      type: Boolean,
    },
    userid: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
export default model('Note', userSchema);
