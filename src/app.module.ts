import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TenantModule } from './tenant/tenant.module';
import { TenantMiddleware } from './middlewares/tenant.middleware';

@Module({
  imports: [ContactModule, TenantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
