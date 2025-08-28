import { useState } from 'react';
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

  if (!isOpen) return null;

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-green-500 text-white p-5 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src={walkerData.image}
              alt={walkerData.name}
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="font-semibold">{walkerData.name}</h3>
              <span className={`text-sm ${walkerData.isOnline ? 'text-green-200' : 'text-red-200'}`}>
                {walkerData.isOnline ? 'En línea' : 'Sin conexión'}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors duration-300">
              <i className="fas fa-phone"></i>
            </button>
            <button 
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors duration-300"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-5 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-2xl ${
                  message.type === 'sent' 
                    ? 'bg-green-500 text-white rounded-br-sm' 
                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <span className={`text-xs mt-1 block ${
                    message.type === 'sent' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-5 bg-white rounded-b-2xl border-t border-gray-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              className="flex-1 p-3 border-2 border-gray-200 rounded-full outline-none focus:border-green-500 transition-colors duration-300"
            />
            <button
              onClick={handleSend}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors duration-300 w-12 h-12 flex items-center justify-center"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}