import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Connection } from 'mongoose';

@Injectable({ scope: Scope.REQUEST })
export class TenantService {
  constructor(@Inject(REQUEST) private readonly req: Request) {}

  getConnection(): Connection {
    if (!this.req.tenantConnection) {
      throw new Error('Tenant connection not found');
    }
    return this.req.tenantConnection;
  }
}
