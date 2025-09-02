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
    id: string;
    email: string;
    name: string;
    lastName: string;
  };
}

export interface DocumentType {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
}