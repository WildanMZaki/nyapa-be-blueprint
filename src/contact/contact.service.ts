import { Injectable, Inject } from '@nestjs/common';
import { ContactModel } from '../schemas/contact.schema';
import { NotFoundError } from 'src/utils/errors';

@Injectable()
export class ContactService {
  constructor(
    @Inject('CONTACT_MODEL') private readonly contactModel: ContactModel,
  ) {}

  async createContact(data: any) {
    return await new this.contactModel(data).save();
  }

  async getContacts() {
    return await this.contactModel.find();
  }

  async getContactById(id: string) {
    const contact = await this.contactModel.findById(id);
    if (!contact) {
      throw new NotFoundError(`Contact with ID ${id} not found`);
    }
    return contact;
  }
}
