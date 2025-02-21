import { Global, Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { models } from 'src/schemas/models';

@Global()
@Module({
  providers: [TenantService, ...models],
  exports: [TenantService, ...models],
})
export class TenantModule {}
