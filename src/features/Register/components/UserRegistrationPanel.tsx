import { useState, useRef, useEffect } from 'react';
import { useRegister } from '../hooks/useRegister';
import { useGoogleRegister } from '../hooks/useGoogleRegister';
import { useNotify } from '@/core/hooks/useNotify';
import type { RegisterCredentials } from '../types/register.types';
import RegisterSuccessAnimation from './RegisterSuccessAnimation';
import DocumentTypeSelectorModal from './DocumentTypeSelectorModal';
import RoleSelectorModal from './RoleSelectorModal';

interface UserRegistrationPanelProps {
  onClose?: () => void;
  onBack?: () => void;
  onShowDocumentSelector?: () => void;
  onShowRoleSelector?: () => void;
  onHideSelectors?: () => void;
  documentTypes?: any[];
  roles?: any[];
  selectedDocumentId?: number;
  selectedRoleId?: number;
  selectedDocumentName?: string;
  selectedRoleName?: string;
  onDocumentSelect?: (id: number, name: string) => void;
  onRoleSelect?: (id: number, name: string) => void;
}

const UserRegistrationPanel: React.FC<UserRegistrationPanelProps> = ({ 
  onClose, 
  onBack, 
  onShowDocumentSelector, 
  onShowRoleSelector, 
  onHideSelectors,
  documentTypes = [],
  roles = [],
  selectedDocumentId,
  selectedRoleId,
  selectedDocumentName,
  selectedRoleName,
  onDocumentSelect,
  onRoleSelect
}) => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    document: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    roleId: selectedRoleId || 1,
    documentTypeId: selectedDocumentId || 1
  });

  // Removemos las variables no utilizadas
  // const [message] = useState('');
  // const [messageType] = useState<'success' | 'error' | ''>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isGoogleMode, setIsGoogleMode] = useState(false);
  const googleBtnRef = useRef<HTMLDivElement | null>(null);
  const documentButtonRef = useRef<HTMLButtonElement | null>(null);
  const roleButtonRef = useRef<HTMLButtonElement | null>(null);

  // Estados para controlar la posición de los modales
  const [modalPosition, setModalPosition] = useState({ top: '50%', left: '50%' });

  const notify = useNotify();

  const {
    loading,
    showPassword,
    passwordStrength,
    passwordRequirements,
    register,
    togglePasswordVisibility,
    validatePassword
  } = useRegister();

  const { googleReady, setupGoogleButton } = useGoogleRegister();

  // Estados para documentos y roles (ya no se usan localmente)
  // const [documentTypes, setDocumentTypes] = useState<any[]>([]);
  // const [roles, setRoles] = useState<any[]>([]);
  
  // Estados para los modales
  const [showDocumentTypeModal, setShowDocumentTypeModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  
  // Estados para mostrar las selecciones - usando props en su lugar
  // const [selectedDocumentTypeName, setSelectedDocumentTypeName] = useState('');

  // Ya no necesitamos cargar datos localmente, vienen desde props
  // useEffect(() => {
  //   const loadData = async () => {
  //     // Ya no necesitamos cargar datos ni nombres localmente
  //     // Los datos vienen desde el componente padre
  //   };
  //   loadData();
  // }, []);

  // Sincronizar credenciales con props
  useEffect(() => {
    if (selectedDocumentId && selectedRoleId) {
      setCredentials(prev => ({
        ...prev,
        documentTypeId: selectedDocumentId,
        roleId: selectedRoleId
      }));
    }
  }, [selectedDocumentId, selectedRoleId]);

  // Función para calcular la posición del modal
  const calculateModalPosition = (buttonRef: React.RefObject<HTMLButtonElement | null>) => {
    if (!buttonRef.current) return { top: '50%', left: '50%' };
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    // const viewportWidth = window.innerWidth; // no se usa
    
    // Calcular posición vertical - centrar en la vista actual
    let top = window.scrollY + (viewportHeight / 2);
    
    // Si el botón está visible, centrar cerca del botón
    if (buttonRect.top >= 0 && buttonRect.bottom <= viewportHeight) {
      top = window.scrollY + buttonRect.top + (buttonRect.height / 2);
    }
    
    // Asegurar que el modal no se salga de la pantalla
    const modalHeight = 600; // Altura aproximada del modal
    if (top + modalHeight/2 > window.scrollY + viewportHeight) {
      top = window.scrollY + viewportHeight - modalHeight/2 - 20;
    }
    if (top - modalHeight/2 < window.scrollY) {
      top = window.scrollY + modalHeight/2 + 20;
    }
    
    return {
      top: `${top}px`,
      left: '50%'
    };
  };

  // Función para manejar selección de tipo de documento
  const handleDocumentTypeSelect = (id: number, name: string) => {
    setCredentials({...credentials, documentTypeId: id});
    if (onHideSelectors) onHideSelectors();
    if (onDocumentSelect) onDocumentSelect(id, name);
  };

  // Función para manejar selección de rol
  const handleRoleSelect = (id: number, name: string) => {
    setCredentials({...credentials, roleId: id});
    if (onHideSelectors) onHideSelectors();
    if (onRoleSelect) onRoleSelect(id, name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.document || !credentials.name || !credentials.lastName || !credentials.email || (!credentials.password && !isGoogleMode)) {
      notify.error('Campos Incompletos', 'Por favor, completa todos los campos');
      return;
    }
    
    const result = await register(credentials);
    
    if (result.success) {
      notify.registerSuccess(credentials.name);
      setTimeout(() => {
        if (isGoogleMode) {
          window.location.href = '/home';
        } else {
          setShowSuccess(true);
        }
      }, 1000);
    } else {
      notify.registerError(result.message);
    }
  };

  const handleGoogleData = (googleData: { name: string; email: string }) => {
    setCredentials(prev => ({
      ...prev,
      name: googleData.name,
      email: googleData.email,
      password: 'google_auth_temp_password'
    }));
    setIsGoogleMode(true);
  };

  // Configurar botón de Google
  useEffect(() => {
    if (!googleReady || !googleBtnRef.current || isGoogleMode) return;
    
    googleBtnRef.current.innerHTML = '';
    setupGoogleButton(googleBtnRef.current, handleGoogleData);

    return () => {
      try { window.google?.accounts.id.cancel(); } catch {}
      if (googleBtnRef.current) googleBtnRef.current.innerHTML = '';
    };
  }, [googleReady, setupGoogleButton, isGoogleMode]);

  if (showSuccess) {
    return <RegisterSuccessAnimation />;
  }

  return (
    <div 
      className="bg-white/10 backdrop-blur-[20px] border border-white/15 rounded-[20px] p-8 w-full max-w-[600px] shadow-[0_25px_45px_rgba(0,0,0,0.15)] text-center transition-all duration-300 hover:shadow-[0_30px_50px_rgba(0,0,0,0.2)] animate-[fadeIn_1s_ease-in-out] max-h-[85vh] overflow-y-auto no-scrollbar"
    >
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <i className="fas fa-clinic-medical text-4xl text-[#66BB6A] mb-2 text-shadow-[0_0_20px_rgba(102,187,106,0.5)] animate-[pulse_4s_infinite]"></i>
          <h1 className="text-white text-2xl font-bold text-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">VetInHouse</h1>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors duration-200 ml-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <h2 className="text-white mb-6 text-xl font-semibold text-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-[fadeInDown_1s_ease-in-out]">
        {isGoogleMode ? 'Completar Registro' : 'Crear Cuenta'}
      </h2>
      
      {/* Google Authentication */}
      {!isGoogleMode && (
        <>
          <div className="mb-6 animate-[fadeInUp_1s_ease-in-out_0.5s_both]">
            <div ref={googleBtnRef} className="flex justify-center w-full mb-4">
              {/* Google renderizará aquí el botón oficial */}
            </div>
            {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (
              <div className="text-xs text-orange-300 bg-orange-500/20 border border-orange-500/30 rounded-lg p-2 mb-4">
                Configura VITE_GOOGLE_CLIENT_ID para habilitar Google.
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 my-6 animate-[fadeIn_1s_ease-in-out_1s_both]">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-white/80 text-sm">o</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>
        </>
      )}
      
      {/* Google Mode Indicator */}
      {isGoogleMode && (
        <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-blue-300 text-sm">
            <i className="fab fa-google"></i>
            <span>Datos de Google obtenidos. Completa la información restante.</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Document Information Section */}
        <div className="bg-white/5 backdrop-blur-[15px] border border-white/15 rounded-[20px] p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center">
              <i className="fas fa-id-card text-white text-sm"></i>
            </div>
            <h3 className="text-white/90 text-base font-semibold">Información de Documento</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="animate-[fadeInLeft_1s_ease-in-out_0.5s_both]">
              <label className="block text-white/70 text-xs mb-2 ml-4">Tipo de Documento</label>
              <button
                type="button"
                ref={documentButtonRef}
                onClick={() => {
                  if (onShowDocumentSelector) {
                    onShowDocumentSelector();
                  } else {
                    const position = calculateModalPosition(documentButtonRef);
                    setModalPosition(position);
                    setShowDocumentTypeModal(true);
                  }
                }}
                className="w-full py-3 px-4 bg-white/8 border border-white/15 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] hover:bg-gradient-to-r hover:from-[#4CAF50]/15 hover:to-[#45a049]/15 hover:border-[#4CAF50]/40 hover:shadow-[0_8px_20px_rgba(76,175,80,0.3)] focus:bg-white/15 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)] flex items-center justify-between group"
              >
                <span className={selectedDocumentName ? 'text-white' : 'text-white/70'}>
                  {selectedDocumentName || 'Seleccionar tipo de documento'}
                </span>
                <div className="flex items-center gap-2">
                  {selectedDocumentName && (
                    <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse"></div>
                  )}
                  <i className="fas fa-chevron-right text-white/50 group-hover:text-[#4CAF50] group-hover:scale-110 transition-all duration-300"></i>
                </div>
              </button>
            </div>

            <div className="animate-[fadeInRight_1s_ease-in-out_0.7s_both]">
              <label className="block text-white/70 text-xs mb-2 ml-4">Número de Documento</label>
              <input
                type="text"
                value={credentials.document}
                onChange={(e) => setCredentials({...credentials, document: e.target.value})}
                placeholder="Ingresa tu número de documento"
                className="w-full py-3 px-4 bg-white/8 border border-white/15 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] placeholder-white/60 focus:bg-white/15 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
                required
              />
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white/5 backdrop-blur-[15px] border border-white/15 rounded-[20px] p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2196F3] to-[#1976D2] rounded-full flex items-center justify-center">
              <i className="fas fa-user text-white text-sm"></i>
            </div>
            <h3 className="text-white/90 text-base font-semibold">Información Personal</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="animate-[fadeInLeft_1s_ease-in-out_1s_both]">
              <label className="block text-white/70 text-xs mb-2 ml-4">Nombre</label>
              <input
                type="text"
                value={credentials.name}
                onChange={(e) => setCredentials({...credentials, name: e.target.value})}
                placeholder="Ingresa tu nombre"
                className={`w-full py-3 px-4 bg-white/8 border border-white/15 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] placeholder-white/60 focus:bg-white/15 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)] ${isGoogleMode ? 'bg-blue-500/8 border-blue-500/25' : ''}`}
                readOnly={isGoogleMode}
                required
              />
            </div>

            <div className="animate-[fadeInRight_1s_ease-in-out_1s_both]">
              <label className="block text-white/70 text-xs mb-2 ml-4">Apellido</label>
              <input
                type="text"
                value={credentials.lastName}
                onChange={(e) => setCredentials({...credentials, lastName: e.target.value})}
                placeholder="Ingresa tu apellido"
                className="w-full py-3 px-4 bg-white/8 border border-white/15 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] placeholder-white/60 focus:bg-white/15 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
                required
              />
            </div>
          </div>
        </div>

        {/* Access Credentials Section */}
        <div className="bg-white/5 backdrop-blur-[15px] border border-white/15 rounded-[20px] p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-full flex items-center justify-center">
              <i className="fas fa-key text-white text-sm"></i>
            </div>
            <h3 className="text-white/90 text-base font-semibold">Credenciales de Acceso</h3>
          </div>
          
          <div className="animate-[fadeInLeft_1s_ease-in-out_1.5s_both]">
            <label className="block text-white/70 text-xs mb-2 ml-4">Correo Electrónico</label>
            <div className="relative">
              <div className="absolute left-[18px] top-1/2 transform -translate-y-1/2 text-[#4CAF50] text-lg z-10">
                <i className="fas fa-envelope"></i>
              </div>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                placeholder="ejemplo@correo.com"
                className={`w-full py-3 px-12 bg-white/8 border border-white/15 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] placeholder-white/60 focus:bg-white/15 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)] ${isGoogleMode ? 'bg-blue-500/8 border-blue-500/25' : ''}`}
                readOnly={isGoogleMode}
                required
              />
            </div>
          </div>
          
          {/* Password */}
          {!isGoogleMode && (
            <div className="animate-[fadeInRight_1s_ease-in-out_1.7s_both]">
              <label className="block text-white/70 text-xs mb-2 ml-4">Contraseña</label>
              <div className="relative">
                <div className="absolute left-[18px] top-1/2 transform -translate-y-1/2 text-[#4CAF50] text-lg z-10">
                  <i className="fas fa-lock"></i>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => {
                    const newPassword = e.target.value;
                    setCredentials({...credentials, password: newPassword});
                    if (newPassword) {
                      validatePassword(newPassword);
                    }
                  }}
                  placeholder="Ingresa tu contraseña"
                  className="w-full py-3 px-12 bg-white/8 border border-white/15 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] placeholder-white/60 focus:bg-white/15 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-[18px] top-1/2 transform -translate-y-1/2 text-white/70 cursor-pointer transition-colors duration-300 z-10 hover:text-[#4CAF50]"
                >
                  <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Password Strength Indicator */}
        {!isGoogleMode && (
          <div className="bg-white/8 backdrop-blur-[15px] border border-white/20 rounded-[20px] p-5 animate-[fadeIn_1s_ease-in-out]">
            {credentials.password && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/90 text-base font-semibold">{passwordStrength.text}</span>
                  <span className="text-white/80 text-sm font-medium">{passwordStrength.score}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-4 mb-5 shadow-inner">
                  <div 
                    className="h-4 rounded-full transition-all duration-500 shadow-lg"
                    style={{ 
                      width: `${passwordStrength.score}%`,
                      backgroundColor: passwordStrength.color
                    }}
                  />
                </div>
              </>
            )}
            
            <div className="mb-3">
              <h4 className="text-white/90 text-sm font-semibold mb-3 flex items-center gap-2">
                <i className="fas fa-shield-alt text-[#4CAF50]"></i>
                Requisitos de Seguridad
              </h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={`bg-white/5 rounded-xl p-3 border transition-all duration-300 ${passwordRequirements.minLength ? 'border-green-400/40 bg-green-400/10' : 'border-red-400/40 bg-red-400/5'}`}>
                <span className={`flex items-center gap-3 text-sm font-medium ${passwordRequirements.minLength ? 'text-green-300' : 'text-red-300'}`}>
                  <i className={`fas ${passwordRequirements.minLength ? 'fa-check-circle' : 'fa-times-circle'} text-lg`}></i>
                  <span>8+ caracteres</span>
                </span>
              </div>
              
              <div className={`bg-white/5 rounded-xl p-3 border transition-all duration-300 ${passwordRequirements.hasUppercase ? 'border-green-400/40 bg-green-400/10' : 'border-red-400/40 bg-red-400/5'}`}>
                <span className={`flex items-center gap-3 text-sm font-medium ${passwordRequirements.hasUppercase ? 'text-green-300' : 'text-red-300'}`}>
                  <i className={`fas ${passwordRequirements.hasUppercase ? 'fa-check-circle' : 'fa-times-circle'} text-lg`}></i>
                  <span>Mayúscula</span>
                </span>
              </div>
              
              <div className={`bg-white/5 rounded-xl p-3 border transition-all duration-300 ${passwordRequirements.hasNumber ? 'border-green-400/40 bg-green-400/10' : 'border-red-400/40 bg-red-400/5'}`}>
                <span className={`flex items-center gap-3 text-sm font-medium ${passwordRequirements.hasNumber ? 'text-green-300' : 'text-red-300'}`}>
                  <i className={`fas ${passwordRequirements.hasNumber ? 'fa-check-circle' : 'fa-times-circle'} text-lg`}></i>
                  <span>Número</span>
                </span>
              </div>
              
              <div className={`bg-white/5 rounded-xl p-3 border transition-all duration-300 ${passwordRequirements.hasSpecialChar ? 'border-green-400/40 bg-green-400/10' : 'border-red-400/40 bg-red-400/5'}`}>
                <span className={`flex items-center gap-3 text-sm font-medium ${passwordRequirements.hasSpecialChar ? 'text-green-300' : 'text-red-300'}`}>
                  <i className={`fas ${passwordRequirements.hasSpecialChar ? 'fa-check-circle' : 'fa-times-circle'} text-lg`}></i>
                  <span>Especial</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Role Selection Section */}
        <div className="bg-white/5 backdrop-blur-[15px] border border-white/15 rounded-[20px] p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[#9C27B0] to-[#7B1FA2] rounded-full flex items-center justify-center">
              <i className="fas fa-users text-white text-sm"></i>
            </div>
            <h3 className="text-white/90 text-base font-semibold">Rol en la Plataforma</h3>
          </div>
          
          <div className="animate-[fadeInLeft_1s_ease-in-out_2s_both]">
            <label className="block text-white/70 text-xs mb-2 ml-4">Tipo de Usuario</label>
            <button
              type="button"
              ref={roleButtonRef}
              onClick={() => {
                if (onShowRoleSelector) {
                  onShowRoleSelector();
                } else {
                  const position = calculateModalPosition(roleButtonRef);
                  setModalPosition(position);
                  setShowRoleModal(true);
                }
              }}
              className="w-full py-3 px-4 bg-white/8 border border-white/15 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] hover:bg-gradient-to-r hover:from-[#2196F3]/15 hover:to-[#1976D2]/15 hover:border-[#2196F3]/40 hover:shadow-[0_8px_20px_rgba(33,150,243,0.3)] focus:bg-white/15 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)] flex items-center justify-between group"
            >
              <span className={selectedRoleName ? 'text-white' : 'text-white/70'}>
                {selectedRoleName || 'Seleccionar rol'}
              </span>
              <div className="flex items-center gap-2">
                {selectedRoleName && (
                  <div className="w-2 h-2 bg-[#2196F3] rounded-full animate-pulse"></div>
                )}
                <i className="fas fa-chevron-right text-white/50 group-hover:text-[#2196F3] group-hover:scale-110 transition-all duration-300"></i>
              </div>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-gradient-to-br from-[#4CAF50] to-[#45a049] border-none rounded-full text-white text-base font-semibold cursor-pointer transition-all duration-300 relative overflow-hidden shadow-[0_10px_30px_rgba(76,175,80,0.3)] hover:transform hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(76,175,80,0.4)] active:transform active:translate-y-0 disabled:opacity-50 animate-[fadeInUp_1s_ease-in-out_2.5s_both]"
          >
            {loading ? (
              <>
                <span className="mr-2">Registrando...</span>
                <i className="fas fa-spinner animate-spin"></i>
              </>
            ) : (
              <>
                <span className="mr-2">{isGoogleMode ? 'Completar Registro' : 'Crear Cuenta'}</span>
                <i className={`${isGoogleMode ? 'fab fa-google' : 'fas fa-user-plus'}`}></i>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Back to Login */}
      <div className="mt-5">
        <p className="text-white/80">
          ¿Ya tienes cuenta?{' '}
          <button
            type="button"
            onClick={onBack}
            className="text-[#4CAF50] hover:text-[#45a049] hover:underline 
                     transition-colors duration-300 font-medium"
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
      
      {/* Modales */}
      {/* Modales solo si no hay callbacks de selector */}
      {!onShowDocumentSelector && (
        <DocumentTypeSelectorModal
          isOpen={showDocumentTypeModal}
          onClose={() => setShowDocumentTypeModal(false)}
          documentTypes={documentTypes || []}
          selectedId={credentials.documentTypeId}
          onSelect={handleDocumentTypeSelect}
          position={modalPosition}
        />
      )}
      
      {!onShowRoleSelector && (
        <RoleSelectorModal
          isOpen={showRoleModal}
          onClose={() => setShowRoleModal(false)}
          roles={roles || []}
          selectedId={credentials.roleId}
          onSelect={handleRoleSelect}
          position={modalPosition}
        />
      )}
    </div>
  );
};

export default UserRegistrationPanel;
