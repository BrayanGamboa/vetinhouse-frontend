import { useState, useMemo } from 'react';
import type {
  Patient,
  Vaccine,
  Consultation,
  LabTest,
  Surgery,
  Deworming,
  Certificate,
  Prescription,
  MedicalNote,
  GrowthRecord,
  DentalRecord,
  // Hospitalization,
  TimelineEvent
} from '../types/historial.types';

export const useMedicalHistory = () => {
  // Pacientes (mascotas)
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Max',
      species: 'Perro',
      breed: 'Golden Retriever',
      gender: 'Macho',
      birthDate: new Date('2020-03-15'),
      weight: 32.5,
      color: 'Dorado',
      microchip: '900000123456789',
      sterilized: true,
      owner: {
        name: 'Carlos Rodríguez',
        phone: '+57 300 123 4567',
        email: 'carlos.rodriguez@email.com',
        address: 'Calle 85 #15-32, Apto 501',
        city: 'Bogotá'
      },
      photo: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
      bloodType: 'DEA 1.1+',
      allergies: ['Pollo', 'Polen de gramíneas'],
      chronicConditions: ['Displasia de cadera leve'],
      currentMedication: ['Condroprotectores (Cosequin)'],
      insurance: {
        company: 'Seguros La Mascota',
        policyNumber: 'POL-2024-001234',
        coverage: 'Plan Premium - Cobertura total'
      }
    },
    {
      id: '2',
      name: 'Luna',
      species: 'Gato',
      breed: 'Persa',
      gender: 'Hembra',
      birthDate: new Date('2021-07-20'),
      weight: 4.2,
      color: 'Blanco',
      microchip: '900000987654321',
      sterilized: true,
      owner: {
        name: 'María González',
        phone: '+57 310 987 6543',
        email: 'maria.gonzalez@email.com',
        address: 'Carrera 7 #123-45',
        city: 'Medellín'
      },
      photo: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400',
      bloodType: 'A',
      allergies: [],
      chronicConditions: ['Enfermedad renal crónica Grado I'],
      currentMedication: ['Alimento renal Hill\'s k/d'],
      insurance: {
        company: 'Pet Care Insurance',
        policyNumber: 'PCI-2023-005678',
        coverage: 'Plan Básico'
      }
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState<string>(patients[0]?.id || '');

  // Vacunas
  const [vaccines] = useState<Vaccine[]>([
    {
      id: 'v1',
      patientId: '1',
      name: 'Rabia',
      type: 'Rabia',
      manufacturer: 'Zoetis',
      batch: 'RAB2024-001',
      date: new Date('2024-01-15'),
      nextDose: new Date('2025-01-15'),
      veterinarian: 'Dra. Ana Martínez',
      veterinarianLicense: 'CMV-12345',
      clinic: 'Clínica Veterinaria VetInHouse',
      notes: 'Vacuna aplicada sin complicaciones',
      certified: true
    },
    {
      id: 'v2',
      patientId: '1',
      name: 'Múltiple Canina (DHPPi-L)',
      type: 'Parvovirus',
      manufacturer: 'Virbac',
      batch: 'DHPP-2024-045',
      date: new Date('2024-02-20'),
      nextDose: new Date('2025-02-20'),
      veterinarian: 'Dra. Ana Martínez',
      veterinarianLicense: 'CMV-12345',
      clinic: 'Clínica Veterinaria VetInHouse',
      notes: 'Incluye protección contra Moquillo, Hepatitis, Parvovirus, Parainfluenza y Leptospirosis',
      certified: true
    },
    {
      id: 'v3',
      patientId: '2',
      name: 'Triple Felina',
      type: 'Triple Felina',
      manufacturer: 'Boehringer Ingelheim',
      batch: 'TF-2024-023',
      date: new Date('2024-03-10'),
      nextDose: new Date('2025-03-10'),
      veterinarian: 'Dr. Roberto Silva',
      veterinarianLicense: 'CMV-67890',
      clinic: 'Clínica Veterinaria VetInHouse',
      notes: 'Protección contra Panleucopenia, Rinotraqueítis y Calicivirus',
      certified: true
    },
    {
      id: 'v4',
      patientId: '2',
      name: 'Leucemia Felina',
      type: 'Leucemia Felina',
      manufacturer: 'Merial',
      batch: 'FELV-2024-012',
      date: new Date('2024-04-05'),
      nextDose: new Date('2025-04-05'),
      veterinarian: 'Dr. Roberto Silva',
      veterinarianLicense: 'CMV-67890',
      clinic: 'Clínica Veterinaria VetInHouse',
      notes: 'Resultado negativo en test FeLV previo a vacunación',
      certified: true
    }
  ]);

  // Consultas
  const [consultations] = useState<Consultation[]>([
    {
      id: 'c1',
      patientId: '1',
      date: new Date('2024-09-15'),
      type: 'Control',
      reason: 'Control anual de salud',
      symptoms: [],
      vitalSigns: {
        temperature: 38.5,
        heartRate: 95,
        respiratoryRate: 22,
        weight: 32.5,
        bodyCondition: 4
      },
      physicalExam: 'Paciente alerta, condición corporal adecuada (4/5). Mucosas rosadas, TRC <2 seg. Auscultación cardiopulmonar: sin hallazgos. Palpación abdominal: sin dolor ni masas. Examen dermatológico: piel sana, pelo brillante. Examen dental: Grado 1 de placa, se recomienda limpieza preventiva. Articulaciones: crepitación leve en cadera bilateral, consistente con displasia conocida.',
      diagnosis: 'Paciente sano. Displasia de cadera leve estable.',
      treatment: 'Continuar con condroprotectores',
      prescriptions: ['Cosequin DS 1 tableta cada 12 horas'],
      recommendations: [
        'Mantener peso corporal ideal (30-33 kg)',
        'Ejercicio moderado - evitar saltos y carreras bruscas',
        'Programar limpieza dental en 3 meses',
        'Control en 6 meses o antes si presenta síntomas'
      ],
      veterinarian: 'Dra. Ana Martínez',
      veterinarianLicense: 'CMV-12345',
      nextAppointment: new Date('2025-03-15'),
      cost: 85000,
      status: 'Completada'
    },
    {
      id: 'c2',
      patientId: '1',
      date: new Date('2024-07-20'),
      type: 'Emergencia',
      reason: 'Vómito y diarrea aguda',
      symptoms: ['Vómito', 'Diarrea', 'Letargia', 'Pérdida de apetito'],
      vitalSigns: {
        temperature: 39.2,
        heartRate: 110,
        respiratoryRate: 28,
        weight: 31.8,
        bodyCondition: 4
      },
      physicalExam: 'Paciente levemente deshidratado (5%). Mucosas ligeramente pálidas. TRC 2 seg. Dolor abdominal leve a la palpación. Auscultación cardiopulmonar normal. Temperatura elevada.',
      diagnosis: 'Gastroenteritis aguda - probable origen dietético',
      treatment: 'Fluidoterapia IV (Ringer Lactato 500ml), Antiemético (Metoclopramida), Protector gástrico (Omeprazol), Dieta blanda',
      prescriptions: [
        'Omeprazol 20mg cada 24 horas por 5 días',
        'Metronidazol 500mg cada 12 horas por 5 días',
        'Probióticos (Proplan FortiFlora) 1 sobre diario por 10 días'
      ],
      recommendations: [
        'Ayuno de 12 horas, luego introducir dieta blanda gradualmente',
        'Agua fresca disponible en pequeñas cantidades frecuentes',
        'Monitorear deposiciones y vómitos',
        'Regresar si no hay mejoría en 48 horas',
        'Evitar cambios bruscos de alimentación'
      ],
      veterinarian: 'Dr. Carlos Méndez',
      veterinarianLicense: 'CMV-54321',
      nextAppointment: new Date('2024-07-27'),
      cost: 250000,
      status: 'Completada',
      attachments: ['radiografia_abdomen_20240720.pdf']
    },
    {
      id: 'c3',
      patientId: '2',
      date: new Date('2024-08-10'),
      type: 'Control',
      reason: 'Control de función renal',
      symptoms: [],
      vitalSigns: {
        temperature: 38.3,
        heartRate: 180,
        respiratoryRate: 28,
        weight: 4.2,
        bodyCondition: 3
      },
      physicalExam: 'Paciente alerta y activo. Condición corporal adecuada (3/5). Mucosas rosadas. Palpación renal: riñones de tamaño normal, sin dolor. Auscultación cardiopulmonar: soplo grado I/VI sistólico. Hidratación adecuada. Pelaje en buen estado.',
      diagnosis: 'Enfermedad Renal Crónica Grado I estable',
      treatment: 'Continuar con dieta renal',
      prescriptions: ['Hill\'s k/d alimento renal ad libitum'],
      recommendations: [
        'Mantener dieta renal estricta',
        'Agua fresca siempre disponible',
        'Control de presión arterial en 6 meses',
        'Monitorear consumo de agua y producción de orina',
        'Análisis de sangre de control en 6 meses'
      ],
      veterinarian: 'Dr. Roberto Silva',
      veterinarianLicense: 'CMV-67890',
      nextAppointment: new Date('2025-02-10'),
      cost: 75000,
      status: 'Completada'
    }
  ]);

  // Exámenes de laboratorio
  const [labTests] = useState<LabTest[]>([
    {
      id: 'l1',
      patientId: '1',
      consultationId: 'c1',
      date: new Date('2024-09-15'),
      type: 'Bioquímica',
      testName: 'Perfil Bioquímico Completo',
      laboratory: 'LabVet Colombia',
      requestedBy: 'Dra. Ana Martínez',
      results: [
        { parameter: 'Glucosa', value: '95', unit: 'mg/dL', referenceRange: '70-110', status: 'Normal' },
        { parameter: 'Urea', value: '28', unit: 'mg/dL', referenceRange: '15-40', status: 'Normal' },
        { parameter: 'Creatinina', value: '1.1', unit: 'mg/dL', referenceRange: '0.5-1.5', status: 'Normal' },
        { parameter: 'ALT (TGP)', value: '45', unit: 'UI/L', referenceRange: '10-100', status: 'Normal' },
        { parameter: 'AST (TGO)', value: '38', unit: 'UI/L', referenceRange: '10-50', status: 'Normal' },
        { parameter: 'Fosfatasa Alcalina', value: '85', unit: 'UI/L', referenceRange: '20-150', status: 'Normal' },
        { parameter: 'Proteínas Totales', value: '6.8', unit: 'g/dL', referenceRange: '5.4-7.5', status: 'Normal' },
        { parameter: 'Albúmina', value: '3.5', unit: 'g/dL', referenceRange: '2.6-4.0', status: 'Normal' },
        { parameter: 'Colesterol', value: '195', unit: 'mg/dL', referenceRange: '135-270', status: 'Normal' }
      ],
      interpretation: 'Perfil bioquímico dentro de parámetros normales. Función hepática y renal normales. No se observan alteraciones metabólicas.',
      recommendations: 'Continuar con manejo actual. Control anual de rutina.',
      cost: 120000
    },
    {
      id: 'l2',
      patientId: '1',
      consultationId: 'c1',
      date: new Date('2024-09-15'),
      type: 'Hemograma',
      testName: 'Hemograma Completo',
      laboratory: 'LabVet Colombia',
      requestedBy: 'Dra. Ana Martínez',
      results: [
        { parameter: 'Hematocrito', value: '45', unit: '%', referenceRange: '37-55', status: 'Normal' },
        { parameter: 'Hemoglobina', value: '15.2', unit: 'g/dL', referenceRange: '12-18', status: 'Normal' },
        { parameter: 'Eritrocitos', value: '6.5', unit: '10^6/μL', referenceRange: '5.5-8.5', status: 'Normal' },
        { parameter: 'Leucocitos', value: '9.8', unit: '10^3/μL', referenceRange: '6.0-17.0', status: 'Normal' },
        { parameter: 'Neutrófilos', value: '65', unit: '%', referenceRange: '60-77', status: 'Normal' },
        { parameter: 'Linfocitos', value: '25', unit: '%', referenceRange: '12-30', status: 'Normal' },
        { parameter: 'Monocitos', value: '5', unit: '%', referenceRange: '3-10', status: 'Normal' },
        { parameter: 'Eosinófilos', value: '4', unit: '%', referenceRange: '2-10', status: 'Normal' },
        { parameter: 'Plaquetas', value: '285', unit: '10^3/μL', referenceRange: '200-500', status: 'Normal' }
      ],
      interpretation: 'Hemograma completo sin alteraciones. Valores hematológicos dentro de rangos normales para la especie y edad.',
      recommendations: 'No requiere seguimiento específico.',
      cost: 85000
    },
    {
      id: 'l3',
      patientId: '2',
      consultationId: 'c3',
      date: new Date('2024-08-10'),
      type: 'Bioquímica',
      testName: 'Perfil Renal',
      laboratory: 'LabVet Colombia',
      requestedBy: 'Dr. Roberto Silva',
      results: [
        { parameter: 'Urea', value: '48', unit: 'mg/dL', referenceRange: '20-65', status: 'Normal' },
        { parameter: 'Creatinina', value: '1.8', unit: 'mg/dL', referenceRange: '0.8-2.4', status: 'Normal' },
        { parameter: 'Fósforo', value: '4.2', unit: 'mg/dL', referenceRange: '2.5-6.0', status: 'Normal' },
        { parameter: 'SDMA', value: '16', unit: 'μg/dL', referenceRange: '0-14', status: 'Alto' },
        { parameter: 'Proteínas Totales', value: '7.2', unit: 'g/dL', referenceRange: '5.4-7.8', status: 'Normal' },
        { parameter: 'Albúmina', value: '3.1', unit: 'g/dL', referenceRange: '2.1-3.9', status: 'Normal' }
      ],
      interpretation: 'Leve elevación de SDMA sugiriendo enfermedad renal temprana (Grado I). Creatinina y urea dentro de rangos normales. Función renal compensada.',
      recommendations: 'Continuar con dieta renal. Monitoreo cada 6 meses. Mantener hidratación adecuada.',
      cost: 95000
    }
  ]);

  // Cirugías
  const [surgeries] = useState<Surgery[]>([
    {
      id: 's1',
      patientId: '1',
      date: new Date('2020-08-15'),
      type: 'Esterilización',
      name: 'Orquiectomía (Castración)',
      description: 'Esterilización quirúrgica mediante extirpación bilateral de testículos',
      preOperative: {
        fasting: true,
        premedication: ['Acepromazina 0.05 mg/kg IM', 'Tramadol 3 mg/kg IM'],
        bloodTests: ['Hemograma completo', 'Perfil bioquímico'],
        authorization: true
      },
      procedure: {
        anesthesia: 'Propofol (inducción) + Isoflurano (mantenimiento)',
        duration: 25,
        technique: 'Técnica cerrada pre-escrotal',
        findings: 'Testículos de tamaño y aspecto normal. Sin complicaciones durante el procedimiento.'
      },
      postOperative: {
        recovery: 'Recuperación sin complicaciones. Paciente alerta 45 minutos post-cirugía.',
        medication: [
          'Meloxicam 0.1 mg/kg cada 24 horas por 3 días',
          'Tramadol 3 mg/kg cada 8 horas por 3 días',
          'Cefalexina 20 mg/kg cada 12 horas por 7 días'
        ],
        restrictions: [
          'Reposo absoluto por 7 días',
          'Usar collar isabelino hasta retirar suturas',
          'No mojar la herida',
          'Evitar ejercicio intenso por 14 días'
        ],
        followUpDates: [new Date('2020-08-18'), new Date('2020-08-25')],
        sutures: {
          type: 'Nylon 3-0 (piel)',
          removalDate: new Date('2020-08-25')
        }
      },
      surgeons: {
        main: 'Dra. Ana Martínez',
        assistant: 'Dr. Carlos Méndez',
        anesthesiologist: 'Dra. Patricia López'
      },
      cost: 350000,
      status: 'Completada',
      attachments: ['protocolo_anestesico.pdf', 'fotos_procedimiento.pdf']
    },
    {
      id: 's2',
      patientId: '2',
      date: new Date('2022-01-20'),
      type: 'Esterilización',
      name: 'Ovariohisterectomía (Esterilización)',
      description: 'Esterilización quirúrgica mediante extirpación de ovarios y útero',
      preOperative: {
        fasting: true,
        premedication: ['Acepromazina 0.05 mg/kg IM', 'Buprenorfina 0.02 mg/kg IM'],
        bloodTests: ['Hemograma', 'Perfil renal y hepático', 'Test FeLV/FIV'],
        authorization: true
      },
      procedure: {
        anesthesia: 'Propofol + Isoflurano',
        duration: 35,
        technique: 'Técnica de flanco izquierdo',
        findings: 'Útero y ovarios de aspecto normal. Procedimiento sin complicaciones.'
      },
      postOperative: {
        recovery: 'Recuperación tranquila. Alta a las 6 horas post-cirugía.',
        medication: [
          'Meloxicam 0.05 mg/kg cada 24 horas por 3 días',
          'Buprenorfina 0.02 mg/kg cada 8 horas por 2 días',
          'Amoxicilina-Clavulánico 12.5 mg/kg cada 12 horas por 7 días'
        ],
        restrictions: [
          'Reposo en jaula amplia por 7 días',
          'Collar isabelino permanente',
          'No saltar ni trepar',
          'Monitorear incisión diariamente'
        ],
        followUpDates: [new Date('2022-01-23'), new Date('2022-01-30')],
        sutures: {
          type: 'Sutura intradérmica absorbible',
          removalDate: new Date('2022-01-30')
        }
      },
      surgeons: {
        main: 'Dr. Roberto Silva',
        anesthesiologist: 'Dra. Patricia López'
      },
      cost: 380000,
      status: 'Completada'
    }
  ]);

  // Desparasitaciones
  const [dewormings] = useState<Deworming[]>([
    {
      id: 'd1',
      patientId: '1',
      date: new Date('2024-09-15'),
      product: 'Drontal Plus',
      type: 'Interno',
      dosage: '1 tableta por 10 kg',
      weight: 32.5,
      nextDose: new Date('2024-12-15'),
      veterinarian: 'Dra. Ana Martínez',
      notes: 'Desparasitación trimestral de rutina'
    },
    {
      id: 'd2',
      patientId: '1',
      date: new Date('2024-08-01'),
      product: 'Nexgard Spectra',
      type: 'Externo',
      dosage: '1 tableta (para perros 15.1-30 kg)',
      weight: 32.0,
      nextDose: new Date('2024-09-01'),
      veterinarian: 'Dra. Ana Martínez',
      notes: 'Protección mensual contra pulgas, garrapatas y parásitos internos'
    },
    {
      id: 'd3',
      patientId: '2',
      date: new Date('2024-08-10'),
      product: 'Milbemax Gatos',
      type: 'Interno',
      dosage: '1 tableta (para gatos 2-8 kg)',
      weight: 4.2,
      nextDose: new Date('2024-11-10'),
      veterinarian: 'Dr. Roberto Silva',
      notes: 'Desparasitación trimestral'
    }
  ]);

  // Certificados
  const [certificates] = useState<Certificate[]>([
    {
      id: 'cert1',
      patientId: '1',
      type: 'Salud',
      issueDate: new Date('2024-09-15'),
      expiryDate: new Date('2024-12-15'),
      purpose: 'Viaje nacional',
      veterinarian: 'Dra. Ana Martínez',
      veterinarianLicense: 'CMV-12345',
      clinic: 'Clínica Veterinaria VetInHouse',
      clinicAddress: 'Calle 100 #15-20, Bogotá',
      findings: 'Paciente en excelente estado de salud. Vacunas al día. Sin signos de enfermedad infecto-contagiosa.',
      conclusion: 'El paciente se encuentra APTO para viajar.',
      certificationNumber: 'VIH-CERT-2024-001234',
      qrCode: 'https://verify.vetinhouse.com/cert/001234'
    },
    {
      id: 'cert2',
      patientId: '1',
      type: 'Vacunación',
      issueDate: new Date('2024-02-20'),
      expiryDate: new Date('2025-02-20'),
      purpose: 'Carnet de vacunación oficial',
      veterinarian: 'Dra. Ana Martínez',
      veterinarianLicense: 'CMV-12345',
      clinic: 'Clínica Veterinaria VetInHouse',
      clinicAddress: 'Calle 100 #15-20, Bogotá',
      findings: 'Vacunas antirrábica y múltiple canina aplicadas según calendario. Paciente en buen estado de salud.',
      conclusion: 'Esquema de vacunación COMPLETO y vigente.',
      certificationNumber: 'VIH-VAC-2024-005678'
    }
  ]);

  // Recetas
  const [prescriptions] = useState<Prescription[]>([
    {
      id: 'rx1',
      patientId: '1',
      consultationId: 'c2',
      date: new Date('2024-07-20'),
      medications: [
        {
          name: 'Omeprazol',
          presentation: 'Cápsulas 20mg',
          dosage: '20mg',
          frequency: 'Cada 24 horas',
          duration: '5 días',
          quantity: 5,
          instructions: 'Administrar con alimento, preferiblemente en la mañana'
        },
        {
          name: 'Metronidazol',
          presentation: 'Tabletas 500mg',
          dosage: '500mg',
          frequency: 'Cada 12 horas',
          duration: '5 días',
          quantity: 10,
          instructions: 'Administrar con alimento para evitar malestar estomacal'
        },
        {
          name: 'Proplan FortiFlora',
          presentation: 'Sobres 1g',
          dosage: '1 sobre',
          frequency: 'Una vez al día',
          duration: '10 días',
          quantity: 10,
          instructions: 'Mezclar con el alimento principal'
        }
      ],
      veterinarian: 'Dr. Carlos Méndez',
      veterinarianLicense: 'CMV-54321',
      clinic: 'Clínica Veterinaria VetInHouse',
      validUntil: new Date('2024-08-20'),
      prescriptionNumber: 'RX-2024-007890'
    }
  ]);

  // Notas médicas
  const [medicalNotes] = useState<MedicalNote[]>([
    {
      id: 'n1',
      patientId: '1',
      date: new Date('2024-09-15'),
      type: 'Recordatorio',
      title: 'Próxima limpieza dental',
      content: 'Programar limpieza dental preventiva en 3 meses. Paciente presenta Grado 1 de placa dental.',
      author: 'Dra. Ana Martínez',
      priority: 'Media',
      tags: ['Dental', 'Prevención']
    },
    {
      id: 'n2',
      patientId: '1',
      date: new Date('2024-07-20'),
      type: 'Alerta',
      title: 'Sensibilidad alimentaria',
      content: 'Paciente presentó gastroenteritis después de consumir alimento con pollo. Evitar proteínas de ave. Preferir cordero o pescado.',
      author: 'Dr. Carlos Méndez',
      priority: 'Alta',
      tags: ['Alimentación', 'Alergia']
    }
  ]);

  // Registros de crecimiento
  const [growthRecords] = useState<GrowthRecord[]>([
    { id: 'g1', patientId: '1', date: new Date('2020-05-15'), weight: 8.5, bodyCondition: 3 },
    { id: 'g2', patientId: '1', date: new Date('2020-08-15'), weight: 18.2, bodyCondition: 3 },
    { id: 'g3', patientId: '1', date: new Date('2020-11-15'), weight: 25.5, bodyCondition: 4 },
    { id: 'g4', patientId: '1', date: new Date('2021-02-15'), weight: 29.8, bodyCondition: 4 },
    { id: 'g5', patientId: '1', date: new Date('2021-08-15'), weight: 32.0, bodyCondition: 4 },
    { id: 'g6', patientId: '1', date: new Date('2024-09-15'), weight: 32.5, bodyCondition: 4 }
  ]);

  // Registros dentales
  const [dentalRecords] = useState<DentalRecord[]>([
    {
      id: 'dent1',
      patientId: '1',
      date: new Date('2024-09-15'),
      condition: 'Bueno',
      plaque: 1,
      tartar: 1,
      gingivitis: 0,
      missingTeeth: [],
      damagedTeeth: [],
      treatment: 'Revisión preventiva',
      cleaning: false,
      extractions: [],
      veterinarian: 'Dra. Ana Martínez',
      nextCleaning: new Date('2024-12-15')
    }
  ]);

  // Timeline de eventos
  const timeline = useMemo(() => {
    const events: TimelineEvent[] = [];
    const currentPatient = patients.find(p => p.id === selectedPatient);
    
    if (!currentPatient) return [];

    // Agregar consultas
    consultations
      .filter(c => c.patientId === selectedPatient)
      .forEach(c => {
        events.push({
          id: c.id,
          date: c.date,
          eventType: 'consultation',
          title: c.type,
          description: c.reason,
          icon: 'fa-stethoscope',
          color: c.type === 'Emergencia' ? 'red' : 'blue',
          data: c
        });
      });

    // Agregar vacunas
    vaccines
      .filter(v => v.patientId === selectedPatient)
      .forEach(v => {
        events.push({
          id: v.id,
          date: v.date,
          eventType: 'vaccine',
          title: 'Vacunación',
          description: v.name,
          icon: 'fa-syringe',
          color: 'green',
          data: v
        });
      });

    // Agregar exámenes
    labTests
      .filter(l => l.patientId === selectedPatient)
      .forEach(l => {
        events.push({
          id: l.id,
          date: l.date,
          eventType: 'labTest',
          title: 'Examen de Laboratorio',
          description: l.testName,
          icon: 'fa-flask',
          color: 'purple',
          data: l
        });
      });

    // Agregar cirugías
    surgeries
      .filter(s => s.patientId === selectedPatient)
      .forEach(s => {
        events.push({
          id: s.id,
          date: s.date,
          eventType: 'surgery',
          title: 'Cirugía',
          description: s.name,
          icon: 'fa-scalpel',
          color: 'orange',
          data: s
        });
      });

    // Agregar desparasitaciones
    dewormings
      .filter(d => d.patientId === selectedPatient)
      .forEach(d => {
        events.push({
          id: d.id,
          date: d.date,
          eventType: 'deworming',
          title: 'Desparasitación',
          description: `${d.product} (${d.type})`,
          icon: 'fa-shield-virus',
          color: 'teal',
          data: d
        });
      });

    // Ordenar por fecha descendente
    return events.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [selectedPatient, consultations, vaccines, labTests, surgeries, dewormings, patients]);

  const currentPatient = patients.find(p => p.id === selectedPatient);
  
  const patientVaccines = vaccines.filter(v => v.patientId === selectedPatient);
  const patientConsultations = consultations.filter(c => c.patientId === selectedPatient);
  const patientLabTests = labTests.filter(l => l.patientId === selectedPatient);
  const patientSurgeries = surgeries.filter(s => s.patientId === selectedPatient);
  const patientDewormings = dewormings.filter(d => d.patientId === selectedPatient);
  const patientCertificates = certificates.filter(c => c.patientId === selectedPatient);
  const patientPrescriptions = prescriptions.filter(p => p.patientId === selectedPatient);
  const patientNotes = medicalNotes.filter(n => n.patientId === selectedPatient);
  const patientGrowth = growthRecords.filter(g => g.patientId === selectedPatient);
  const patientDental = dentalRecords.filter(d => d.patientId === selectedPatient);

  return {
    patients,
    selectedPatient,
    setSelectedPatient,
    currentPatient,
    vaccines: patientVaccines,
    consultations: patientConsultations,
    labTests: patientLabTests,
    surgeries: patientSurgeries,
    dewormings: patientDewormings,
    certificates: patientCertificates,
    prescriptions: patientPrescriptions,
    medicalNotes: patientNotes,
    growthRecords: patientGrowth,
    dentalRecords: patientDental,
    timeline
  };
};
