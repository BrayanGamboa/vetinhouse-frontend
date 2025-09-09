import React, { useState } from 'react';

interface Role {
  id: number;
  name: string;
  description?: string;
}

interface RoleSelectorProps {
  roles: Role[];
  selectedId: number;
  onSelect: (id: number) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  roles,
  selectedId,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedRole = roles.find(role => role.id === selectedId);

  const getRoleIcon = (roleName: string) => {
    const name = roleName.toLowerCase();
    if (name.includes('admin')) return 'fas fa-user-shield';
    if (name.includes('veterinario') || name.includes('vet')) return 'fas fa-user-md';
    if (name.includes('cliente') || name.includes('usuario')) return 'fas fa-user';
    if (name.includes('paseador')) return 'fas fa-walking';
    return 'fas fa-user-tag';
  };

  const getRoleColor = (roleName: string) => {
    const name = roleName.toLowerCase();
    if (name.includes('admin')) return '#FF9800';
    if (name.includes('veterinario') || name.includes('vet')) return '#2196F3';
    if (name.includes('cliente') || name.includes('usuario')) return '#4CAF50';
    if (name.includes('paseador')) return '#9C27B0';
    return '#607D8B';
  };

  return (
    <div className="relative">
      {/* Selected Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-12 bg-white/10 border border-white/20 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] focus:bg-white/20 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)] flex items-center justify-between hover:bg-white/15 relative"
      >
        <div className="absolute left-[18px] top-1/2 transform -translate-y-1/2 text-[#4CAF50] text-lg z-10">
          <i className={selectedRole ? getRoleIcon(selectedRole.name) : 'fas fa-user-tag'}></i>
        </div>
        <span className={selectedRole ? 'text-white' : 'text-white/70'}>
          {selectedRole ? selectedRole.name : 'Selecciona tu rol'}
        </span>
        <i className={`fas fa-chevron-down transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/15 backdrop-blur-[20px] border border-white/20 rounded-[15px] shadow-[0_15px_35px_rgba(0,0,0,0.2)] z-50 max-h-60 overflow-y-auto">
          {roles.map((role, index) => (
            <button
              key={role.id}
              type="button"
              onClick={() => {
                onSelect(role.id);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-4 text-left text-sm transition-all duration-200 hover:bg-white/20 ${
                selectedId === role.id ? 'bg-[#4CAF50]/20' : ''
              } ${
                index === 0 ? 'rounded-t-[15px]' : ''
              } ${
                index === roles.length - 1 ? 'rounded-b-[15px]' : ''
              } flex items-center gap-4 group`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  selectedId === role.id 
                    ? 'bg-[#4CAF50]/30 shadow-[0_0_15px_rgba(76,175,80,0.3)]' 
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}
                style={{
                  backgroundColor: selectedId === role.id ? `${getRoleColor(role.name)}30` : undefined
                }}
              >
                <i 
                  className={`${getRoleIcon(role.name)} text-lg`}
                  style={{
                    color: selectedId === role.id ? getRoleColor(role.name) : '#fff'
                  }}
                ></i>
              </div>
              <div className="flex-1">
                <div className={`font-medium ${selectedId === role.id ? 'text-white' : 'text-white'}`}>
                  {role.name}
                </div>
                {role.description && (
                  <div className="text-xs text-white/60 mt-1">{role.description}</div>
                )}
              </div>
              {selectedId === role.id && (
                <div className="w-3 h-3 rounded-full bg-[#4CAF50] shadow-[0_0_8px_rgba(76,175,80,0.5)] animate-pulse"></div>
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

export default RoleSelector;
