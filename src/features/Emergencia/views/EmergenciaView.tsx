import { useState } from 'react';
import { useEmergencia } from '../hooks/useEmergencia';
import Loader from '../components/Loader';
import EmergenciaHeader from '../components/EmergenciaHeader';
import EmergencyStatus from '../components/EmergencyStatus';
import WalkInfo from '../components/WalkInfo';
import MapSection from '../components/MapSection';
import ActionButtons from '../components/ActionButtons';
import ChatModal from '../components/ChatModal';
import CallModal from '../components/CallModal';
import EmergencyModal from '../components/EmergencyModal';
import EmergencyTypeModal from '../components/EmergencyTypeModal';
import ReportEmergencyModal from '../components/ReportEmergencyModal';
import ReportProblemModal from '../components/ReportProblemModal';
import ContactVetModal from '../components/ContactVetModal';
import EmergencyAlert from '../components/EmergencyAlert';

// Definir tipos de problemas
const PROBLEM_TYPES = {
  behavior: { title: 'Comportamiento de la Mascota' },
  walker: { title: 'Problema con el Paseador' },
  route: { title: 'Problema de Ruta' },
  safety: { title: 'Seguridad' },
  weather: { title: 'Condiciones Climáticas' },
  other: { title: 'Otro Problema' }
};

export default function EmergenciaView() {
  const {
    isLoading,
    isEmergencyActive,
    currentEmergencyType,
    emergencyTimer,
    walkTime,
    walkerData,
    petData,
    emergencyTypes,
    chatMessages,
    unreadCount,
    triggerEmergency,
    cancelEmergency,
    sendMessage,
    resetUnreadCount,
    handleLogout
  } = useEmergencia();

  const [showChat, setShowChat] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showEmergencyTypeModal, setShowEmergencyTypeModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReportProblemModal, setShowReportProblemModal] = useState(false);
  const [showContactVetModal, setShowContactVetModal] = useState(false);
  const [alert, setAlert] = useState<{
    isVisible: boolean;
    type: 'success' | 'warning' | 'error' | 'info';
    title: string;
    message: string;
  }>({
    isVisible: false,
    type: 'info',
    title: '',
    message: ''
  });

  const showAlert = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    setAlert({
      isVisible: true,
      type,
      title,
      message
    });
  };

  const handleTriggerEmergency = () => {
    setShowReportModal(true);
  };

  const handleReportEmergency = (type: string, description: string, priority: 'low' | 'medium' | 'high') => {
    // Simulación de envío exitoso
    showAlert(
      'success',
      'Emergencia Reportada',
      `Tu reporte ha sido enviado exitosamente. Nuestro equipo de emergencias ha sido notificado y se pondrá en contacto contigo inmediatamente.`
    );

    // Activar una emergencia simulada basada en el reporte
    triggerEmergency('reporte-manual');
    
    // Opcional: Mostrar el modal de emergencia después de un breve delay
    setTimeout(() => {
      setShowEmergencyModal(true);
    }, 2000);
  };

  const handleSimulateEmergency = () => {
    setShowEmergencyTypeModal(true);
  };

  const handleSelectEmergencyType = (type: string) => {
    triggerEmergency(type);
    setShowEmergencyModal(true);
    showAlert(
      'warning',
      'Emergencia Simulada Activada',
      `Se ha activado una simulación de emergencia: ${emergencyTypes[type]?.title || type}. Esto es solo una prueba.`
    );
  };

  const handleStopEmergency = () => {
    cancelEmergency();
    setShowEmergencyModal(false);
    showAlert(
      'success',
      'Emergencia Finalizada',
      'La emergencia ha sido finalizada exitosamente. El seguimiento normal ha sido restablecido.'
    );
  };

  const handleCancelEmergency = () => {
    cancelEmergency();
    setShowEmergencyModal(false);
    showAlert(
      'info',
      'Emergencia Cancelada',
      'La alerta de emergencia ha sido cancelada. El seguimiento normal se ha restablecido.'
    );
  };

  const handleOpenChat = () => {
    setShowChat(true);
    resetUnreadCount();
  };

  const handleCallWalker = () => {
    if (!walkerData.isOnline) {
      showAlert(
        'error',
        'Paseador No Disponible',
        'El paseador no contesta la llamada. Se han enviado notificaciones adicionales y se ha alertado a nuestro equipo de soporte.'
      );
    } else {
      setShowCallModal(true);
    }
  };

  const handleReport = () => {
    setShowReportProblemModal(true);
  };

  const handleContactVet = () => {
    setShowContactVetModal(true);
  };

  const handleReportProblem = (data: any) => {
    showAlert(
      'success',
      'Reporte Enviado',
      `Tu reporte de ${PROBLEM_TYPES[data.type as keyof typeof PROBLEM_TYPES]?.title || 'problema'} ha sido enviado exitosamente. Nuestro equipo lo revisará y se pondrá en contacto contigo pronto.`
    );
    setShowReportProblemModal(false);
  };

  const handleContactVetSubmit = (data: any) => {
    const urgencyText = data.urgency === 'emergency' ? 'emergencia' : data.urgency === 'urgent' ? 'urgente' : 'rutina';
    showAlert(
      data.urgency === 'emergency' ? 'error' : data.urgency === 'urgent' ? 'warning' : 'success',
      'Veterinario Contactado',
      `Tu consulta ${urgencyText} ha sido enviada. Un veterinario especializado te contactará a través de ${data.contactMethod === 'video' ? 'videollamada' : data.contactMethod === 'call' ? 'llamada' : 'chat'} en breve.`
    );
    setShowContactVetModal(false);
  };

  const handleEmergencyCall = () => {
    showAlert(
      'warning',
      'Servicios de Emergencia',
      'Conectando con servicios de emergencia locales. Mantén la calma y espera instrucciones del operador.'
    );
  };

  const currentEmergency = currentEmergencyType ? emergencyTypes[currentEmergencyType] : undefined;

  return (
    <>
      <Loader isVisible={isLoading} />
      
      {/* Alerta flotante */}
      <EmergencyAlert
        isVisible={alert.isVisible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={() => setAlert(prev => ({ ...prev, isVisible: false }))}
      />
      
      {!isLoading && (
        <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
          {/* Elementos flotantes */}
          <div className="fixed w-full h-full pointer-events-none z-0">
            <i className="fas fa-paw absolute text-green-100 text-2xl animate-[float_20s_linear_infinite]" style={{top: '10%', left: '10%'}}></i>
            <i className="fas fa-heart absolute text-green-100 text-lg animate-[float_15s_linear_infinite]" style={{top: '20%', left: '80%', animationDelay: '2s'}}></i>
            <i className="fas fa-shield-alt absolute text-green-100 text-3xl animate-[float_18s_linear_infinite]" style={{top: '60%', left: '30%', animationDelay: '5s'}}></i>
            <i className="fas fa-location-dot absolute text-green-100 text-xl animate-[float_22s_linear_infinite]" style={{top: '80%', left: '70%', animationDelay: '8s'}}></i>
            <i className="fas fa-phone absolute text-green-100 text-2xl animate-[float_25s_linear_infinite]" style={{top: '40%', left: '50%', animationDelay: '10s'}}></i>
          </div>

          <EmergenciaHeader onLogout={handleLogout} />
          
          <EmergencyStatus 
            isEmergencyActive={isEmergencyActive}
            currentEmergency={currentEmergency}
            onTriggerEmergency={handleTriggerEmergency}
            onSimulateEmergency={handleSimulateEmergency}
            onStopEmergency={handleStopEmergency}
          />
          
          <WalkInfo 
            walkerData={walkerData}
            petData={petData}
            walkTime={walkTime}
            isEmergencyActive={isEmergencyActive}
          />
          
          <MapSection isEmergencyActive={isEmergencyActive} />
          
          <ActionButtons 
            unreadCount={unreadCount}
            walkerData={walkerData}
            onCallWalker={handleCallWalker}
            onOpenChat={handleOpenChat}
            onReport={handleReport}
            onContactVet={handleContactVet}
          />

          {/* Modales */}
          <ChatModal 
            isOpen={showChat}
            onClose={() => setShowChat(false)}
            walkerData={walkerData}
            messages={chatMessages}
            onSendMessage={sendMessage}
          />

          <CallModal 
            isOpen={showCallModal}
            onClose={() => setShowCallModal(false)}
            walkerData={walkerData}
          />

          <EmergencyModal 
            isOpen={showEmergencyModal}
            emergency={currentEmergency ?? null}
            emergencyTimer={emergencyTimer}
            onCancel={handleCancelEmergency}
            onEmergencyCall={handleEmergencyCall}
          />

          <EmergencyTypeModal 
            isOpen={showEmergencyTypeModal}
            onClose={() => setShowEmergencyTypeModal(false)}
            emergencyTypes={emergencyTypes}
            onSelectType={handleSelectEmergencyType}
          />

          <ReportEmergencyModal
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
            onReport={handleReportEmergency}
          />

          <ReportProblemModal
            isOpen={showReportProblemModal}
            onClose={() => setShowReportProblemModal(false)}
            onReport={handleReportProblem}
          />

          <ContactVetModal
            isOpen={showContactVetModal}
            onClose={() => setShowContactVetModal(false)}
            onContact={handleContactVetSubmit}
          />
        </div>
      )}
    </>
  );
}