import { Injectable, Inject, Scope } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { Contact, ContactSchema } from '../schemas/contact.schema';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST }) // 👈 Make this service request-scoped
export class ContactService {
  private contactModel: Model<Contact>;

  constructor(@Inject(REQUEST) private readonly req: Request) {
    const connection = req['tenantConnection'] as Connection;

    if (!connection) {
      throw new Error('Tenant connection not found in request');
    }
    this.contactModel = connection.model<Contact>('Contact', ContactSchema);
  }

  async createContact(data: any) {
    return await new this.contactModel(data).save();
  }

  async getContacts() {
    return await this.contactModel.find();
  }
}
