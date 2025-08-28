import { useState } from 'react';
import { useEmergencia } from '../hooks/useEmergencia';
import Loader from '../components/Loader';
import EmergenciaHeader from '../components/EmergenciaHeader';
import EmergencyStatus from '../components/EmergencyStatus';
import WalkInfo from '../components/WalkInfo';
import MapSection from '../components/MapSection';
import ActionButtons from '../components/ActionButtons';
import ChatModal from '../components/ChatModal';
import EmergencyModal from '../components/EmergencyModal';
import EmergencyTypeModal from '../components/EmergencyTypeModal';

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
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showEmergencyTypeModal, setShowEmergencyTypeModal] = useState(false);

  const handleTriggerEmergency = () => {
    // Simular reporte manual
    alert('Función de reporte manual - En desarrollo');
  };

  const handleSimulateEmergency = () => {
    setShowEmergencyTypeModal(true);
  };

  const handleSelectEmergencyType = (type: string) => {
    triggerEmergency(type);
    setShowEmergencyModal(true);
  };

  const handleCancelEmergency = () => {
    cancelEmergency();
    setShowEmergencyModal(false);
  };

  const handleOpenChat = () => {
    setShowChat(true);
    resetUnreadCount();
  };

  const handleCallWalker = () => {
    if (!walkerData.isOnline) {
      alert('Sin respuesta: El paseador no contesta la llamada');
    } else {
      alert(`Llamando a ${walkerData.name}...`);
    }
  };

  const handleReport = () => {
    alert('Función de reporte - En desarrollo');
  };

  const handleContactVet = () => {
    alert('Contactando veterinario de emergencia...');
  };

  const handleEmergencyCall = () => {
    alert('Conectando con servicios de emergencia...');
  };

  const currentEmergency = currentEmergencyType ? emergencyTypes[currentEmergencyType] : undefined;

  return (
    <>
      <Loader isVisible={isLoading} />
      
      {!isLoading && (
        <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
          {/* Elementos flotantes */}
          <div className="fixed w-full h-full pointer-events-none -z-10">
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

          <EmergencyModal 
            isOpen={showEmergencyModal}
            emergency={currentEmergency}
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
        </div>
      )}
    </>
  );
}