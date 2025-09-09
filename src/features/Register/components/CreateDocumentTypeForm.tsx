import React, { useState, useEffect } from 'react';

interface CreateDocumentTypeFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  loading?: boolean;
  existingTypes: any[];
}

const CreateDocumentTypeForm: React.FC<CreateDocumentTypeFormProps> = ({
  onSubmit,
  onBack,
  loading = false,
  existingTypes = []
}) => {
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    description: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Calcular el siguiente ID automáticamente
  useEffect(() => {
    const nextId = existingTypes.length > 0 
      ? Math.max(...existingTypes.map(type => type.id)) + 1 
      : 1;
    setFormData(prev => ({ ...prev, id: nextId }));
  }, [existingTypes]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    // Verificar si ya existe un tipo con el mismo nombre
    if (existingTypes.some(type => type.name.toLowerCase() === formData.name.toLowerCase())) {
      newErrors.name = 'Ya existe un tipo de documento con este nombre';
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
          <div className="w-10 h-10 bg-gradient-to-br from-[#2196F3] to-[#1976D2] rounded-lg flex items-center justify-center">
            <i className="fas fa-file-alt text-white text-lg"></i>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">Crear Tipo de Documento</h3>
            <p className="text-white/60 text-sm">Registros existentes: {existingTypes.length}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-4">
          {/* ID Field (Read-only) */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <i className="fas fa-hashtag mr-2 text-[#2196F3]"></i>
              ID (Auto-generado)
            </label>
            <div className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white/70 text-center font-mono text-lg">
              #{formData.id.toString().padStart(3, '0')}
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <i className="fas fa-tag mr-2 text-[#2196F3]"></i>
              Nombre del Tipo
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full p-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.name ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-[#2196F3] focus:border-[#2196F3]'
              }`}
              placeholder="Ej: Cédula de Ciudadanía"
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <i className="fas fa-exclamation-circle"></i>
                {errors.name}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <i className="fas fa-align-left mr-2 text-[#2196F3]"></i>
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className={`w-full p-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                errors.description ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-[#2196F3] focus:border-[#2196F3]'
              }`}
              placeholder="Documento oficial de identificación nacional..."
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
            className="w-full py-3 bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white rounded-lg font-semibold transition-all duration-300 hover:from-[#42A5F5] hover:to-[#1E88E5] hover:scale-105 hover:shadow-[0_8px_25px_rgba(33,150,243,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creando...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <i className="fas fa-plus"></i>
                Crear Tipo de Documento
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDocumentTypeForm;
