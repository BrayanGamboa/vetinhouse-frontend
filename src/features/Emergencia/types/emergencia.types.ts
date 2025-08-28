export interface EmergencyType {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  icon: string;
  actions: string[];
}

export interface WalkerData {
  name: string;
  rating: number;
  reviews: number;
  phone: string;
  image: string;
  isOnline: boolean;
}

export interface PetData {
  name: string;
  breed: string;
  image: string;
  heartRate: string;
  activity: string;
}

export interface ChatMessage {
  type: 'sent' | 'received';
  content: string;
  time: string;
}

export interface EmergencyAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
}