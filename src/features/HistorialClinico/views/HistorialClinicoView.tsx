import { useState } from 'react';
import { useMedicalHistory } from '../hooks/useMedicalHistory';
import { PatientCard } from '../components/PatientCard';
import { TimelineItem } from '../components/TimelineItem';
import { VaccineCard } from '../components/VaccineCard';
import { ConsultationCard } from '../components/ConsultationCard';
import { 
  generateHealthCertificate, 
  generatePrescription, 
  generateFullMedicalReport 
} from '../utils/pdfGenerator';

type TabType = 'resumen' | 'consultas' | 'vacunas' | 'examenes' | 'cirugias' | 'documentos';

export function HistorialClinicoView() {
  const {
    patients,
    selectedPatient,
    setSelectedPatient,
    currentPatient,
    vaccines,
    consultations,
    labTests,
    surgeries,
    // dewormings,
    certificates,
    prescriptions,
    medicalNotes,
    // growthRecords,
    timeline
  } = useMedicalHistory();

  const [activeTab, setActiveTab] = useState<TabType>('resumen');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'resumen', label: 'Resumen', icon: 'fa-home' },
    { id: 'consultas', label: 'Consultas', icon: 'fa-stethoscope', count: consultations.length },
    { id: 'vacunas', label: 'Vacunas', icon: 'fa-syringe', count: vaccines.length },
    { id: 'examenes', label: 'Exámenes', icon: 'fa-flask', count: labTests.length },
    { id: 'cirugias', label: 'Cirugías', icon: 'fa-procedures', count: surgeries.length },
    { id: 'documentos', label: 'Documentos', icon: 'fa-file-medical', count: certificates.length + prescriptions.length }
  ];

  if (!currentPatient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-paw text-6xl text-blue-300 mb-4"></i>
          <p className="text-gray-600">No hay pacientes registrados</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <i className="fas fa-file-medical-alt text-blue-600"></i>
                Historial Clínico
              </h1>
              <p className="text-gray-600 mt-1">Registro médico completo y certificados</p>
            </div>

            {/* Selector de paciente */}
            {patients.length > 1 && (
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Paciente:</label>
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - {patient.species}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Información del paciente */}
        <div className="mb-8">
          <PatientCard patient={currentPatient} />
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex-1 min-w-fit px-6 py-4 font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white border-b-4 border-blue-800'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className={`fas ${tab.icon}`}></i>
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Barra de búsqueda */}
        {activeTab !== 'resumen' && (
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="relative">
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder={`Buscar en ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Contenido según el tab activo */}
        <div className="space-y-6">
          {/* TAB: RESUMEN */}
          {activeTab === 'resumen' && (
            <div>
              {/* Estadísticas rápidas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-500 text-sm mb-1">Consultas</div>
                      <div className="text-3xl font-bold text-blue-600">{consultations.length}</div>
                    </div>
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-stethoscope text-2xl text-blue-600"></i>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-500 text-sm mb-1">Vacunas</div>
                      <div className="text-3xl font-bold text-green-600">{vaccines.length}</div>
                    </div>
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-syringe text-2xl text-green-600"></i>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-500 text-sm mb-1">Exámenes</div>
                      <div className="text-3xl font-bold text-purple-600">{labTests.length}</div>
                    </div>
                    <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-flask text-2xl text-purple-600"></i>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-500 text-sm mb-1">Cirugías</div>
                      <div className="text-3xl font-bold text-orange-600">{surgeries.length}</div>
                    </div>
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-procedures text-2xl text-orange-600"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exportar Historial Completo */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-md p-6 mb-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                      <i className="fas fa-file-pdf text-red-600 text-xl"></i>
                      Historial Médico Completo
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Descarga un informe completo en PDF con todas las consultas, vacunas, exámenes de laboratorio y cirugías.
                    </p>
                  </div>
                  <button
                    onClick={() => generateFullMedicalReport(
                      currentPatient,
                      consultations,
                      vaccines,
                      labTests,
                      surgeries
                    )}
                    className="ml-6 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                  >
                    <i className="fas fa-download"></i>
                    Exportar Historial
                  </button>
                </div>
              </div>

              {/* Alertas y Notas importantes */}
              {medicalNotes.filter(n => n.priority === 'Alta' || n.priority === 'Urgente').length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <i className="fas fa-exclamation-triangle text-red-600"></i>
                    Alertas Importantes
                  </h3>
                  <div className="space-y-3">
                    {medicalNotes
                      .filter(n => n.priority === 'Alta' || n.priority === 'Urgente')
                      .map((note) => (
                        <div key={note.id} className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-semibold text-red-900">{note.title}</div>
                              <p className="text-sm text-red-700 mt-1">{note.content}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-red-600">
                                <span>{note.author}</span>
                                <span>{note.date.toLocaleDateString('es-ES')}</span>
                              </div>
                            </div>
                            <span className="px-2 py-1 bg-red-200 text-red-800 rounded text-xs font-bold">
                              {note.priority}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                  <i className="fas fa-history text-blue-600"></i>
                  Historial Médico Completo
                </h3>
                <div className="space-y-2">
                  {timeline.slice(0, 10).map((event) => (
                    <TimelineItem key={event.id} event={event} />
                  ))}
                </div>
                {timeline.length > 10 && (
                  <div className="text-center mt-6">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Ver todos los {timeline.length} eventos
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: CONSULTAS */}
          {activeTab === 'consultas' && (
            <div className="grid grid-cols-1 gap-6">
              {consultations
                .filter(c => !searchTerm || 
                  c.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  c.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  c.veterinarian.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((consultation) => (
                  <ConsultationCard key={consultation.id} consultation={consultation} />
                ))}
              {consultations.length === 0 && (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <i className="fas fa-stethoscope text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-600">No hay consultas registradas</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: VACUNAS */}
          {activeTab === 'vacunas' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vaccines
                .filter(v => !searchTerm || 
                  v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  v.type.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((vaccine) => (
                  <VaccineCard 
                    key={vaccine.id} 
                    vaccine={vaccine}
                    patient={currentPatient}
                  />
                ))}
              {vaccines.length === 0 && (
                <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
                  <i className="fas fa-syringe text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-600">No hay vacunas registradas</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: EXÁMENES */}
          {activeTab === 'examenes' && (
            <div className="space-y-6">
              {labTests
                .filter(l => !searchTerm || 
                  l.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  l.type.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((test) => (
                  <div key={test.id} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-flask text-purple-600 text-xl"></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{test.testName}</h3>
                          <p className="text-sm text-gray-600">{test.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Fecha</div>
                        <div className="font-semibold text-gray-900">
                          {test.date.toLocaleDateString('es-ES')}
                        </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto mb-4">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Parámetro</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Valor</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Rango Referencia</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {test.results.map((result, idx) => (
                            <tr key={idx} className="border-t border-gray-200">
                              <td className="px-4 py-2 text-sm text-gray-900">{result.parameter}</td>
                              <td className="px-4 py-2 text-sm font-semibold text-gray-900">
                                {result.value} {result.unit}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-600">{result.referenceRange}</td>
                              <td className="px-4 py-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  result.status === 'Normal' ? 'bg-green-100 text-green-800' :
                                  result.status === 'Alto' || result.status === 'Bajo' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {result.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="text-xs text-blue-800 font-semibold mb-1">Interpretación</div>
                      <p className="text-sm text-blue-900">{test.interpretation}</p>
                    </div>
                  </div>
                ))}
              {labTests.length === 0 && (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <i className="fas fa-flask text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-600">No hay exámenes de laboratorio registrados</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: CIRUGÍAS */}
          {activeTab === 'cirugias' && (
            <div className="space-y-6">
              {surgeries
                .filter(s => !searchTerm || 
                  s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  s.type.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((surgery) => (
                  <div key={surgery.id} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-procedures text-orange-600 text-2xl"></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-gray-900">{surgery.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-600">{surgery.type}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              surgery.status === 'Completada' ? 'bg-green-100 text-green-800' :
                              surgery.status === 'Programada' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {surgery.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Fecha</div>
                        <div className="font-semibold text-gray-900">
                          {surgery.date.toLocaleDateString('es-ES')}
                        </div>
                        <div className="text-xl font-bold text-orange-600 mt-1">
                          ${surgery.cost.toLocaleString('es-CO')}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6">{surgery.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                          <i className="fas fa-clipboard-list"></i>
                          Pre-Operatorio
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <i className={`fas fa-${surgery.preOperative.fasting ? 'check' : 'times'} text-xs`}></i>
                            Ayuno
                          </li>
                          <li className="flex items-center gap-2">
                            <i className={`fas fa-${surgery.preOperative.authorization ? 'check' : 'times'} text-xs`}></i>
                            Autorización firmada
                          </li>
                        </ul>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                          <i className="fas fa-cut"></i>
                          Procedimiento
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Anestesia:</span>
                            <div className="font-medium">{surgery.procedure.anesthesia}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Duración:</span>
                            <div className="font-medium">{surgery.procedure.duration} min</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                          <i className="fas fa-notes-medical"></i>
                          Post-Operatorio
                        </h4>
                        <div className="text-sm">
                          <div className="font-medium">{surgery.postOperative.recovery}</div>
                          {surgery.postOperative.sutures && (
                            <div className="mt-2 text-xs text-gray-600">
                              Retiro suturas: {surgery.postOperative.sutures.removalDate.toLocaleDateString('es-ES')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Equipo Quirúrgico</h4>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Cirujano Principal:</span>
                          <span className="font-medium ml-2">{surgery.surgeons.main}</span>
                        </div>
                        {surgery.surgeons.assistant && (
                          <div>
                            <span className="text-gray-600">Asistente:</span>
                            <span className="font-medium ml-2">{surgery.surgeons.assistant}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-600">Anestesiólogo:</span>
                          <span className="font-medium ml-2">{surgery.surgeons.anesthesiologist}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {surgeries.length === 0 && (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <i className="fas fa-procedures text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-600">No hay cirugías registradas</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: DOCUMENTOS */}
          {activeTab === 'documentos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Certificados */}
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-white rounded-xl shadow-md p-6 border-2 border-green-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <i className="fas fa-certificate text-green-600 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">Certificado de {cert.type}</h3>
                        <p className="text-sm text-gray-600">{cert.purpose}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emisión:</span>
                      <span className="font-medium">{cert.issueDate.toLocaleDateString('es-ES')}</span>
                    </div>
                    {cert.expiryDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vence:</span>
                        <span className="font-medium">{cert.expiryDate.toLocaleDateString('es-ES')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nº Certificado:</span>
                      <span className="font-mono font-medium text-xs">{cert.certificationNumber}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => generateHealthCertificate(currentPatient, cert)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-file-pdf"></i>
                    Descargar Certificado
                  </button>
                </div>
              ))}

              {/* Recetas */}
              {prescriptions.map((rx) => (
                <div key={rx.id} className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="fas fa-prescription text-blue-600 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">Receta Médica</h3>
                        <p className="text-sm text-gray-600">
                          {rx.date.toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {rx.medications.map((med, idx) => (
                      <div key={idx} className="bg-blue-50 rounded-lg p-3">
                        <div className="font-semibold text-gray-900">{med.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {med.dosage} - {med.frequency} por {med.duration}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      const consultation = consultations.find(c => c.id === rx.consultationId);
                      generatePrescription(currentPatient, rx, consultation);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-file-pdf"></i>
                    Descargar Receta
                  </button>
                </div>
              ))}

              {certificates.length === 0 && prescriptions.length === 0 && (
                <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
                  <i className="fas fa-file-medical text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-600">No hay documentos disponibles</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
