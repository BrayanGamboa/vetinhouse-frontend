import { useState, useEffect } from 'react';
import type { WalkerData } from '../types/emergencia.types';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  walkerData: WalkerData;
}

export default function CallModal({ isOpen, onClose, walkerData }: CallModalProps) {
  const [callStatus, setCallStatus] = useState<'calling' | 'connected' | 'ended'>('calling');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCallStatus('calling');
      setCallDuration(0);
      setIsMuted(false);
      setIsSpeakerOn(false);
      setIsVideoOn(false);
      return;
    }

    // Simular conexión de llamada después de 3 segundos
    const connectTimer = setTimeout(() => {
      setCallStatus('connected');
    }, 3000);

    return () => clearTimeout(connectTimer);
  }, [isOpen]);

  // Timer de duración de llamada
  useEffect(() => {
    if (callStatus === 'connected') {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center modal-overlay p-4 z-[9999]">
      <div className={`bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleIn ${
        callStatus === 'calling' ? 'animate-vibrate' : ''
      }`}>
        
        {/* Status bar superior */}
        <div className="bg-black/30 px-6 py-3 flex justify-between items-center text-white text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-medium">VetInHouse</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="fas fa-signal text-white"></i>
            <i className="fas fa-wifi text-white"></i>
            <i className="fas fa-battery-full text-white"></i>
          </div>
        </div>

        {/* Contenido principal de la llamada */}
        <div className="p-8 text-center text-white relative overflow-hidden">
          
          {/* Efectos de fondo animados */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-green-400/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>

          {/* Estado de llamada */}
          <div className="relative z-10 mb-8">
            {callStatus === 'calling' && (
              <div className="animate-fadeInUp">
                <p className="text-gray-300 text-sm font-medium mb-2">Llamando...</p>
                <div className="flex justify-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            {callStatus === 'connected' && (
              <div className="animate-fadeInUp">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-green-400 text-sm font-bold">Conectado</p>
                </div>
                <p className="text-gray-300 text-lg font-mono">{formatDuration(callDuration)}</p>
              </div>
            )}

            {callStatus === 'ended' && (
              <div className="animate-fadeInUp">
                <p className="text-red-400 text-sm font-medium">Llamada finalizada</p>
                <p className="text-gray-400 text-xs mt-1">Duración: {formatDuration(callDuration)}</p>
              </div>
            )}
          </div>

          {/* Foto y datos del paseador */}
          <div className="relative z-10 mb-8">
            <div className="relative inline-block">
              {/* Anillos de animación para llamada entrante */}
              {callStatus === 'calling' && (
                <>
                  <div className="absolute inset-0 rounded-full border-4 border-green-400/30 animate-ping scale-110"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-green-400/20 animate-ping scale-125 delay-300"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-green-400/10 animate-ping scale-140 delay-600"></div>
                </>
              )}
              
              {/* Foto del paseador */}
              <div className="relative w-36 h-36 mx-auto">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-white">
                  <img 
                    src={walkerData.image} 
                    alt={walkerData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Indicador de estado */}
                <div className={`absolute bottom-3 right-3 w-8 h-8 rounded-full border-4 border-gray-800 flex items-center justify-center ${
                  walkerData.isOnline ? 'bg-green-400' : 'bg-gray-400'
                }`}>
                  {walkerData.isOnline && callStatus === 'connected' && (
                    <i className="fas fa-microphone text-gray-800 text-sm"></i>
                  )}
                </div>
              </div>
            </div>

            {/* Información del paseador */}
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white">{walkerData.name}</h3>
              <p className="text-gray-300 text-sm">Paseador Profesional</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <i className="fas fa-star text-yellow-400 text-xs"></i>
                  <span className="text-sm text-gray-300">{walkerData.rating}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-300">{walkerData.reviews} reseñas</span>
              </div>
            </div>
          </div>

          {/* Controles de llamada */}
          {callStatus !== 'ended' && (
            <div className="relative z-10 flex justify-center items-center gap-6">
              
              {/* Mutear */}
              <button
                onClick={toggleMute}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                  isMuted 
                    ? 'bg-red-500 hover:bg-red-400' 
                    : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'} text-white text-xl`}></i>
              </button>

              {/* Colgar */}
              <button
                onClick={handleEndCall}
                className="w-16 h-16 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-red-500/50"
              >
                <i className="fas fa-phone-slash text-white text-xl transform rotate-135"></i>
              </button>

              {/* Altavoz */}
              <button
                onClick={toggleSpeaker}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                  isSpeakerOn 
                    ? 'bg-blue-500 hover:bg-blue-400' 
                    : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <i className={`fas ${isSpeakerOn ? 'fa-volume-up' : 'fa-volume-down'} text-white text-xl`}></i>
              </button>
            </div>
          )}

          {/* Controles adicionales (solo cuando está conectado) */}
          {callStatus === 'connected' && (
            <div className="relative z-10 flex justify-center items-center gap-4 mt-6">
              
              {/* Video */}
              <button
                onClick={toggleVideo}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                  isVideoOn 
                    ? 'bg-green-500 hover:bg-green-400' 
                    : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                <i className={`fas ${isVideoOn ? 'fa-video' : 'fa-video-slash'} text-white text-sm`}></i>
              </button>

              {/* Agregar persona */}
              <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <i className="fas fa-user-plus text-white text-sm"></i>
              </button>

              {/* Más opciones */}
              <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <i className="fas fa-ellipsis-h text-white text-sm"></i>
              </button>
            </div>
          )}

          {/* Notas de llamada */}
          {callStatus === 'connected' && (
            <div className="relative z-10 mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <p className="text-gray-300 text-xs leading-relaxed">
                📍 Llamada cifrada end-to-end<br/>
                🔒 Grabación automática para seguridad<br/>
                📋 Historial disponible en tu perfil
              </p>
            </div>
          )}
        </div>

        {/* Indicadores de estado audio */}
        {callStatus === 'connected' && (
          <div className="px-6 pb-4">
            <div className="flex justify-center gap-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-green-400 rounded-full transition-all duration-150 ${
                    !isMuted ? 'animate-pulse' : 'opacity-30'
                  }`}
                  style={{
                    height: `${Math.random() * 20 + 5}px`,
                    animationDelay: `${i * 100}ms`
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
