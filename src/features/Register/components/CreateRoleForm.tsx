import React, { useState, useEffect } from 'react';

interface CreateRoleFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  loading?: boolean;
  existingRoles: any[];
}

const CreateRoleForm: React.FC<CreateRoleFormProps> = ({
  onSubmit,
  onBack,
  loading = false,
  existingRoles = []
}) => {
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    description: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Calcular el siguiente ID automáticamente
  useEffect(() => {
    const nextId = existingRoles.length > 0 
      ? Math.max(...existingRoles.map(role => role.id)) + 1 
      : 1;
    setFormData(prev => ({ ...prev, id: nextId }));
  }, [existingRoles]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    // Verificar si ya existe un rol con el mismo nombre
    if (existingRoles.some(role => role.name.toLowerCase() === formData.name.toLowerCase())) {
      newErrors.name = 'Ya existe un rol con este nombre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getRoleIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('admin')) return 'fas fa-user-shield';
    if (lowerName.includes('veterinar')) return 'fas fa-user-md';
    if (lowerName.includes('client') || lowerName.includes('usuario')) return 'fas fa-user';
    if (lowerName.includes('paseador')) return 'fas fa-walking';
    if (lowerName.includes('supervis')) return 'fas fa-user-tie';
    return 'fas fa-user-tag';
  };

  return (
    <div className="h-full flex flex-col animate-[slideInRight_0.3s_ease-out]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/20">
        <button
          onClick={onBack}
          className="text-white/70 hover:text-white transition-colors duration-200"
        >
          <i className="fas fa-arrow-left text-lg"></i>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-lg flex items-center justify-center">
            <i className="fas fa-user-tag text-white text-lg"></i>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">Crear Rol de Usuario</h3>
            <p className="text-white/60 text-sm">Registros existentes: {existingRoles.length}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-4">
          {/* ID Field (Read-only) */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <i className="fas fa-hashtag mr-2 text-[#FF9800]"></i>
              ID (Auto-generado)
            </label>
            <div className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white/70 text-center font-mono text-lg">
              #{formData.id.toString().padStart(3, '0')}
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <i className="fas fa-tag mr-2 text-[#FF9800]"></i>
              Nombre del Rol
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full p-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.name ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-[#FF9800] focus:border-[#FF9800]'
              }`}
              placeholder="Ej: Veterinario Especialista"
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <i className="fas fa-exclamation-circle"></i>
                {errors.name}
              </p>
            )}
            {/* Live preview del icono */}
            {formData.name && (
              <div className="mt-2 flex items-center gap-2 text-white/60 text-sm">
                <i className={getRoleIcon(formData.name)} style={{ color: '#FF9800' }}></i>
                <span>Vista previa del icono</span>
              </div>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <i className="fas fa-align-left mr-2 text-[#FF9800]"></i>
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className={`w-full p-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                errors.description ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-[#FF9800] focus:border-[#FF9800]'
              }`}
              placeholder="Profesional especializado en cuidado veterinario..."
              disabled={loading}
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <i className="fas fa-exclamation-circle"></i>
                {errors.description}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-white/20">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#FF9800] to-[#F57C00] text-white rounded-lg font-semibold transition-all duration-300 hover:from-[#FFB74D] hover:to-[#FB8C00] hover:scale-105 hover:shadow-[0_8px_25px_rgba(255,152,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creando...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <i className="fas fa-plus"></i>
                Crear Rol de Usuario
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoleForm;
