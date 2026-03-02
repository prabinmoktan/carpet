import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import ms from "ms";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "moderator" | "user";
  refreshToken?: string;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 500,
    },
    role: {
      type: String,
      enum: ["admin", "moderator", "user"],
      default: "user",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function (): string {
  const secret: Secret = process.env.ACCESS_TOKEN_SECRET!;
  const expiresIn =
    (process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue) ?? "15m";
  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }

  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      email: this.email,
      role: this.role,
    },
    secret,
    { expiresIn }
  );
};

UserSchema.methods.generateRefreshToken = function (): string {
  const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET as string;
  if (!refreshTokenSecret)
    throw new Error("Refresh token secret key is not defined");
  const expiresIn =
    (process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue) || "10d";
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      email: this.email,
      role: this.role,
    },
    refreshTokenSecret,
    { expiresIn }
  );
};

const User = models.User || model<IUser>("User", UserSchema);
export default User;
