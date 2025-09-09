export interface RegisterCredentials {
  document: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
  documentTypeId: number;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
  id: string | number;
  name: string;
  email: string;
  document?: string;
  lastName?: string;
  roleId?: number;
  documentTypeId?: number;
  };
}

export interface PasswordStrength {
  score: number;
  text: string;
  color: string;
}

export interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export interface DocumentType {
  id: number;
  name: string;
  description: string;
}

export interface CreateDocumentTypeResponse {
  success: boolean;
  message: string;
  documentType?: DocumentType;
}

export interface RoleUser {
  id: number;
  name: string;
  description: string;
}

export interface CreateRoleResponse {
  success: boolean;
  message: string;
  role?: RoleUser;
}
