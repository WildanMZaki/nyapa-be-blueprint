import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { Contact, ContactSchema } from 'src/schemas/contact.schema';
import { TenantService } from 'src/tenant/tenant.service';

export const ContactModelProvider: Provider = {
  provide: 'CONTACT_MODEL',
  useFactory: (tenantService: TenantService) => {
    const connection: Connection = tenantService.getConnection();
    return connection.model<Contact>('Contact', ContactSchema);
  },
  inject: [TenantService],
};

export const models: Array<Provider> = [ContactModelProvider];
