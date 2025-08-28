import { useState } from 'react';
import { Link } from 'react-router';
import type { QuickAccessItem } from '../types/home.types';

interface QuickAccessProps {
  items: QuickAccessItem[];
}

export default function QuickAccess({ items }: QuickAccessProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [clickedItems, setClickedItems] = useState<string[]>([]);

  const handleItemClick = (itemId: string) => {
    setClickedItems(prev => 
      prev.includes(itemId) ? prev : [...prev, itemId]
    );
  };

  const getRandomTip = (title: string) => {
    const tips = {
      'Consulta Veterinaria': ['💡 Tip: Prepara las preguntas antes de la consulta', '🩺 Recuerda tener la cartilla de vacunas lista', '📋 Anota los síntomas que has observado'],
      'Paseador de Perros': ['🚶 Tip: Los paseos regulares mejoran la salud mental', '⏰ 30 minutos diarios es lo recomendado', '🎾 El ejercicio fortalece el vínculo con tu mascota'],
      'Tienda de Mascotas': ['🛒 Tip: Compra alimento premium para mejor nutrición', '🧸 Los juguetes estimulan la mente de tu mascota', '🦴 Los premios ayudan en el entrenamiento'],
      'Emergencias 24/7': ['🚨 Tip: Mantén siempre el número de emergencia a mano', '⚡ Actúa rápido en caso de intoxicación', '🏥 Conoce la ubicación del hospital más cercano']
    };
    const itemTips = tips[title as keyof typeof tips] || ['💡 Tip: Cuida siempre a tu mascota'];
    return itemTips[Math.floor(Math.random() * itemTips.length)];
  };

  return (
    <section className="py-10 px-5 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Acceso Rápido</h2>
        <p className="text-gray-600">Haz click en cualquier servicio para más información</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-5 max-w-6xl mx-auto">
        {items.map((item, index) => (
          <Link
            key={item.id}
            to={item.href}
            className={`bg-white rounded-2xl p-6 w-64 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group relative overflow-hidden ${
              clickedItems.includes(item.id) ? 'ring-2 ring-green-300' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(item.id)}
          >
            {/* Efecto de brillo al hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Contador de clicks */}
            {clickedItems.includes(item.id) && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                ✓
              </div>
            )}

            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-300 ${
              hoveredItem === item.id 
                ? 'bg-green-500 text-white scale-110 animate-pulse' 
                : 'bg-green-100 text-green-500 group-hover:bg-green-200'
            }`}>
              <i className={`${item.icon} text-3xl transition-transform duration-300 ${
                hoveredItem === item.id ? 'animate-bounce' : ''
              }`}></i>
            </div>

            <h3 className="mb-4 text-gray-800 font-semibold group-hover:text-green-600 transition-colors">
              {item.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700 transition-colors">
              {item.description}
            </p>

            {/* Tip interactivo */}
            {hoveredItem === item.id && (
              <div className="absolute bottom-2 left-2 right-2 bg-green-50 text-green-700 text-xs p-2 rounded-lg animate-fade-in border border-green-200">
                {getRandomTip(item.title)}
              </div>
            )}

            {/* Botón de acción que aparece al hover */}
            <div className={`transition-all duration-300 ${
              hoveredItem === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              <span className="inline-flex items-center gap-1 text-green-500 font-semibold text-sm">
                Explorar <i className="fas fa-arrow-right text-xs"></i>
              </span>
            </div>

            {/* Partículas decorativas */}
            {hoveredItem === item.id && (
              <>
                <div className="absolute top-4 left-4 w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
                <div className="absolute top-6 right-6 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              </>
            )}
          </Link>
        ))}
      </div>

      {/* Mensaje motivacional */}
      {clickedItems.length > 0 && (
        <div className="text-center mt-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
            <i className="fas fa-heart animate-pulse"></i>
            <span className="font-semibold">
              ¡Genial! Has explorado {clickedItems.length} {clickedItems.length === 1 ? 'servicio' : 'servicios'}
            </span>
            <i className="fas fa-paw"></i>
          </div>
        </div>
      )}
    </section>
  );
}