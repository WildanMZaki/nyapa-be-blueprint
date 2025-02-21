import { Connection } from 'mongoose';

declare module 'express' {
  export interface Request {
    tenantConnection?: Connection;
  }
}
