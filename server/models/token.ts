import mongoose, { Schema, Document, Model } from 'mongoose';

interface IEmailToken extends Document {
  userId: mongoose.Schema.Types.ObjectId | string;
  token: string;
  createdAt: Date;
}

const emailTokenSchema: Schema<IEmailToken> = new Schema({
  userId: {
    type: Schema.Types.Mixed, // Allow both ObjectId and string
    required: true,
    ref: "user",
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});


const emailTokenModel: Model<IEmailToken> = mongoose.model<IEmailToken>("emailToken", emailTokenSchema);

export default emailTokenModel;
