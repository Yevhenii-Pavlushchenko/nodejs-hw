import { model, Schema } from 'mongoose';

const avatarSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    publicId: {
      type: String,
    },

    isPrimary: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

export const Avatar = model('Avatar', avatarSchema);
