import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Request } from 'express';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(@Body() body: any, @Req() req: Request) {
    return this.contactService.createContact(body);
  }

  @Get()
  async getContacts(@Req() req: Request) {
    return this.contactService.getContacts();
  }
}
