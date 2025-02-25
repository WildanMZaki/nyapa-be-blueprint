import { Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Connection, createConnection } from 'mongoose';
import { BadRequestError } from '../utils/errors';

@Injectable({ scope: Scope.REQUEST })
export class TenantMiddleware implements NestMiddleware {
  private static connections: Map<string, Connection> = new Map();

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantDbUrl = req.headers['x-tenant-db'] as string;
    if (!tenantDbUrl) {
      throw new BadRequestError('Tenant Database URL is required');
    }

    if (!TenantMiddleware.connections.has(tenantDbUrl)) {
      const connection = await createConnection(tenantDbUrl).asPromise();
      TenantMiddleware.connections.set(tenantDbUrl, connection);
    }

    req.tenantConnection = TenantMiddleware.connections.get(tenantDbUrl);
    next();
  }
}
