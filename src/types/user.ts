export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

export interface Me {
  id: string;
  username: string;
  email?: string;
  displayId: string;
  role: Role;
  createdAt: string;
} 