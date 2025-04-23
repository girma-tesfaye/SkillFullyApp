export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRole[];
  orgId: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
} 