import mongoose, { Schema, Document, Model } from "mongoose";

interface Ijobs extends Document {
  JobTitle: string;
  JobImage: object;
  JobCompany: string;
  CREJ: string;
  posterId: string;
}

const jobSchema: Schema<Ijobs> = new Schema(
  {
    JobTitle: { type: String, required: true },
    JobImage: { type: Object },
    JobCompany: { type: String, required: true },
    CREJ: { type: String, required: true },
    posterId: { type: String, required: true },
  },
  { timestamps: true }
);

const jobModel: Model<Ijobs> = mongoose.model<Ijobs>("Jobs", jobSchema);

export default jobModel;
