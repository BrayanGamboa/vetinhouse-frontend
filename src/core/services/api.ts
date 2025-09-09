const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

export interface DocumentType {
  id: number;
  name: string;
  description: string;
}

export interface RoleUser {
  id: number;
  name: string;
  description: string;
}

export interface RegisterRequest {
  document: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  documentTypeId: number;
  roleId: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
      // Do not forward localhost cookies through the proxy by default
      credentials: options?.credentials ?? 'omit',
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status} ${response.statusText} at ${url}\n${text}`);
    }

    return response.json();
  }

  async getDocumentTypes(): Promise<DocumentType[]> {
    return this.request<DocumentType[]>('/document_type');
  }

  async getRoleUsers(): Promise<RoleUser[]> {
    return this.request<RoleUser[]>('/role_user');
  }

  async register(data: RegisterRequest): Promise<any> {
    return this.request('/user', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<any> {
    return this.request('/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createDocumentType(data: { id?: number; name: string; description: string }): Promise<any> {
    return this.request('/document_type', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();