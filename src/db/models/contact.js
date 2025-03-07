import mongoose, { Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: ['Invalid phone number format'],
    },
    email: {
      type: String,
      required: false,
      lowercase: true,
      match: ['Invalid email format'],
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
