import React, { useState } from 'react';
import type { RoleUser } from '../types/register.types';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (role: RoleUser) => Promise<void>;
  loading: boolean;
}

const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState<RoleUser>({ id: 0, name: '', description: '' });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'id' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id > 0 && formData.name.trim() && formData.description.trim()) {
      await onSubmit(formData);
      setFormData({ id: 0, name: '', description: '' });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({ id: 0, name: '', description: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-[10px] rounded-[20px] p-8 w-full max-w-md border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.2)] animate-fadeInCenter">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Crear Rol</h2>
          <button onClick={handleClose} className="text-white/70 hover:text-white transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ID */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5FD068] text-xl">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            </div>
            <input type="number" name="id" value={formData.id || ''} onChange={handleInputChange} placeholder="ID del rol" min={1} className="w-full py-4 px-12 bg-white/10 border-none rounded-full text-white text-base transition-all duration-300 placeholder-white/70 focus:outline-none focus:bg-white/20 focus:shadow-[0_0_15px_rgba(95,208,104,0.3)]" required />
          </div>

          {/* Nombre */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5FD068] text-xl">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/></svg>
            </div>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nombre del rol" className="w-full py-4 px-12 bg-white/10 border-none rounded-full text-white text-base transition-all duration-300 placeholder-white/70 focus:outline-none focus:bg-white/20 focus:shadow-[0_0_15px_rgba(95,208,104,0.3)]" required />
          </div>

          {/* Descripción */}
          <div className="relative">
            <div className="absolute left-4 top-4 text-[#5FD068] text-xl">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 4v1.38c-.83-.33-1.72-.5-2.61-.5-1.79 0-3.58.68-4.95 2.05l3.33 3.33h1.11v1.11c.86.86 1.98 1.31 3.11 1.36V15H8v1a2 2 0 0 0 2 2h1v-3h2v3h1a2 2 0 0 0 2-2v-1h-1v-2.64c1.13-.05 2.25-.5 3.11-1.36V10h1.11l3.33-3.33C20.58 5.26 18.79 4.58 17 4.58c-.89 0-1.78.17-2.61.5V4H9z"/></svg>
            </div>
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Descripción del rol" rows={3} className="w-full py-4 px-12 bg-white/10 border-none rounded-[20px] text-white text-base transition-all duration-300 placeholder-white/70 resize-none focus:outline-none focus:bg-white/20 focus:shadow-[0_0_15px_rgba(95,208,104,0.3)]" required />
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={handleClose} className="flex-1 py-3 px-6 bg-white/10 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/20 border border-white/20">Cancelar</button>
            <button type="submit" disabled={!formData.id || !formData.name.trim() || !formData.description.trim() || loading} className={`flex-1 py-3 px-6 border-none rounded-full text-white font-semibold transition-all duration-300 ${formData.id && formData.name.trim() && formData.description.trim() && !loading ? 'bg-[#4CAF50] hover:bg-[#45a049] hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(76,175,80,0.4)]' : 'bg-[#4CAF50] opacity-70 cursor-not-allowed'}`}>{loading ? 'Creando...' : 'Crear'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleModal;
