// ==============================================================================
// USER & ADDRESS REPOSITORY — AADHYA ENTERPRISES
// ==============================================================================

import { db } from '@/lib/db';
import { Address, SystemRole, User } from '@/types';

export class UserRepository {
  public static async findById(id: string): Promise<User | null> {
    const user = db.users.get(id);
    return user ? { ...user } : null;
  }

  public static async findByEmail(email: string): Promise<User | null> {
    const normalized = email.trim().toLowerCase();
    const users = Array.from(db.users.values());
    for (const user of users) {
      if (user.email.toLowerCase() === normalized) {
        return { ...user };
      }
    }
    return null;
  }

  public static async findByPhone(phone: string): Promise<User | null> {
    const cleanPhone = phone.trim();
    const users = Array.from(db.users.values());
    for (const user of users) {
      if (user.phone === cleanPhone) {
        return { ...user };
      }
    }
    return null;
  }

  public static async findByEmailOrPhone(query: string): Promise<User | null> {
    const clean = query.trim();
    return (await this.findByEmail(clean)) || (await this.findByPhone(clean));
  }

  public static async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const id = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const newUser: User = {
      ...userData,
      id,
      roles: userData.roles || [SystemRole.CUSTOMER],
      permissions: userData.permissions || [],
      createdAt: now,
      updatedAt: now,
    };
    db.users.set(id, newUser);

    for (const role of newUser.roles!) {
      db.userRoles.set(`ur_${id}_${role}`, { userId: id, roleId: `role_${role.toLowerCase()}`, role });
    }

    return { ...newUser };
  }

  public static async update(id: string, updates: Partial<User>): Promise<User | null> {
    const user = db.users.get(id);
    if (!user) return null;
    const updated: User = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    db.users.set(id, updated);
    return { ...updated };
  }

  public static async listAll(): Promise<User[]> {
    return Array.from(db.users.values()).map((u) => {
      const { passwordHash: _, ...safeUser } = u;
      return safeUser as User;
    });
  }

  // Address methods
  public static async getAddressesByUserId(userId: string): Promise<Address[]> {
    return Array.from(db.addresses.values()).filter((a) => a.userId === userId);
  }

  public static async addAddress(addressData: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>): Promise<Address> {
    const id = `addr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    if (addressData.isDefault) {
      const addrs = Array.from(db.addresses.entries());
      for (const [key, addr] of addrs) {
        if (addr.userId === addressData.userId && addr.isDefault) {
          db.addresses.set(key, { ...addr, isDefault: false });
        }
      }
    }

    const newAddress: Address = {
      ...addressData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    db.addresses.set(id, newAddress);
    return { ...newAddress };
  }

  public static async updateAddress(id: string, updates: Partial<Address>): Promise<Address | null> {
    const addr = db.addresses.get(id);
    if (!addr) return null;

    if (updates.isDefault) {
      const addrs = Array.from(db.addresses.entries());
      for (const [key, existing] of addrs) {
        if (existing.userId === addr.userId && existing.isDefault) {
          db.addresses.set(key, { ...existing, isDefault: false });
        }
      }
    }

    const updated: Address = {
      ...addr,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    db.addresses.set(id, updated);
    return { ...updated };
  }

  public static async deleteAddress(id: string): Promise<boolean> {
    return db.addresses.delete(id);
  }

  public findById(id: string) { return UserRepository.findById(id); }
  public findByEmail(email: string) { return UserRepository.findByEmail(email); }
  public findByPhone(phone: string) { return UserRepository.findByPhone(phone); }
  public listAll() { return UserRepository.listAll(); }
  public create(data: any) { return UserRepository.create(data); }
  public update(id: string, updates: any) { return UserRepository.update(id, updates); }
  public getAddressesByUserId(userId: string) { return UserRepository.getAddressesByUserId(userId); }
  public addAddress(data: any) { return UserRepository.addAddress(data); }
  public updateAddress(id: string, updates: any) { return UserRepository.updateAddress(id, updates); }
  public deleteAddress(id: string) { return UserRepository.deleteAddress(id); }
}

export const userRepository = new UserRepository();

