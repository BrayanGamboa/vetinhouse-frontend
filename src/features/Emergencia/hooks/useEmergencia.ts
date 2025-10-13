import { useState, useEffect, useRef } from 'react';
import type { EmergencyType, WalkerData, PetData, ChatMessage } from '../types/emergencia.types';

export const useEmergencia = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [currentEmergencyType, setCurrentEmergencyType] = useState<string | null>(null);
  const [emergencyTimer, setEmergencyTimer] = useState('00:00');
  const [walkTime, setWalkTime] = useState('00:00');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(3);
  const walkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const emergencyIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [walkerData, setWalkerData] = useState<WalkerData>({
    name: "Carlos Mendoza",
    rating: 4.8,
    reviews: 127,
    phone: "+57 300 123-4567",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    isOnline: true
  });

  const petData: PetData = {
    name: "Max",
    breed: "Golden Retriever",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop&crop=face",
    heartRate: "Normal",
    activity: "Activo"
  };

  const emergencyTypes: Record<string, EmergencyType> = {
    'ruta-incorrecta': {
      id: 'ruta-incorrecta',
      title: 'Desviación de Ruta',
      description: 'El paseador se ha desviado significativamente de la ruta acordada',
      severity: 'medium',
      icon: 'fas fa-route',
      actions: [
        'Notificación enviada al paseador',
        'Alerta enviada a supervisión',
        'Ruta alternativa calculada'
      ]
    },
    'comportamiento-sospechoso': {
      id: 'comportamiento-sospechoso',
      title: 'Comportamiento Sospechoso',
      description: 'Se ha detectado actividad inusual en el comportamiento del paseador',
      severity: 'high',
      icon: 'fas fa-user-times',
      actions: [
        'Supervisión activada inmediatamente',
        'Grabación de audio iniciada',
        'Paseador de respaldo contactado'
      ]
    },
    'mascota-perdida': {
      id: 'mascota-perdida',
      title: 'Mascota Extraviada',
      description: 'No se puede localizar a la mascota en el área del paseador',
      severity: 'high',
      icon: 'fas fa-search',
      actions: [
        'Búsqueda inmediata activada',
        'Policía local notificada',
        'Equipo de rescate en camino'
      ]
    }
  };

  useEffect(() => {
    // Simular carga inicial
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Inicializar mensajes de chat
    setChatMessages([
      {
        type: 'received',
        content: '¡Hola! Acabo de recoger a Max. Está muy emocionado por el paseo 🐕',
        time: '14:30'
      },
      {
        type: 'received',
        content: 'Vamos hacia el Parque El Poblado como acordamos',
        time: '14:32'
      },
      {
        type: 'received',
        content: 'Max está jugando muy bien con otros perros',
        time: '14:45'
      }
    ]);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  // Timer del paseo separado
  useEffect(() => {
    const walkStartTime = Date.now();
    walkIntervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - walkStartTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      setWalkTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} min`);
    }, 1000);

    return () => {
      if (walkIntervalRef.current) {
        clearInterval(walkIntervalRef.current as any);
      }
    };
  }, []);

  const triggerEmergency = (type: string) => {
    if (isEmergencyActive) return;

    setCurrentEmergencyType(type);
    setIsEmergencyActive(true);
    
    // Simular comportamientos específicos
    if (type === 'falta-comunicacion') {
      setWalkerData(prev => ({ ...prev, isOnline: false }));
    }
  };

  // Timer de emergencia separado
  useEffect(() => {
    if (isEmergencyActive) {
      const startTime = Date.now();
      emergencyIntervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        setEmergencyTimer(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);
    } else {
      if (emergencyIntervalRef.current) {
        clearInterval(emergencyIntervalRef.current as any);
        emergencyIntervalRef.current = null;
      }
    }

    return () => {
      if (emergencyIntervalRef.current) {
        clearInterval(emergencyIntervalRef.current as any);
      }
    };
  }, [isEmergencyActive]);

  const cancelEmergency = () => {
    setIsEmergencyActive(false);
    setCurrentEmergencyType(null);
    setEmergencyTimer('00:00');
    
    // Limpiar timer de emergencia
    if (emergencyIntervalRef.current) {
      clearInterval(emergencyIntervalRef.current as any);
      emergencyIntervalRef.current = null;
    }
    
    // Restaurar estado del paseador
    setWalkerData(prev => ({ ...prev, isOnline: true }));
  };

  const sendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      type: 'sent',
      content: message,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    
    // Simular respuesta automática con delay más realista
    const responseDelay = Math.random() * 2000 + 2500; // 2.5-4.5 segundos para simular el typing
    setTimeout(() => {
      const responses = [
        "Entendido, gracias por el mensaje 👍",
        "Todo está bien por aquí! Max está genial 🐕",
        "Max está muy feliz corriendo en el parque ❤️",
        "Perfecto, seguimos con el paseo 🚶‍♂️",
        "Recibido! Te mantendré informado 📱",
        "Max dice hola! 🐾 Todo va excelente",
        "Estamos en el área verde, todo bajo control 🌳",
        "¡Max ha hecho muchos amigos aquí! 🐕‍🦺"
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      
      setChatMessages(prev => [...prev, {
        type: 'received',
        content: response,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, responseDelay);
  };

  const resetUnreadCount = () => {
    setUnreadCount(0);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  return {
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
  };
};