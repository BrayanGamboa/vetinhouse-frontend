export interface RegisterCredentials {
  document: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role_id: number;
  document_type_id: number;
  info?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    document: string;
    name: string;
    lastName: string;
    email: string;
    role_id: number;
    document_type_id: number;
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

export interface Role {
  id: number;
  name: string;
  description: string;
}
