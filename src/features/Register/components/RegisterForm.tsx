import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import type { RegisterCredentials } from '../types/register.types';

export default function RegisterForm() {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    document: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    roleId: 1,
    documentTypeId: 1
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  
  const { register, isLoading, showPassword, togglePasswordVisibility, documentTypes, roles } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.document || !credentials.name || !credentials.lastName || !credentials.email || !credentials.password) {
      showMessage('Por favor, completa todos los campos', 'error');
      return;
    }
    
    const result = await register(credentials);
    
    if (result.success) {
      showMessage(result.message, 'success');
      // Reset form
      setCredentials({
        document: '',
        name: '',
        lastName: '',
        email: '',
        password: '',
        roleId: 1,
        documentTypeId: 1
      });
    } else {
      showMessage(result.message, 'error');
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/15 backdrop-blur-[20px] border border-white/20 rounded-[20px] p-8 w-[500px] max-w-[90vw] shadow-[0_25px_45px_rgba(0,0,0,0.2)] text-center z-[1000] transition-all duration-300 hover:shadow-[0_30px_50px_rgba(0,0,0,0.3)] animate-[fadeIn_1s_ease-in-out]">
      <div className="mb-6">
        <i className="fas fa-clinic-medical text-4xl text-[#4CAF50] mb-2 text-shadow-[0_0_20px_rgba(76,175,80,0.5)] animate-[pulse_2s_infinite]"></i>
        <h1 className="text-white text-2xl font-bold text-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">VetInHouse</h1>
      </div>
      
      <h2 className="text-white mb-6 text-xl font-semibold text-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-[fadeInDown_1s_ease-in-out]">Crear Cuenta</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative animate-[fadeInLeft_1s_ease-in-out_0.5s_both]">
            <select
              value={credentials.documentTypeId}
              onChange={(e) => setCredentials({...credentials, documentTypeId: Number(e.target.value)})}
              className="w-full py-3 px-4 bg-white/10 border border-white/20 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] focus:bg-white/20 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
              required
            >
              {documentTypes.map(type => (
                <option key={type.id} value={type.id} className="bg-gray-800 text-white">
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative animate-[fadeInRight_1s_ease-in-out_0.5s_both]">
            <input
              type="text"
              value={credentials.document}
              onChange={(e) => setCredentials({...credentials, document: e.target.value})}
              placeholder="Número de Documento"
              className="w-full py-3 px-4 bg-white/10 border border-white/20 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] placeholder-white/70 focus:bg-white/20 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative animate-[fadeInLeft_1s_ease-in-out_1s_both]">
            <input
              type="text"
              value={credentials.name}
              onChange={(e) => setCredentials({...credentials, name: e.target.value})}
              placeholder="Nombre"
              className="w-full py-3 px-4 bg-white/10 border border-white/20 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] placeholder-white/70 focus:bg-white/20 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
              required
            />
          </div>

          <div className="relative animate-[fadeInRight_1s_ease-in-out_1s_both]">
            <input
              type="text"
              value={credentials.lastName}
              onChange={(e) => setCredentials({...credentials, lastName: e.target.value})}
              placeholder="Apellido"
              className="w-full py-3 px-4 bg-white/10 border border-white/20 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] placeholder-white/70 focus:bg-white/20 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
              required
            />
          </div>
        </div>

        <div className="relative animate-[fadeInLeft_1s_ease-in-out_1.5s_both]">
          <div className="absolute left-[18px] top-1/2 transform -translate-y-1/2 text-[#4CAF50] text-lg z-10">
            <i className="fas fa-envelope"></i>
          </div>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            placeholder="Correo Electrónico"
            className="w-full py-3 px-12 bg-white/10 border border-white/20 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] placeholder-white/70 focus:bg-white/20 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
            required
          />
        </div>

        <div className="relative animate-[fadeInRight_1s_ease-in-out_1.5s_both]">
          <div className="absolute left-[18px] top-1/2 transform -translate-y-1/2 text-[#4CAF50] text-lg z-10">
            <i className="fas fa-lock"></i>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            placeholder="Contraseña"
            className="w-full py-3 px-12 bg-white/10 border border-white/20 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] placeholder-white/70 focus:bg-white/20 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
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

        <div className="relative animate-[fadeInLeft_1s_ease-in-out_2s_both]">
          <div className="absolute left-[18px] top-1/2 transform -translate-y-1/2 text-[#4CAF50] text-lg z-10">
            <i className="fas fa-user-tag"></i>
          </div>
          <select
            value={credentials.roleId}
            onChange={(e) => setCredentials({...credentials, roleId: Number(e.target.value)})}
            className="w-full py-3 px-12 bg-white/10 border border-white/20 rounded-full text-white text-sm outline-none transition-all duration-300 backdrop-blur-[10px] focus:bg-white/20 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
            required
          >
            {roles.map(role => (
              <option key={role.id} value={role.id} className="bg-gray-800 text-white">
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-br from-[#4CAF50] to-[#45a049] border-none rounded-full text-white text-sm font-semibold cursor-pointer transition-all duration-300 mb-4 relative overflow-hidden shadow-[0_10px_30px_rgba(76,175,80,0.3)] hover:transform hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(76,175,80,0.4)] active:transform active:translate-y-0 disabled:opacity-50 animate-[fadeInUp_1s_ease-in-out_2.5s_both]"
        >
          {isLoading ? (
            <>
              <span className="mr-2">Registrando...</span>
              <i className="fas fa-spinner animate-spin"></i>
            </>
          ) : (
            <>
              <span className="mr-2">Crear Cuenta</span>
              <i className="fas fa-user-plus"></i>
            </>
          )}
        </button>
      </form>

      {message && (
        <div className={`my-4 p-2 rounded-lg font-medium text-center transition-all duration-300 ${
          messageType === 'success' 
            ? 'bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/30' 
            : 'bg-red-500/20 text-red-500 border border-red-500/30'
        }`}>
          {message}
        </div>
      )}
      
      <div className="mt-4 text-center animate-[fadeIn_1s_ease-in-out_3s_both]">
        <span className="text-white/90 text-sm mr-2">¿Ya tienes cuenta?</span>
        <a href="/login" className="text-[#4CAF50] text-sm font-semibold hover:underline">
          Inicia Sesión
        </a>
      </div>
    </div>
  );
}