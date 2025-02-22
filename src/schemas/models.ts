import { Provider } from '@nestjs/common';
import { Connection, Model, Schema } from 'mongoose';
import { Contact, ContactSchema } from 'src/schemas/contact.schema';
import { TenantService } from 'src/tenant/tenant.service';

export type ModelProvider<Document> = Provider & {
  provide: string;
  useFactory: (tenantService: TenantService) => Model<Document>;
  inject: [typeof TenantService];
};

export function createModelProvider<T>(
  name: string,
  schema: Schema<T>,
): ModelProvider<T> {
  return {
    provide: name,
    useFactory: (tenantService: TenantService): Model<T> => {
      const connection: Connection = tenantService.getConnection();
      return connection.model<T>(name, schema);
    },
    inject: [TenantService],
  };
}

export const ContactModelProvider = createModelProvider<Contact>(
  Contact.name,
  ContactSchema,
);

export const models: Array<ModelProvider<any>> = [ContactModelProvider];
