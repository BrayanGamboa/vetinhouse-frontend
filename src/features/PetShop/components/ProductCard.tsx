import type { Product } from '../types/petshop.types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const getStockStatus = () => {
    if (!product.inStock) return { text: 'Agotado', color: 'bg-red-500', icon: 'fa-times-circle' };
    if (product.stock && product.stock < 10) return { text: `Solo ${product.stock} disponibles`, color: 'bg-orange-500', icon: 'fa-exclamation-triangle' };
    return { text: 'Disponible', color: 'bg-green-500', icon: 'fa-check-circle' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      {/* Imagen del producto */}
      <div className="relative overflow-hidden group">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Sin+Imagen';
          }}
        />
        
        {/* Badge de disponibilidad */}
        <div className={`absolute top-3 right-3 ${stockStatus.color} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg`}>
          <i className={`fas ${stockStatus.icon}`}></i>
          {stockStatus.text}
        </div>

        {/* Badge de categoría */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
          {product.category}
        </div>

        {/* Overlay de agotado */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white">
              <i className="fas fa-box-open text-4xl mb-2"></i>
              <p className="font-bold text-lg">Producto Agotado</p>
              <p className="text-sm">Próximamente disponible</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Información del producto */}
      <div className="p-5">
        {/* Brand y Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <i className="fas fa-certificate text-blue-500 text-xs"></i>
            <span className="text-xs font-semibold text-gray-700 bg-blue-50 px-2 py-1 rounded">
              {product.brand}
            </span>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
            <i className="fas fa-star text-yellow-400 text-sm"></i>
            <span className="text-sm font-bold text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        </div>
        
        {/* Nombre */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[48px] text-lg">
          {product.name}
        </h3>
        
        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* Peso si existe */}
        {product.weight && (
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
            <i className="fas fa-weight text-purple-500"></i>
            <span className="font-medium">Peso: {product.weight}</span>
          </div>
        )}

        {/* Stock disponible */}
        {product.inStock && product.stock && product.stock < 20 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-3">
            <div className="flex items-center gap-2 text-orange-700 text-xs">
              <i className="fas fa-box-open"></i>
              <span className="font-semibold">¡Últimas {product.stock} unidades!</span>
            </div>
          </div>
        )}
        
        {/* Precio y botón */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </span>
            <div className="text-xs text-gray-500 mt-1">
              <i className="fas fa-shipping-fast mr-1"></i>
              {product.price >= 50 ? 'Envío GRATIS' : 'Envío desde $3.99'}
            </div>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 transform hover:scale-105 shadow-md ${
              product.inStock
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:from-green-700 hover:to-emerald-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <i className={`fas ${product.inStock ? 'fa-cart-plus' : 'fa-ban'}`}></i>
            {product.inStock ? 'Agregar' : 'Agotado'}
          </button>
        </div>

        {/* Beneficios adicionales */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <i className="fas fa-shield-alt text-green-600"></i>
            <span>Garantía 30 días</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="fas fa-truck text-blue-600"></i>
            <span>Entrega 24-48h</span>
          </div>
        </div>
      </div>
    </div>
  );
}