import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';
import UserRegistrationPanel from './UserRegistrationPanel';
import RegisterBackground from './RegisterBackground';
import CreateDocumentTypeForm from './CreateDocumentTypeForm';
import CreateRoleForm from './CreateRoleForm';
import { useRegister } from '../hooks/useRegister';
import { useNotify } from '@/core/hooks/useNotify';

// Componente para mostrar selección de documentos
const DocumentSelectorPanel: React.FC<{
  documentTypes: any[];
  selectedId: number;
  onSelect: (id: number, name: string) => void;
  onBack: () => void;
}> = ({ documentTypes, selectedId, onSelect, onBack }) => {
  return (
    <div className="w-full h-full flex flex-col animate-[slideInRight_0.3s_ease-out]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-bold">Tipo de Documento</h3>
        <button
          onClick={onBack}
          className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
        >
          <i className="fas fa-arrow-left text-sm"></i>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar px-2">
        {documentTypes.map((type, index) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id, type.name)}
            className={`w-full p-4 rounded-xl border transition-all duration-300 text-left group hover:scale-105 animate-[slideInUp_${0.3 + index * 0.05}s_ease-out] ${
              selectedId === type.id
                ? 'bg-gradient-to-r from-[#4CAF50]/25 to-[#45a049]/25 border-[#4CAF50]/50 shadow-[0_8px_20px_rgba(76,175,80,0.3)]'
                : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                selectedId === type.id
                  ? 'bg-gradient-to-br from-[#4CAF50] to-[#45a049]'
                  : 'bg-white/20 group-hover:bg-[#4CAF50]/30'
              }`}>
                <i className={`fas fa-id-card text-lg ${selectedId === type.id ? 'text-white' : 'text-white/70'}`}></i>
              </div>
              <div className="flex-1">
                <div className={`font-semibold ${selectedId === type.id ? 'text-[#4CAF50]' : 'text-white'}`}>
                  {type.name}
                </div>
                {type.description && (
                  <div className="text-sm text-white/60">{type.description}</div>
                )}
              </div>
              {selectedId === type.id && (
                <div className="w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Componente para mostrar selección de roles
const RoleSelectorPanel: React.FC<{
  roles: any[];
  selectedId: number;
  onSelect: (id: number, name: string) => void;
  onBack: () => void;
}> = ({ roles, selectedId, onSelect, onBack }) => {
  const getRoleIcon = (roleName: string) => {
    const name = roleName.toLowerCase();
    if (name.includes('admin') || name.includes('administrador')) return 'fas fa-user-shield';
    if (name.includes('veterinar') || name.includes('doctor')) return 'fas fa-user-md';
    if (name.includes('cliente') || name.includes('usuario')) return 'fas fa-user';
    if (name.includes('empleado') || name.includes('staff')) return 'fas fa-user-tie';
    return 'fas fa-user-circle';
  };

  const getRoleColor = (roleName: string) => {
    const name = roleName.toLowerCase();
    if (name.includes('admin') || name.includes('administrador')) return { from: '#FF6B6B', to: '#FF5252' };
    if (name.includes('veterinar') || name.includes('doctor')) return { from: '#4CAF50', to: '#45a049' };
    if (name.includes('cliente') || name.includes('usuario')) return { from: '#2196F3', to: '#1976D2' };
    if (name.includes('empleado') || name.includes('staff')) return { from: '#FF9800', to: '#F57C00' };
    return { from: '#607D8B', to: '#455A64' };
  };

  return (
    <div className="w-full h-full flex flex-col animate-[slideInRight_0.3s_ease-out]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-bold">Tipo de Usuario</h3>
        <button
          onClick={onBack}
          className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
        >
          <i className="fas fa-arrow-left text-sm"></i>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar px-2">
        {roles.map((role, index) => {
          const colors = getRoleColor(role.name);
          const isSelected = selectedId === role.id;
          
          return (
            <button
              key={role.id}
              onClick={() => onSelect(role.id, role.name)}
              className={`w-full p-4 rounded-xl border transition-all duration-300 text-left group hover:scale-105 animate-[slideInUp_${0.3 + index * 0.05}s_ease-out] ${
                isSelected
                  ? 'border-opacity-50 shadow-[0_8px_20px_rgba(33,150,243,0.2)]'
                  : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30'
              }`}
              style={isSelected ? {
                backgroundColor: `rgba(${parseInt(colors.from.slice(1, 3), 16)}, ${parseInt(colors.from.slice(3, 5), 16)}, ${parseInt(colors.from.slice(5, 7), 16)}, 0.25)`,
                borderColor: `rgba(${parseInt(colors.from.slice(1, 3), 16)}, ${parseInt(colors.from.slice(3, 5), 16)}, ${parseInt(colors.from.slice(5, 7), 16)}, 0.5)`
              } : {}}
            >
              <div className="flex items-center gap-3">
                <div 
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isSelected ? '' : 'bg-white/20'
                  }`}
                  style={isSelected ? {
                    background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`
                  } : {}}
                >
                  <i className={`${getRoleIcon(role.name)} text-lg ${isSelected ? 'text-white' : 'text-white/70'}`}></i>
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${isSelected ? 'text-white' : 'text-white'}`} 
                       style={isSelected ? { color: colors.from } : {}}>
                    {role.name}
                  </div>
                  {role.description && (
                    <div className="text-sm text-white/60">{role.description}</div>
                  )}
                </div>
                {isSelected && (
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                  >
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface DualPanelRegistrationProps {
  onBack?: () => void;
}

const DualPanelRegistration: React.FC<DualPanelRegistrationProps> = ({ onBack }) => {
  const [activePanel, setActivePanel] = useState<'user' | 'admin'>('user');
  const [activeSelectorPanel, setActiveSelectorPanel] = useState<'default' | 'document' | 'role' | 'create-document' | 'create-role'>('default');
  
  // Hook para obtener datos de la API
  const { fetchDocumentTypes, fetchRoles, createDocumentType, createRole, loading } = useRegister();
  const notify = useNotify();
  
  // Estados para los datos de la API
  const [documentTypes, setDocumentTypes] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  
  const [selectedDocumentId, setSelectedDocumentId] = useState(1);
  const [selectedRoleId, setSelectedRoleId] = useState(1);
  const [selectedDocumentName, setSelectedDocumentName] = useState('');
  const [selectedRoleName, setSelectedRoleName] = useState('');

  // Cargar datos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const [docTypes, userRoles] = await Promise.all([
          fetchDocumentTypes(),
          fetchRoles()
        ]);
        setDocumentTypes(docTypes);
        setRoles(userRoles);
        
        // Establecer valores por defecto si hay datos
        if (docTypes.length > 0) {
          setSelectedDocumentId(docTypes[0].id);
          setSelectedDocumentName(docTypes[0].name);
        }
        if (userRoles.length > 0) {
          setSelectedRoleId(userRoles[0].id);
          setSelectedRoleName(userRoles[0].name);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, [fetchDocumentTypes, fetchRoles]);

  // Función para recargar datos después de crear un nuevo elemento
  const reloadData = async () => {
    try {
      const [docTypes, userRoles] = await Promise.all([
        fetchDocumentTypes(),
        fetchRoles()
      ]);
      setDocumentTypes(docTypes);
      setRoles(userRoles);
    } catch (error) {
      console.error('Error reloading data:', error);
    }
  };

  // Funciones para manejar la creación de documentos y roles
  const handleCreateDocumentType = async (documentTypeData: any) => {
    try {
      const result = await createDocumentType(documentTypeData);
      if (result.success) {
        notify.documentTypeCreated(documentTypeData.name);
        await reloadData(); // Recargar datos
        setActiveSelectorPanel('default'); // Volver al panel por defecto
      }
    } catch (error) {
      console.error('Error al crear tipo de documento:', error);
    }
  };

  const handleCreateRole = async (roleData: any) => {
    try {
      const result = await createRole(roleData);
      if (result.success) {
        notify.roleCreated(roleData.name);
        await reloadData(); // Recargar datos
        setActiveSelectorPanel('default'); // Volver al panel por defecto
      }
    } catch (error) {
      console.error('Error al crear rol:', error);
    }
  };

  const handlePanelSwitch = (panel: 'user' | 'admin') => {
    setActivePanel(panel);
    setActiveSelectorPanel('default');
  };

  const handleSelectorPanelSwitch = (panel: 'default' | 'document' | 'role') => {
    setActiveSelectorPanel(panel);
  };
  
  const handleDocumentSelect = (id: number, name: string) => {
    setSelectedDocumentId(id);
    setSelectedDocumentName(name);
    setActiveSelectorPanel('default');
  };
  
  const handleRoleSelect = (id: number, name: string) => {
    setSelectedRoleId(id);
    setSelectedRoleName(name);
    setActiveSelectorPanel('default');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <RegisterBackground />

      {/* Main Content: Two Columns */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] w-[900px] max-w-[98vw] flex rounded-[30px] shadow-[0_25px_45px_rgba(0,0,0,0.2)] bg-white/8 backdrop-blur-[20px] border border-white/15 animate-[fadeIn_1s_ease-in-out]">
        {/* Left: Formulario - Más transparente */}
        <div className="flex-1 flex items-center justify-center p-8 bg-white/5 backdrop-blur-[15px] rounded-l-[30px]">
          {activePanel === 'user' ? (
            <UserRegistrationPanel 
              onBack={onBack} 
              onShowDocumentSelector={() => handleSelectorPanelSwitch('document')}
              onShowRoleSelector={() => handleSelectorPanelSwitch('role')}
              onHideSelectors={() => handleSelectorPanelSwitch('default')}
              documentTypes={documentTypes}
              roles={roles}
              selectedDocumentId={selectedDocumentId}
              selectedRoleId={selectedRoleId}
              selectedDocumentName={selectedDocumentName}
              selectedRoleName={selectedRoleName}
              onDocumentSelect={handleDocumentSelect}
              onRoleSelect={handleRoleSelect}
            />
          ) : (
            <AdminPanel 
              onCreateDocumentType={() => setActiveSelectorPanel('create-document')}
              onCreateRole={() => setActiveSelectorPanel('create-role')}
            />
          )}
        </div>
        {/* Right: Menú y selector */}
        <div className="w-[320px] min-w-[260px] max-w-[340px] flex flex-col py-10 px-6 border-l border-white/20 bg-white/10 backdrop-blur-[10px] rounded-r-[30px]">
          {/* Contenido dinámico */}
          <div className="flex-1 flex flex-col">
            {activeSelectorPanel === 'default' ? (
              <>
                {/* Panel Selector */}
                <div className="w-full mb-8">
                  <div className="bg-white/15 backdrop-blur-[20px] border border-white/20 rounded-[20px] p-4 shadow-[0_15px_35px_rgba(0,0,0,0.2)] animate-[fadeInDown_1s_ease-in-out]">
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => handlePanelSwitch('user')}
                        className={`w-full px-6 py-4 rounded-[15px] text-sm font-semibold transition-all duration-300 ${
                          activePanel === 'user'
                            ? 'bg-[#4CAF50] text-white shadow-[0_8px_20px_rgba(76,175,80,0.4)] transform scale-105'
                            : 'text-white/70 hover:text-white hover:bg-white/15 bg-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <i className="fas fa-user-plus mr-3 text-lg"></i>
                          <span>Registro de Usuario</span>
                        </div>
                      </button>
                      <button
                        onClick={() => handlePanelSwitch('admin')}
                        className={`w-full px-6 py-4 rounded-[15px] text-sm font-semibold transition-all duration-300 ${
                          activePanel === 'admin'
                            ? 'bg-gradient-to-r from-[#2196F3] to-[#FF9800] text-white shadow-[0_8px_20px_rgba(33,150,243,0.4)] transform scale-105'
                            : 'text-white/70 hover:text-white hover:bg-white/15 bg-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <i className="fas fa-user-shield mr-3 text-lg"></i>
                          <span>Panel de Admin</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Info Footer */}
                <div className="w-full mt-auto">
                  <div className="bg-white/15 backdrop-blur-[10px] border border-white/20 rounded-[20px] px-6 py-4 shadow-[0_10px_25px_rgba(0,0,0,0.1)] animate-[fadeInUp_1s_ease-in-out_2s_both]">
                    <div className="flex flex-col gap-3 items-center text-white/70 text-sm">
                      <div className="flex items-center gap-2 w-full justify-center">
                        <i className="fas fa-info-circle text-[#4CAF50]"></i>
                        <span className="text-center">Modo: {activePanel === 'user' ? 'Registro de Usuario' : 'Administración'}</span>
                      </div>
                      <div className="w-full h-px bg-white/20"></div>
                      <div className="flex items-center gap-2 w-full justify-center">
                        <i className="fas fa-shield-alt text-[#2196F3]"></i>
                        <span className="text-center">Conexión Segura</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : activeSelectorPanel === 'document' ? (
              <DocumentSelectorPanel
                documentTypes={documentTypes}
                selectedId={selectedDocumentId}
                onSelect={handleDocumentSelect}
                onBack={() => setActiveSelectorPanel('default')}
              />
            ) : activeSelectorPanel === 'role' ? (
              <RoleSelectorPanel
                roles={roles}
                selectedId={selectedRoleId}
                onSelect={handleRoleSelect}
                onBack={() => setActiveSelectorPanel('default')}
              />
            ) : activeSelectorPanel === 'create-document' ? (
              <CreateDocumentTypeForm
                onSubmit={handleCreateDocumentType}
                onBack={() => setActiveSelectorPanel('default')}
                loading={loading}
                existingTypes={documentTypes}
              />
            ) : activeSelectorPanel === 'create-role' ? (
              <CreateRoleForm
                onSubmit={handleCreateRole}
                onBack={() => setActiveSelectorPanel('default')}
                loading={loading}
                existingRoles={roles}
              />
            ) : null}
          </div>
        </div>
      </div>

      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-8 left-8 bg-white/15 backdrop-blur-[10px] border border-white/20 rounded-full p-3 text-white hover:bg-white/25 transition-all duration-300 z-[1001] group animate-[fadeInLeft_1s_ease-in-out]"
        >
          <i className="fas fa-arrow-left text-lg group-hover:-translate-x-1 transition-transform duration-300"></i>
        </button>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-[999]">
        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 text-white/10 text-6xl animate-[float_6s_ease-in-out_infinite]">
          <i className="fas fa-paw"></i>
        </div>
        <div className="absolute top-3/4 right-1/4 text-white/10 text-4xl animate-[float_8s_ease-in-out_infinite_reverse]">
          <i className="fas fa-heart"></i>
        </div>
        <div className="absolute top-1/2 right-1/3 text-white/10 text-5xl animate-[float_7s_ease-in-out_infinite]">
          <i className="fas fa-user-md"></i>
        </div>
        {/* Gradient Orbs */}
        <div className="absolute top-1/3 left-1/5 w-32 h-32 bg-gradient-to-r from-[#4CAF50]/20 to-[#2196F3]/20 rounded-full blur-xl animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gradient-to-r from-[#FF9800]/20 to-[#4CAF50]/20 rounded-full blur-xl animate-[pulse_5s_ease-in-out_infinite_reverse]"></div>
      </div>
    </div>
  );
};

export default DualPanelRegistration;
