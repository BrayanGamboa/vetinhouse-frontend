import React from 'react';
import { useRegister } from '../hooks/useRegister';

interface AdminPanelProps {
  onClose?: () => void;
  onCreateDocumentType?: () => void;
  onCreateRole?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onCreateDocumentType, onCreateRole }) => {
  const { loading } = useRegister();

  return (
    <div className="bg-white/15 backdrop-blur-[20px] border border-white/20 rounded-[20px] p-8 w-full max-w-[500px] shadow-[0_25px_45px_rgba(0,0,0,0.2)] text-center transition-all duration-300 hover:shadow-[0_30px_50px_rgba(0,0,0,0.3)] animate-[fadeIn_1s_ease-in-out]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <i className="fas fa-user-shield text-4xl text-[#66BB6A] mb-2 text-shadow-[0_0_20px_rgba(102,187,106,0.6)] animate-[pulse_4s_infinite]"></i>
          <h1 className="text-white text-2xl font-bold text-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Panel de Admin</h1>
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

      <h2 className="text-white mb-8 text-xl font-semibold text-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-[fadeInDown_1s_ease-in-out]">
        Administración del Sistema
      </h2>

      {/* Admin Actions */}
      <div className="space-y-5 mb-8">
        {/* Crear Tipo de Documento */}
        <button
          onClick={() => onCreateDocumentType?.()}
          disabled={loading}
          className="w-full py-5 px-8 bg-gradient-to-br from-[#2196F3] to-[#1976D2] border-none rounded-2xl text-white text-lg font-bold cursor-pointer transition-all duration-400 shadow-[0_12px_35px_rgba(33,150,243,0.3)] hover:transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(33,150,243,0.5)] hover:from-[#42A5F5] hover:to-[#1E88E5] active:transform active:translate-y-0 active:scale-[0.98] disabled:opacity-50 animate-[fadeInLeft_1s_ease-in-out_0.5s_both] group overflow-hidden relative"
        >
          {/* Background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          
          <div className="flex items-center justify-center relative z-10">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-white/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <i className="fas fa-file-alt text-lg group-hover:text-xl transition-all duration-300"></i>
            </div>
            <span className="group-hover:tracking-wide transition-all duration-300">Crear Tipo de Documento</span>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
              <i className="fas fa-arrow-right text-lg group-hover:translate-x-1 transition-all duration-300"></i>
            </div>
          </div>
          
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-2xl bg-white/10 scale-0 group-active:scale-100 transition-transform duration-200 origin-center"></div>
        </button>

        {/* Crear Rol */}
        <button
          onClick={() => onCreateRole?.()}
          disabled={loading}
          className="w-full py-5 px-8 bg-gradient-to-br from-[#FF9800] to-[#F57C00] border-none rounded-2xl text-white text-lg font-bold cursor-pointer transition-all duration-400 shadow-[0_12px_35px_rgba(255,152,0,0.3)] hover:transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(255,152,0,0.5)] hover:from-[#FFB74D] hover:to-[#FB8C00] active:transform active:translate-y-0 active:scale-[0.98] disabled:opacity-50 animate-[fadeInRight_1s_ease-in-out_0.5s_both] group overflow-hidden relative"
        >
          {/* Background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          
          <div className="flex items-center justify-center relative z-10">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-white/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <i className="fas fa-user-tag text-lg group-hover:text-xl transition-all duration-300"></i>
            </div>
            <span className="group-hover:tracking-wide transition-all duration-300">Crear Rol de Usuario</span>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
              <i className="fas fa-arrow-right text-lg group-hover:translate-x-1 transition-all duration-300"></i>
            </div>
          </div>
          
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-2xl bg-white/10 scale-0 group-active:scale-100 transition-transform duration-200 origin-center"></div>
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        <div className="bg-white/10 backdrop-blur-[15px] border border-white/20 rounded-2xl p-6 animate-[fadeInUp_1s_ease-in-out_1s_both]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2196F3]/20 to-[#1976D2]/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-id-card text-2xl text-[#2196F3]"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-white text-base font-bold mb-1">Tipos de Doc.</h3>
              <p className="text-white/70 text-sm">Gestiona documentos de identificación</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-[15px] border border-white/20 rounded-2xl p-6 animate-[fadeInUp_1s_ease-in-out_1.2s_both]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF9800]/20 to-[#F57C00]/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-users-cog text-2xl text-[#FF9800]"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-white text-base font-bold mb-1">Roles</h3>
              <p className="text-white/70 text-sm">Define permisos y accesos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-white/60 text-sm animate-[fadeIn_1s_ease-in-out_2s_both] transition-all duration-300 hover:text-white/80 cursor-default">
        <div className="flex items-center justify-center gap-2">
          <i className="fas fa-shield-alt text-[#4CAF50] animate-[pulse_2s_infinite]"></i>
          <p>Acceso restringido para administradores</p>
          <i className="fas fa-shield-alt text-[#4CAF50] animate-[pulse_2s_infinite]"></i>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
