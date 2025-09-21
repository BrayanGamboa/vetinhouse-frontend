import { useState, useRef, useEffect } from 'react';
import type { ChatMessage, WalkerData } from '../types/emergencia.types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  walkerData: WalkerData;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export default function ChatModal({ isOpen, onClose, walkerData, messages, onSendMessage }: ChatModalProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [isWalkerTyping, setIsWalkerTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset typing indicator when new message from walker arrives
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === 'received') {
        setIsWalkerTyping(false);
      }
    }
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle walker typing simulation when user sends a message
  const handleSendWithTyping = (message: string) => {
    // Send user message immediately
    onSendMessage(message);
    
    // Start walker typing indicator after a short delay
    setTimeout(() => {
      setIsWalkerTyping(true);
      
      // Stop typing and send walker response after 2-4 seconds
      const typingDuration = Math.random() * 2000 + 2000; // 2-4 seconds
      setTimeout(() => {
        setIsWalkerTyping(false);
        // The actual walker response will be handled by the parent component
      }, typingDuration);
    }, 500); // Small delay before walker starts typing
  };

  if (!isOpen) return null;

  const handleSend = () => {
    if (inputMessage.trim()) {
      handleSendWithTyping(inputMessage.trim());
      setInputMessage('');
      setShowQuickReplies(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleQuickReply = (reply: string) => {
    handleSendWithTyping(reply);
    setShowQuickReplies(false);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simular grabación de audio
      setTimeout(() => {
        setIsRecording(false);
        handleSendWithTyping('🎤 Mensaje de voz enviado');
      }, 3000);
    }
  };

  const quickReplies = [
    "¿Cómo está Max?",
    "¿Dónde están ahora?",
    "Perfecto, gracias",
    "¿Todo bien?",
    "Llamame cuando puedas",
    "¿Cuánto falta?"
  ];

  const emojis = ["😊", "👍", "❤️", "😂", "🐕", "🦴", "🏃‍♂️", "📍", "⭐", "🙏"];

  const getMessageStatus = (index: number) => {
    // Simular estados de mensaje
    if (index === messages.length - 1) return 'read';
    if (index >= messages.length - 3) return 'delivered';
    return 'sent';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center modal-overlay p-4 z-[9999]">
      <div className="bg-white rounded-3xl w-full max-w-lg h-[700px] flex flex-col emergency-modal shadow-2xl animate-scaleIn overflow-hidden">
        
        {/* Header mejorado */}
        <div className="bg-gradient-to-r from-green-500 via-green-600 to-green-500 text-white p-6 relative overflow-hidden">
          {/* Efectos de fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          
          <div className="relative flex justify-between items-center">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white/50 shadow-lg bg-white">
                  <img 
                    src={walkerData.image}
                    alt={walkerData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Indicador de estado mejorado */}
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-3 border-white ${
                  walkerData.isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                }`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg drop-shadow-sm truncate">{walkerData.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${walkerData.isOnline ? 'text-green-200' : 'text-red-200'}`}>
                    {walkerData.isOnline ? 'En línea' : 'Sin conexión'}
                  </span>
                  {isWalkerTyping && walkerData.isOnline && (
                    <div className="flex items-center gap-1 text-green-200 text-xs">
                      <span>escribiendo</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-green-200 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-green-200 rounded-full animate-bounce delay-100"></div>
                        <div className="w-1 h-1 bg-green-200 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 flex-shrink-0">
              <button className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110">
                <i className="fas fa-phone text-lg"></i>
              </button>
              <button className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110">
                <i className="fas fa-video text-lg"></i>
              </button>
              <button 
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Messages mejorado */}
        <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-gray-50 to-white custom-scrollbar">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start pl-12'} animate-fadeInUp`}>
                <div className={`max-w-[80%] relative group ${message.type === 'sent' ? 'order-2' : 'order-1'}`}>
                  
                  {/* Avatar para mensajes recibidos */}
                  {message.type === 'received' && (
                    <div className="absolute -left-10 bottom-0">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                        <img 
                          src={walkerData.image} 
                          alt={walkerData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className={`p-4 rounded-3xl relative overflow-hidden ${
                    message.type === 'sent' 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-lg shadow-lg' 
                      : 'bg-white text-gray-800 rounded-bl-lg shadow-md border border-gray-100'
                  }`}>
                    
                    {/* Efecto de brillo en mensajes enviados */}
                    {message.type === 'sent' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    )}
                    
                    <div className="relative">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      {/* Timestamp y estado */}
                      <div className={`flex items-center gap-2 mt-2 text-xs ${
                        message.type === 'sent' ? 'text-green-100 justify-end' : 'text-gray-500'
                      }`}>
                        <span>{message.time}</span>
                        
                        {/* Indicadores de estado para mensajes enviados */}
                        {message.type === 'sent' && (
                          <div className="flex">
                            {getMessageStatus(index) === 'sent' && (
                              <i className="fas fa-check text-xs opacity-70"></i>
                            )}
                            {getMessageStatus(index) === 'delivered' && (
                              <i className="fas fa-check-double text-xs opacity-70"></i>
                            )}
                            {getMessageStatus(index) === 'read' && (
                              <i className="fas fa-check-double text-blue-200 text-xs"></i>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Indicador de escritura */}
            {isWalkerTyping && walkerData.isOnline && (
              <div className="flex justify-start pl-12 animate-fadeInUp">
                <div className="relative">
                  {/* Avatar del paseador escribiendo */}
                  <div className="absolute -left-10 bottom-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                      <img 
                        src={walkerData.image} 
                        alt={walkerData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gray-200 p-4 rounded-3xl rounded-bl-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Respuestas rápidas */}
        {showQuickReplies && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-2 bg-white hover:bg-green-500 hover:text-white text-gray-600 text-sm rounded-full border border-gray-200 transition-all duration-300 hover:scale-105"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selector de emojis */}
        {showEmojiPicker && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="p-2 hover:bg-white rounded-lg transition-colors duration-200 text-xl hover:scale-125 transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input mejorado */}
        <div className="p-6 bg-white border-t border-gray-100">
          {/* Barra de herramientas */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setShowQuickReplies(!showQuickReplies)}
              className={`p-2 rounded-full transition-all duration-300 ${
                showQuickReplies ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <i className="fas fa-bolt text-sm"></i>
            </button>
            
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`p-2 rounded-full transition-all duration-300 ${
                showEmojiPicker ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <i className="fas fa-smile text-sm"></i>
            </button>
            
            <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors duration-300">
              <i className="fas fa-paperclip text-sm"></i>
            </button>
            
            <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors duration-300">
              <i className="fas fa-camera text-sm"></i>
            </button>
          </div>
          
          {/* Campo de entrada */}
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe un mensaje..."
                rows={1}
                className="w-full p-4 pr-12 border-2 border-gray-200 rounded-2xl outline-none focus:border-green-500 transition-all duration-300 resize-none max-h-32 bg-gray-50 focus:bg-white"
                style={{ 
                  minHeight: '52px',
                  height: inputMessage.length > 50 ? 'auto' : '52px'
                }}
              />
              
              {/* Contador de caracteres */}
              {inputMessage.length > 100 && (
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {inputMessage.length}/500
                </div>
              )}
            </div>
            
            {/* Botón de envío / grabación */}
            {inputMessage.trim() ? (
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-2xl transition-all duration-300 w-14 h-14 flex items-center justify-center hover:scale-110 shadow-lg hover:shadow-green-500/30"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            ) : (
              <button
                onClick={toggleRecording}
                className={`p-4 rounded-2xl transition-all duration-300 w-14 h-14 flex items-center justify-center hover:scale-110 shadow-lg ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                }`}
              >
                <i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone'}`}></i>
              </button>
            )}
          </div>
          
          {/* Indicador de grabación */}
          {isRecording && (
            <div className="mt-3 flex items-center justify-center gap-2 text-red-500 text-sm animate-fadeInUp">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Grabando mensaje de voz...</span>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-red-500 rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 10 + 5}px`,
                      animationDelay: `${i * 100}ms`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}