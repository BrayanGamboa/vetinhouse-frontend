import React from 'react';

interface DocumentType {
  id: number;
  name: string;
  description?: string;
}

interface DocumentTypeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTypes: DocumentType[];
  selectedId: number;
  onSelect: (id: number, name: string) => void;
  position?: { top: string; left: string };
}

const DocumentTypeSelectorModal: React.FC<DocumentTypeSelectorModalProps> = ({
  isOpen,
  onClose,
  documentTypes,
  selectedId,
  onSelect,
  position = { top: '50%', left: '50%' }
}) => {
  if (!isOpen) return null;

  const handleSelect = (type: DocumentType) => {
    onSelect(type.id, type.name);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center animate-[fadeIn_0.3s_ease-out]"
      style={{
        alignItems: position.top === '50%' ? 'center' : 'flex-start',
        paddingTop: position.top !== '50%' ? '0' : undefined
      }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-[fadeIn_0.4s_ease-out]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-lg mx-4 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[25px] border border-white/20 rounded-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.3)] animate-[scaleInBounce_0.5s_ease-out] overflow-hidden"
        style={{
          position: position.top !== '50%' ? 'absolute' : 'relative',
          top: position.top !== '50%' ? position.top : 'auto',
          left: position.left,
          transform: position.top !== '50%' ? 'translateX(-50%)' : 'none',
          marginTop: position.top !== '50%' ? '-300px' : '0'
        }}
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4CAF50]/10 via-transparent to-[#FF9800]/10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4CAF50]/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#2196F3]/20 to-transparent rounded-full blur-xl"></div>
        
        {/* Header */}
        <div className="relative px-8 py-6 border-b border-white/15">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-2xl flex items-center justify-center shadow-[0_12px_24px_rgba(76,175,80,0.4)] animate-[pulse_3s_infinite]">
                <i className="fas fa-id-card text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white animate-[slideInLeft_0.6s_ease-out]">Tipo de Documento</h3>
                <p className="text-sm text-white/70 animate-[slideInLeft_0.7s_ease-out]">Selecciona tu tipo de identificación</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-400/40 rounded-xl flex items-center justify-center transition-all duration-300 text-white/70 hover:text-red-400 hover:scale-110 hover:rotate-90 group"
            >
              <i className="fas fa-times text-sm group-hover:text-base transition-all duration-300"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-8">
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {documentTypes.map((type, index) => (
              <button
                key={type.id}
                onClick={() => handleSelect(type)}
                className={`w-full p-5 rounded-2xl border transition-all duration-400 text-left group hover:scale-[1.03] animate-[slideInUp_${0.6 + index * 0.1}s_ease-out] hover:shadow-[0_15px_35px_rgba(76,175,80,0.3)] ${
                  selectedId === type.id
                    ? 'bg-gradient-to-r from-[#4CAF50]/25 to-[#45a049]/25 border-[#4CAF50]/50 shadow-[0_12px_30px_rgba(76,175,80,0.3)] ring-2 ring-[#4CAF50]/30'
                    : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-[0_15px_35px_rgba(255,255,255,0.1)]'
                }`}
              >
                <div className="flex items-center gap-5">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:rotate-3 ${
                    selectedId === type.id
                      ? 'bg-gradient-to-br from-[#4CAF50] to-[#45a049] shadow-[0_12px_24px_rgba(76,175,80,0.4)] animate-[pulse_2s_infinite]'
                      : 'bg-white/20 group-hover:bg-gradient-to-br group-hover:from-[#4CAF50]/80 group-hover:to-[#45a049]/80 group-hover:shadow-[0_8px_20px_rgba(76,175,80,0.4)]'
                  }`}>
                    {(type.name.toLowerCase().includes('cedula') || type.name.toLowerCase().includes('cédula')) && (
                      <i className={`fas fa-id-card text-2xl transition-all duration-400 ${selectedId === type.id ? 'text-white animate-[bounce_1s_infinite]' : 'text-white/80 group-hover:text-white group-hover:scale-110'}`}></i>
                    )}
                    {type.name.toLowerCase().includes('pasaporte') && (
                      <i className={`fas fa-passport text-2xl transition-all duration-400 ${selectedId === type.id ? 'text-white animate-[bounce_1s_infinite]' : 'text-white/80 group-hover:text-white group-hover:scale-110'}`}></i>
                    )}
                    {type.name.toLowerCase().includes('licencia') && (
                      <i className={`fas fa-id-badge text-2xl transition-all duration-400 ${selectedId === type.id ? 'text-white animate-[bounce_1s_infinite]' : 'text-white/80 group-hover:text-white group-hover:scale-110'}`}></i>
                    )}
                    {!type.name.toLowerCase().includes('cedula') && 
                     !type.name.toLowerCase().includes('cédula') &&
                     !type.name.toLowerCase().includes('pasaporte') && 
                     !type.name.toLowerCase().includes('licencia') && (
                      <i className={`fas fa-file-alt text-2xl transition-all duration-400 ${selectedId === type.id ? 'text-white animate-[bounce_1s_infinite]' : 'text-white/80 group-hover:text-white group-hover:scale-110'}`}></i>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className={`text-lg font-bold transition-all duration-300 ${
                      selectedId === type.id ? 'text-[#4CAF50]' : 'text-white/90 group-hover:text-[#4CAF50]'
                    }`}>
                      {type.name}
                    </div>
                    {type.description && (
                      <div className="text-sm text-white/60 mt-1 group-hover:text-white/80 transition-colors duration-300">
                        {type.description}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedId === type.id ? 'bg-[#4CAF50] animate-pulse' : 'bg-white/40'}`}></div>
                      <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors duration-300">
                        {selectedId === type.id ? 'Seleccionado' : 'Clic para seleccionar'}
                      </span>
                    </div>
                  </div>

                  {/* Check Icon */}
                  <div className={`transition-all duration-400 ${
                    selectedId === type.id ? 'opacity-100 scale-100 animate-[bounceIn_0.5s_ease-out]' : 'opacity-0 scale-50'
                  }`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-xl flex items-center justify-center shadow-[0_8px_20px_rgba(76,175,80,0.5)]">
                      <i className="fas fa-check text-white text-lg animate-[pulse_1s_infinite]"></i>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative px-8 py-6 border-t border-white/15 bg-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2196F3] to-[#1976D2] rounded-lg flex items-center justify-center animate-[pulse_2s_infinite]">
                <i className="fas fa-info text-white text-sm"></i>
              </div>
              <div className="text-sm text-white/70">
                <span className="font-medium text-white/90">{documentTypes.length}</span> opciones disponibles
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 hover:border-white/30 rounded-xl text-sm text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_20px_rgba(255,255,255,0.1)] group"
            >
              <i className="fas fa-arrow-left mr-2 group-hover:mr-3 transition-all duration-300"></i>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTypeSelectorModal;
