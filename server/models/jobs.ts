import mongoose, { Schema, Document, Model } from "mongoose";

interface Ijobs extends Document {
  JobTitle: string;
  JobImage: string;
  JobCompany: string;
  CREJ: string;
}

const jobSchema: Schema<Ijobs> = new Schema(
  {
    JobTitle: { type: String, required: true },
    JobImage: { type: String },
    JobCompany: { type: String, required: true },
    CREJ: { type: String, required: true },
  },
  { timestamps: true }
);

const jobModel: Model<Ijobs> = mongoose.model<Ijobs>("User", jobSchema);

export default jobModel;
