// ==============================================================================
// AUDIT REPOSITORY — AADHYA ENTERPRISES
// ==============================================================================

import { db } from '@/lib/db';
import { AuditLog } from '@/types';

export class AuditRepository {
  public static async log(
    action: string,
    entityType: string,
    entityId?: string | null,
    userId?: string | null,
    userEmail?: string | null,
    oldValue?: any,
    newValue?: any,
    ipAddress?: string | null,
    userAgent?: string | null
  ): Promise<AuditLog> {
    const id = `audit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const log: AuditLog = {
      id,
      userId,
      userEmail,
      action,
      entityType,
      entityId,
      oldValue,
      newValue,
      ipAddress,
      userAgent,
      createdAt: new Date().toISOString(),
    };
    db.auditLogs.set(id, log);
    return { ...log };
  }

  public static async listAll(): Promise<AuditLog[]> {
    return Array.from(db.auditLogs.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public log(action: string, entityType: string, entityId?: string | null, userId?: string | null, userEmail?: string | null, oldValue?: any, newValue?: any, ipAddress?: string | null, userAgent?: string | null) {
    return AuditRepository.log(action, entityType, entityId, userId, userEmail, oldValue, newValue, ipAddress, userAgent);
  }
  public listAll() { return AuditRepository.listAll(); }
}

export const auditRepository = new AuditRepository();

