import { useEffect, useState } from 'react';

interface EmergencyAlertProps {
  isVisible: boolean;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function EmergencyAlert({ 
  isVisible, 
  type, 
  title, 
  message, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: EmergencyAlertProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, autoClose, duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isVisible && !isAnimating) return null;

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-green-600',
          icon: 'fas fa-check-circle',
          border: 'border-green-400',
          pulse: 'bg-green-400/30'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-orange-500 to-orange-600',
          icon: 'fas fa-exclamation-triangle',
          border: 'border-orange-400',
          pulse: 'bg-orange-400/30'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-red-600',
          icon: 'fas fa-exclamation-circle',
          border: 'border-red-400',
          pulse: 'bg-red-400/30'
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
          icon: 'fas fa-info-circle',
          border: 'border-blue-400',
          pulse: 'bg-blue-400/30'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-500 to-gray-600',
          icon: 'fas fa-bell',
          border: 'border-gray-400',
          pulse: 'bg-gray-400/30'
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 emergency-alert transition-all duration-500 z-[10000] ${
      isAnimating ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95'
    }`}>
      <div className={`${styles.bg} text-white rounded-2xl shadow-2xl border-2 ${styles.border} max-w-md w-full mx-4 overflow-hidden relative`}>
        
        {/* Efecto de pulso de fondo */}
        <div className={`absolute inset-0 ${styles.pulse} animate-pulse`}></div>
        
        {/* Contenido principal */}
        <div className="relative p-6">
          <div className="flex items-start gap-4">
            
            {/* Icono animado */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className={`${styles.icon} text-xl ${type === 'success' ? 'animate-bounce' : type === 'error' ? 'animate-pulse' : 'animate-ping'}`}></i>
              </div>
            </div>
            
            {/* Texto */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg mb-1 leading-tight">{title}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{message}</p>
            </div>
            
            {/* Botón de cerrar */}
            <button 
              onClick={handleClose}
              className="flex-shrink-0 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200 hover:scale-110"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
          
          {/* Barra de progreso para auto-close */}
          {autoClose && (
            <div className="mt-4">
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white/60 rounded-full"
                  style={{
                    animation: `progressBar ${duration}ms linear forwards`,
                    width: '100%'
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Efectos decorativos */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}
