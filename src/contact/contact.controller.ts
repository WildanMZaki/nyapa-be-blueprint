import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(@Body() body: any) {
    return this.contactService.createContact(body);
  }

  @Get()
  async getContacts() {
    return this.contactService.getContacts();
  }

  @Get(':id')
  async getContact(@Param('id') id: string) {
    return await this.contactService.getContactById(id);
  }
}
