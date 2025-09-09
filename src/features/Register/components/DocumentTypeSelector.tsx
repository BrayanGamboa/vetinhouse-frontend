import React, { useState } from 'react';

interface DocumentType {
  id: number;
  name: string;
  description?: string;
}

interface DocumentTypeSelectorProps {
  documentTypes: DocumentType[];
  selectedId: number;
  onSelect: (id: number) => void;
}

const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  documentTypes,
  selectedId,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedType = documentTypes.find(type => type.id === selectedId);

  return (
    <div className="relative">
      {/* Selected Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-4 bg-white/10 border border-white/20 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] focus:bg-white/20 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)] flex items-center justify-between hover:bg-white/15"
      >
        <span className={selectedType ? 'text-white' : 'text-white/70'}>
          {selectedType ? selectedType.name : 'Tipo de documento'}
        </span>
        <i className={`fas fa-chevron-down transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/15 backdrop-blur-[20px] border border-white/20 rounded-[15px] shadow-[0_15px_35px_rgba(0,0,0,0.2)] z-50 max-h-60 overflow-y-auto">
          {documentTypes.map((type, index) => (
            <button
              key={type.id}
              type="button"
              onClick={() => {
                onSelect(type.id);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left text-sm transition-all duration-200 hover:bg-white/20 ${
                selectedId === type.id ? 'bg-[#4CAF50]/20 text-[#4CAF50]' : 'text-white'
              } ${
                index === 0 ? 'rounded-t-[15px]' : ''
              } ${
                index === documentTypes.length - 1 ? 'rounded-b-[15px]' : ''
              } flex items-center gap-3 group`}
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                selectedId === type.id ? 'bg-[#4CAF50] shadow-[0_0_8px_rgba(76,175,80,0.5)]' : 'bg-white/30 group-hover:bg-white/50'
              }`}></div>
              <div className="flex-1">
                <div className="font-medium">{type.name}</div>
                {type.description && (
                  <div className="text-xs text-white/60 mt-1">{type.description}</div>
                )}
              </div>
              {selectedId === type.id && (
                <i className="fas fa-check text-[#4CAF50] text-sm"></i>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DocumentTypeSelector;
