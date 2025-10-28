// Tipos para el Historial Clínico Veterinario

export interface Patient {
  id: string;
  name: string;
  species: 'Perro' | 'Gato' | 'Ave' | 'Roedor' | 'Reptil' | 'Otro';
  breed: string;
  gender: 'Macho' | 'Hembra';
  birthDate: Date;
  weight: number; // en kg
  color: string;
  microchip?: string;
  sterilized: boolean;
  owner: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
  };
  photo?: string;
  bloodType?: string;
  allergies: string[];
  chronicConditions: string[];
  currentMedication: string[];
  insurance?: {
    company: string;
    policyNumber: string;
    coverage: string;
  };
}

export interface Vaccine {
  id: string;
  patientId: string;
  name: string;
  type: 'Rabia' | 'Parvovirus' | 'Moquillo' | 'Hepatitis' | 'Leptospirosis' | 'Bordetella' | 'Triple Felina' | 'Leucemia Felina' | 'Otra';
  manufacturer: string;
  batch: string;
  date: Date;
  nextDose?: Date;
  veterinarian: string;
  veterinarianLicense: string;
  clinic: string;
  notes?: string;
  sideEffects?: string;
  certified: boolean;
}

export interface Consultation {
  id: string;
  patientId: string;
  date: Date;
  type: 'Consulta General' | 'Emergencia' | 'Control' | 'Especialidad' | 'Vacunación' | 'Desparasitación' | 'Cirugía' | 'Seguimiento';
  reason: string;
  symptoms: string[];
  vitalSigns: {
    temperature: number; // °C
    heartRate: number; // bpm
    respiratoryRate: number; // rpm
    weight: number; // kg
    bodyCondition: 1 | 2 | 3 | 4 | 5; // 1-5 scale
  };
  physicalExam: string;
  diagnosis: string;
  treatment: string;
  prescriptions: string[];
  recommendations: string[];
  veterinarian: string;
  veterinarianLicense: string;
  nextAppointment?: Date;
  cost: number;
  status: 'Completada' | 'Pendiente' | 'Cancelada';
  attachments?: string[];
}

export interface LabTest {
  id: string;
  patientId: string;
  consultationId?: string;
  date: Date;
  type: 'Hemograma' | 'Bioquímica' | 'Urianálisis' | 'Coprológico' | 'Citología' | 'Histopatología' | 'Serología' | 'Microbiología' | 'Imagenología' | 'Otro';
  testName: string;
  laboratory: string;
  requestedBy: string;
  results: {
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    status: 'Normal' | 'Alto' | 'Bajo' | 'Crítico';
  }[];
  interpretation: string;
  recommendations: string;
  attachments?: string[];
  cost: number;
}

export interface Surgery {
  id: string;
  patientId: string;
  date: Date;
  type: 'Esterilización' | 'Ortopédica' | 'Tejidos Blandos' | 'Dental' | 'Oftalmológica' | 'Oncológica' | 'Emergencia' | 'Otra';
  name: string;
  description: string;
  preOperative: {
    fasting: boolean;
    premedication: string[];
    bloodTests: string[];
    authorization: boolean;
  };
  procedure: {
    anesthesia: string;
    duration: number; // minutos
    complications?: string;
    findings: string;
    technique: string;
  };
  postOperative: {
    recovery: string;
    medication: string[];
    restrictions: string[];
    followUpDates: Date[];
    sutures?: {
      type: string;
      removalDate: Date;
    };
  };
  surgeons: {
    main: string;
    assistant?: string;
    anesthesiologist: string;
  };
  cost: number;
  status: 'Programada' | 'Completada' | 'Cancelada';
  attachments?: string[];
}

export interface Deworming {
  id: string;
  patientId: string;
  date: Date;
  product: string;
  type: 'Interno' | 'Externo' | 'Ambos';
  dosage: string;
  weight: number;
  nextDose: Date;
  veterinarian: string;
  parasitesFound?: string[];
  notes?: string;
}

export interface Certificate {
  id: string;
  patientId: string;
  type: 'Salud' | 'Vacunación' | 'Viaje' | 'Defunción' | 'Esterilización' | 'Aptitud Física' | 'Otro';
  issueDate: Date;
  expiryDate?: Date;
  purpose: string;
  veterinarian: string;
  veterinarianLicense: string;
  clinic: string;
  clinicAddress: string;
  findings: string;
  conclusion: string;
  certificationNumber: string;
  qrCode?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  consultationId: string;
  date: Date;
  medications: {
    name: string;
    presentation: string;
    dosage: string;
    frequency: string;
    duration: string;
    quantity: number;
    instructions: string;
  }[];
  veterinarian: string;
  veterinarianLicense: string;
  clinic: string;
  validUntil: Date;
  prescriptionNumber: string;
}

export interface MedicalNote {
  id: string;
  patientId: string;
  date: Date;
  type: 'Observación' | 'Nota Médica' | 'Recordatorio' | 'Alerta';
  title: string;
  content: string;
  author: string;
  priority: 'Baja' | 'Media' | 'Alta' | 'Urgente';
  tags: string[];
}

export interface GrowthRecord {
  id: string;
  patientId: string;
  date: Date;
  weight: number;
  height?: number;
  bodyCondition: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface DentalRecord {
  id: string;
  patientId: string;
  date: Date;
  condition: 'Excelente' | 'Bueno' | 'Regular' | 'Malo' | 'Crítico';
  plaque: number; // 0-4 scale
  tartar: number; // 0-4 scale
  gingivitis: number; // 0-4 scale
  missingTeeth: number[];
  damagedTeeth: number[];
  treatment: string;
  cleaning: boolean;
  extractions: number[];
  veterinarian: string;
  nextCleaning?: Date;
  photos?: string[];
}

export interface Hospitalization {
  id: string;
  patientId: string;
  admissionDate: Date;
  dischargeDate?: Date;
  reason: string;
  diagnosis: string;
  treatments: {
    date: Date;
    description: string;
    medication?: string;
    response: string;
  }[];
  vitalSignsLog: {
    date: Date;
    temperature: number;
    heartRate: number;
    respiratoryRate: number;
    notes: string;
  }[];
  feeding: {
    type: string;
    amount: string;
    frequency: string;
  };
  cost: number;
  status: 'Hospitalizado' | 'Alta' | 'Referido' | 'Fallecido';
  dischargeNotes?: string;
}

export type MedicalEventType = 
  | { type: 'consultation'; data: Consultation }
  | { type: 'vaccine'; data: Vaccine }
  | { type: 'labTest'; data: LabTest }
  | { type: 'surgery'; data: Surgery }
  | { type: 'deworming'; data: Deworming }
  | { type: 'hospitalization'; data: Hospitalization }
  | { type: 'dental'; data: DentalRecord };

export interface TimelineEvent {
  id: string;
  date: Date;
  eventType: MedicalEventType['type'];
  title: string;
  description: string;
  icon: string;
  color: string;
  data: any;
}
