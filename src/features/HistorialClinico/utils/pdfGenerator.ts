import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Patient, Vaccine, Certificate, Prescription, Consultation, LabTest, Surgery } from '../types/historial.types';

// Configuración global
const PRIMARY_COLOR: [number, number, number] = [34, 139, 34]; // Verde
const SECONDARY_COLOR: [number, number, number] = [59, 130, 246]; // Azul
const TEXT_COLOR: [number, number, number] = [51, 51, 51]; // Gris oscuro
const LIGHT_BG: [number, number, number] = [240, 253, 244]; // Verde claro

// Helper: Agregar encabezado oficial
function addHeader(doc: jsPDF, title: string) {
  // Banner superior verde
  doc.setFillColor(...PRIMARY_COLOR);
  doc.rect(0, 0, 210, 35, 'F');
  
  // Logo/Nombre de la clínica
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('VetInHouse', 105, 15, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Clínica Veterinaria a Domicilio', 105, 22, { align: 'center' });
  doc.text('☎ +57 300 123 4567 | 📧 info@vetinhouse.com', 105, 28, { align: 'center' });
  
  // Título del documento
  doc.setTextColor(...TEXT_COLOR);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 105, 45, { align: 'center' });
  
  // Línea decorativa
  doc.setDrawColor(...PRIMARY_COLOR);
  doc.setLineWidth(0.5);
  doc.line(20, 50, 190, 50);
}

// Helper: Agregar pie de página
function addFooter(doc: jsPDF, pageNumber: number = 1) {
  const pageHeight = doc.internal.pageSize.height;
  
  // Línea superior
  doc.setDrawColor(...PRIMARY_COLOR);
  doc.setLineWidth(0.3);
  doc.line(20, pageHeight - 20, 190, pageHeight - 20);
  
  // Información legal
  doc.setTextColor(128, 128, 128);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('Calle 100 #15-20, Bogotá | Licencia Sanitaria: VS-12345-2024', 105, pageHeight - 15, { align: 'center' });
  doc.text('Este documento es válido con firma y sello oficial', 105, pageHeight - 11, { align: 'center' });
  
  // Número de página
  doc.setFont('helvetica', 'normal');
  doc.text(`Página ${pageNumber}`, 190, pageHeight - 7, { align: 'right' });
  
  // Fecha de generación
  const fecha = new Date().toLocaleDateString('es-CO', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  doc.text(`Generado: ${fecha}`, 20, pageHeight - 7);
}

// Helper: Agregar cuadro de información del paciente
function addPatientInfo(doc: jsPDF, patient: Patient, yPosition: number) {
  doc.setFillColor(...LIGHT_BG);
  doc.roundedRect(20, yPosition, 170, 35, 3, 3, 'F');
  
  doc.setTextColor(...TEXT_COLOR);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('DATOS DEL PACIENTE', 25, yPosition + 7);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  const edad = Math.floor((new Date().getTime() - patient.birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  
  doc.text(`Nombre: ${patient.name}`, 25, yPosition + 14);
  doc.text(`Especie: ${patient.species}`, 25, yPosition + 20);
  doc.text(`Raza: ${patient.breed}`, 25, yPosition + 26);
  
  doc.text(`Edad: ${edad} años`, 110, yPosition + 14);
  doc.text(`Sexo: ${patient.gender}`, 110, yPosition + 20);
  doc.text(`Peso: ${patient.weight} kg`, 110, yPosition + 26);
  
  if (patient.microchip) {
    doc.setFontSize(8);
    doc.text(`Microchip: ${patient.microchip}`, 25, yPosition + 32);
  }
  
  return yPosition + 40;
}

// Helper: Agregar cuadro del propietario
function addOwnerInfo(doc: jsPDF, patient: Patient, yPosition: number) {
  doc.setDrawColor(...PRIMARY_COLOR);
  doc.setLineWidth(0.3);
  doc.rect(20, yPosition, 170, 25);
  
  doc.setTextColor(...TEXT_COLOR);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('DATOS DEL PROPIETARIO', 25, yPosition + 7);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Nombre: ${patient.owner.name}`, 25, yPosition + 14);
  doc.text(`Teléfono: ${patient.owner.phone}`, 25, yPosition + 20);
  doc.text(`Dirección: ${patient.owner.address}, ${patient.owner.city}`, 110, yPosition + 14);
  doc.text(`Email: ${patient.owner.email}`, 110, yPosition + 20);
  
  return yPosition + 30;
}

// 1. CERTIFICADO DE VACUNACIÓN
export function generateVaccinationCertificate(patient: Patient, vaccine: Vaccine) {
  const doc = new jsPDF();
  
  addHeader(doc, 'CERTIFICADO OFICIAL DE VACUNACIÓN');
  
  let yPos = 55;
  
  // Información del paciente
  yPos = addPatientInfo(doc, patient, yPos);
  
  // Datos de la vacuna
  doc.setFillColor(...SECONDARY_COLOR);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('DATOS DE LA VACUNACIÓN', 25, yPos + 6);
  
  yPos += 12;
  
  doc.setTextColor(...TEXT_COLOR);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  const rows = [
    ['Vacuna:', vaccine.name],
    ['Tipo:', vaccine.type],
    ['Fabricante:', vaccine.manufacturer],
    ['Lote:', vaccine.batch],
    ['Fecha de Aplicación:', vaccine.date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })],
    ['Próxima Dosis:', vaccine.nextDose ? vaccine.nextDose.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No requiere'],
    ['Veterinario:', vaccine.veterinarian],
    ['Licencia Profesional:', vaccine.veterinarianLicense],
    ['Clínica:', vaccine.clinic]
  ];
  
  autoTable(doc, {
    startY: yPos,
    head: [],
    body: rows,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      1: { cellWidth: 120 }
    },
    margin: { left: 20, right: 20 }
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 10;
  
  // Observaciones
  if (vaccine.notes) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Observaciones:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(vaccine.notes, 170);
    doc.text(lines, 20, yPos + 5);
    yPos += 15;
  }
  
  // Cuadro de certificación
  yPos = Math.max(yPos, 200);
  doc.setFillColor(255, 250, 205);
  doc.roundedRect(20, yPos, 170, 30, 3, 3, 'F');
  doc.setDrawColor(...PRIMARY_COLOR);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, yPos, 170, 30, 3, 3, 'S');
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('CERTIFICACIÓN OFICIAL', 105, yPos + 8, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...TEXT_COLOR);
  doc.text('Certifico que el paciente mencionado ha recibido la vacuna descrita', 105, yPos + 14, { align: 'center' });
  doc.text('de acuerdo con las normas sanitarias vigentes.', 105, yPos + 19, { align: 'center' });
  
  doc.setFontSize(8);
  doc.text(`Certificado No: VIH-VAC-${vaccine.id}-${new Date().getFullYear()}`, 105, yPos + 26, { align: 'center' });
  
  // Firma
  yPos += 35;
  doc.line(130, yPos + 15, 180, yPos + 15);
  doc.setFontSize(9);
  doc.text(vaccine.veterinarian, 155, yPos + 20, { align: 'center' });
  doc.setFontSize(8);
  doc.text(`Lic. ${vaccine.veterinarianLicense}`, 155, yPos + 25, { align: 'center' });
  
  addFooter(doc);
  
  doc.save(`Certificado_Vacunacion_${patient.name}_${vaccine.name}.pdf`);
}

// 2. CERTIFICADO DE SALUD
export function generateHealthCertificate(patient: Patient, certificate: Certificate) {
  const doc = new jsPDF();
  
  addHeader(doc, 'CERTIFICADO DE SALUD ANIMAL');
  
  let yPos = 55;
  
  // Número de certificado destacado
  doc.setFillColor(255, 215, 0);
  doc.roundedRect(135, yPos, 55, 12, 2, 2, 'F');
  doc.setTextColor(...TEXT_COLOR);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`Nº ${certificate.certificationNumber}`, 162.5, yPos + 8, { align: 'center' });
  
  yPos += 17;
  
  // Información del paciente
  yPos = addPatientInfo(doc, patient, yPos);
  
  // Propósito
  doc.setFillColor(...SECONDARY_COLOR);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PROPÓSITO DEL CERTIFICADO', 25, yPos + 6);
  
  yPos += 15;
  doc.setTextColor(...TEXT_COLOR);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(certificate.purpose, 20, yPos);
  
  yPos += 10;
  
  // Hallazgos médicos
  doc.setFont('helvetica', 'bold');
  doc.text('EXAMEN CLÍNICO:', 20, yPos);
  yPos += 5;
  doc.setFont('helvetica', 'normal');
  const hallazgosLines = doc.splitTextToSize(certificate.findings, 170);
  doc.text(hallazgosLines, 20, yPos);
  yPos += hallazgosLines.length * 5 + 5;
  
  // Conclusión
  doc.setFont('helvetica', 'bold');
  doc.text('CONCLUSIÓN:', 20, yPos);
  yPos += 5;
  doc.setFont('helvetica', 'normal');
  const conclusionLines = doc.splitTextToSize(certificate.conclusion, 170);
  doc.text(conclusionLines, 20, yPos);
  yPos += conclusionLines.length * 5 + 10;
  
  // Validez
  doc.setFontSize(9);
  doc.text(`Fecha de Emisión: ${certificate.issueDate.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}`, 20, yPos);
  if (certificate.expiryDate) {
    doc.text(`Válido hasta: ${certificate.expiryDate.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}`, 20, yPos + 5);
  }
  
  // Cuadro de firma
  yPos = Math.max(yPos + 15, 220);
  doc.setFillColor(...LIGHT_BG);
  doc.roundedRect(20, yPos, 170, 35, 3, 3, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Médico Veterinario Certificante:', 25, yPos + 10);
  
  doc.line(25, yPos + 25, 90, yPos + 25);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(certificate.veterinarian, 57.5, yPos + 30, { align: 'center' });
  doc.setFontSize(8);
  doc.text(`Lic. ${certificate.veterinarianLicense}`, 57.5, yPos + 34, { align: 'center' });
  
  doc.setFontSize(9);
  doc.text('Sello Oficial:', 130, yPos + 10);
  doc.setDrawColor(...PRIMARY_COLOR);
  doc.circle(155, yPos + 22, 10, 'S');
  
  addFooter(doc);
  
  doc.save(`Certificado_Salud_${patient.name}_${new Date().toISOString().split('T')[0]}.pdf`);
}

// 3. RECETA MÉDICA
export function generatePrescription(patient: Patient, prescription: Prescription, consultation?: Consultation) {
  const doc = new jsPDF();
  
  addHeader(doc, 'RECETA MÉDICA VETERINARIA');
  
  let yPos = 55;
  
  // Número de receta
  doc.setFillColor(220, 38, 38);
  doc.roundedRect(135, yPos, 55, 12, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`Rx Nº ${prescription.prescriptionNumber}`, 162.5, yPos + 8, { align: 'center' });
  
  yPos += 17;
  
  // Información del paciente
  yPos = addPatientInfo(doc, patient, yPos);
  
  // Diagnóstico (si hay consulta)
  if (consultation) {
    doc.setFillColor(254, 243, 199);
    doc.roundedRect(20, yPos, 170, 15, 2, 2, 'F');
    doc.setTextColor(...TEXT_COLOR);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Diagnóstico:', 25, yPos + 7);
    doc.setFont('helvetica', 'normal');
    doc.text(consultation.diagnosis, 25, yPos + 12);
    yPos += 20;
  }
  
  // Medicamentos
  doc.setFillColor(...SECONDARY_COLOR);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('MEDICAMENTOS PRESCRITOS', 25, yPos + 6);
  
  yPos += 12;
  
  prescription.medications.forEach((med, index) => {
    // Cuadro por medicamento
    doc.setDrawColor(...PRIMARY_COLOR);
    doc.setLineWidth(0.3);
    doc.roundedRect(20, yPos, 170, 30, 2, 2, 'S');
    
    doc.setTextColor(...TEXT_COLOR);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${med.name}`, 25, yPos + 7);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Presentación: ${med.presentation}`, 25, yPos + 13);
    doc.text(`Dosis: ${med.dosage} | Frecuencia: ${med.frequency}`, 25, yPos + 18);
    doc.text(`Duración: ${med.duration} | Cantidad: ${med.quantity}`, 25, yPos + 23);
    
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    const instrLines = doc.splitTextToSize(`Instrucciones: ${med.instructions}`, 165);
    doc.text(instrLines, 25, yPos + 28);
    
    yPos += 35;
  });
  
  // Validez
  yPos += 5;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fecha de expedición: ${prescription.date.toLocaleDateString('es-CO')}`, 20, yPos);
  doc.text(`Válida hasta: ${prescription.validUntil.toLocaleDateString('es-CO')}`, 20, yPos + 5);
  
  // Firma
  yPos += 15;
  doc.setFillColor(...LIGHT_BG);
  doc.roundedRect(20, yPos, 170, 25, 2, 2, 'F');
  
  doc.line(130, yPos + 15, 180, yPos + 15);
  doc.setFontSize(9);
  doc.text(prescription.veterinarian, 155, yPos + 19, { align: 'center' });
  doc.setFontSize(8);
  doc.text(`Lic. ${prescription.veterinarianLicense}`, 155, yPos + 23, { align: 'center' });
  doc.text(prescription.clinic, 25, yPos + 8);
  
  addFooter(doc);
  
  doc.save(`Receta_Medica_${patient.name}_${prescription.prescriptionNumber}.pdf`);
}

// 4. HISTORIAL MÉDICO COMPLETO
export function generateFullMedicalReport(
  patient: Patient,
  consultations: Consultation[],
  vaccines: Vaccine[],
  labTests: LabTest[],
  surgeries: Surgery[]
) {
  const doc = new jsPDF();
  
  addHeader(doc, 'HISTORIAL MÉDICO COMPLETO');
  
  let yPos = 55;
  
  // Información del paciente
  yPos = addPatientInfo(doc, patient, yPos);
  yPos = addOwnerInfo(doc, patient, yPos);
  
  // Resumen
  yPos += 5;
  doc.setFillColor(...SECONDARY_COLOR);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('RESUMEN DEL HISTORIAL', 25, yPos + 6);
  
  yPos += 12;
  
  const resumenData = [
    ['Total de Consultas:', consultations.length.toString()],
    ['Total de Vacunas:', vaccines.length.toString()],
    ['Total de Exámenes:', labTests.length.toString()],
    ['Total de Cirugías:', surgeries.length.toString()]
  ];
  
  autoTable(doc, {
    startY: yPos,
    body: resumenData,
    theme: 'plain',
    styles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      1: { cellWidth: 30 }
    },
    margin: { left: 20 }
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 10;
  
  // VACUNAS
  if (vaccines.length > 0) {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFillColor(...PRIMARY_COLOR);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('REGISTRO DE VACUNACIÓN', 25, yPos + 6);
    
    yPos += 12;
    
    const vaccineRows = vaccines.map(v => [
      v.date.toLocaleDateString('es-CO'),
      v.name,
      v.type,
      v.nextDose ? v.nextDose.toLocaleDateString('es-CO') : 'N/A'
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [['Fecha', 'Vacuna', 'Tipo', 'Próxima Dosis']],
      body: vaccineRows,
      theme: 'striped',
      headStyles: { fillColor: PRIMARY_COLOR as any },
      styles: { fontSize: 9 },
      margin: { left: 20, right: 20 }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
  }
  
  // CONSULTAS
  if (consultations.length > 0) {
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFillColor(...PRIMARY_COLOR);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('REGISTRO DE CONSULTAS', 25, yPos + 6);
    
    yPos += 12;
    
    const consultRows = consultations.map(c => [
      c.date.toLocaleDateString('es-CO'),
      c.type,
      c.reason.substring(0, 40) + '...',
      c.veterinarian
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [['Fecha', 'Tipo', 'Motivo', 'Veterinario']],
      body: consultRows,
      theme: 'striped',
      headStyles: { fillColor: PRIMARY_COLOR as any },
      styles: { fontSize: 9 },
      margin: { left: 20, right: 20 }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
  }
  
  addFooter(doc, 1);
  
  // Segunda página para exámenes si hay
  if (labTests.length > 0) {
    doc.addPage();
    addHeader(doc, 'HISTORIAL MÉDICO - EXÁMENES');
    yPos = 60;
    
    doc.setFillColor(...PRIMARY_COLOR);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('EXÁMENES DE LABORATORIO', 25, yPos + 6);
    
    yPos += 12;
    
    const labRows = labTests.map(l => [
      l.date.toLocaleDateString('es-CO'),
      l.type,
      l.testName,
      l.laboratory
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [['Fecha', 'Tipo', 'Examen', 'Laboratorio']],
      body: labRows,
      theme: 'striped',
      headStyles: { fillColor: PRIMARY_COLOR as any },
      styles: { fontSize: 9 },
      margin: { left: 20, right: 20 }
    });
    
    addFooter(doc, 2);
  }
  
  doc.save(`Historial_Completo_${patient.name}_${new Date().toISOString().split('T')[0]}.pdf`);
}
