import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  _id: string; // Custom ID from Firebase
  Email: string;
  userName: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  mobileNumber: number;
  additionalAddress?: string;
  zipCode?: string;
  Country: string;
  State: string;
  Password: string;
  Verified: boolean;
  ProfilePicture?: object;
  Language?: string;
  Bio?: string;
  LinkedIn?: string;
  Facebook?: string;
  Twitter?: string;

  // Freelancer Info (optional)
  Skills?: object;
  Overview?: string;
  Profession?: string;
  rating?: number;
  Portfolio?: string;

  // Client Info (optional)
  companyLogo?: string;
  companyName?: string;
  companyPosition?: string;
  companySize?: string;
  companyAddress?: string;
  companyDescription?: string;
  companyLinkedIn?: string;
  companyFacebook?: string;
  companyTwitter?: string;
  companyWebsite?: string;
  companyPhone?: number;
}

const userSchema: Schema<IUser> = new Schema(
  {
    _id: { type: String, unique: true, required: true }, // Custom ID field
    Email: { type: String, unique: true, required: true },
    userName: { type: String, required: true },
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    mobileNumber: { type: Number },
    additionalAddress: { type: String },
    zipCode: { type: String },
    Country: { type: String },
    State: { type: String },
    Password: { type: String },
    Verified: { type: Boolean, required: true, default: false },
    ProfilePicture: { type: Object , default: null},
    Language: { type: String },
    Bio: { type: String },
    LinkedIn: { type: String },
    Facebook: { type: String },
    Twitter: { type: String },
    Skills: { type: Object },
    Overview: { type: String },
    Profession: { type: String },
    rating: { type: Number },
    Portfolio: { type: String },
    companyLogo: { type: String },
    companyName: { type: String },
    companyPosition: { type: String },
    companySize: { type: String },
    companyAddress: { type: String },
    companyDescription: { type: String },
    companyLinkedIn: { type: String },
    companyFacebook: { type: String },
    companyTwitter: { type: String },
    companyWebsite: { type: String },
    companyPhone: { type: Number },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default UserModel;
