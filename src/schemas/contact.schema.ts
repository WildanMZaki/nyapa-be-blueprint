import { Schema, Document } from 'mongoose';

export type ContactDocument = Contact & Document;

export interface Contact extends Document {
  name: string;
  phone: string;
  email: string;
}

export const ContactSchema = new Schema<Contact>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});
