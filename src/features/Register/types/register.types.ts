export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
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
