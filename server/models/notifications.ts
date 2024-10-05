import mongoose, { Schema, Document, Model } from "mongoose";

interface Inotifications extends Document {
  name: string;
  userId: string;
  JobTitle: string;
  JobCompany: string;
}

const notificationSchema: Schema<Inotifications> = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true },
    JobTitle: { type: String, required: true },
    JobCompany: { type: String, required: true },
  },
  { timestamps: true }
);

const notificationModel: Model<Inotifications> = mongoose.model<Inotifications>("Notifications", notificationSchema);

export default notificationModel;
