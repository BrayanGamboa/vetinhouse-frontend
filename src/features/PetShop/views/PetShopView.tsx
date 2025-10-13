import MainLayout from '../../../core/layouts/MainLayout';
import { usePetShop } from '../hooks/usePetShop';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';

export default function PetShopView() {
  const {
    products,
    cart,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    onlyInStock,
    setOnlyInStock,
    paymentMethods,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getShippingCost,
    getTotalItems,
    clearCart
  } = usePetShop();

  return (
    <MainLayout title="PetShop - Tienda Virtual" showBackgroundEffects={false}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-green-600 via-green-500 to-blue-500 rounded-2xl overflow-hidden mb-8 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 px-8 py-16 text-center text-white">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-store text-2xl"></i>
                  </div>
                  <h1 className="text-5xl font-bold">VetInHouse PetShop</h1>
                </div>
                
                <p className="text-xl mb-8 text-green-50 leading-relaxed">
                  La tienda online más completa para tu mascota. Productos premium, precios justos y entrega rápida.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <i className="fas fa-truck text-2xl mb-2"></i>
                    <div className="font-semibold">Envío Gratis</div>
                    <div className="text-sm text-green-100">En compras +$50</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <i className="fas fa-award text-2xl mb-2"></i>
                    <div className="font-semibold">Calidad Premium</div>
                    <div className="text-sm text-green-100">Marcas reconocidas</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <i className="fas fa-clock text-2xl mb-2"></i>
                    <div className="font-semibold">Entrega 24h</div>
                    <div className="text-sm text-green-100">En área metropolitana</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full"></div>
            <div className="absolute top-1/2 right-8 w-12 h-12 bg-white/5 rounded-full"></div>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Buscador */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-search mr-2 text-green-600"></i>
                  Buscar productos
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nombre, marca o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Categorías */}
              <div className="lg:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-tags mr-2 text-green-600"></i>
                  Categorías
                </label>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => {
                    const categoryIcons = {
                      'Todos': 'fas fa-th-large',
                      'Alimentos': 'fas fa-bone',
                      'Juguetes': 'fas fa-football-ball',
                      'Accesorios': 'fas fa-collar',
                      'Cuidado': 'fas fa-spa'
                    };
                    
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          selectedCategory === category
                            ? 'bg-green-600 text-white shadow-lg transform scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 hover:shadow-md'
                        }`}
                      >
                        <i className={categoryIcons[category as keyof typeof categoryIcons] || 'fas fa-tag'}></i>
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Filtros adicionales */}
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {/* Ordenar por */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-sort mr-2 text-green-600"></i>
                  Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor Calificación</option>
                  <option value="name">Nombre A-Z</option>
                </select>
              </div>

              {/* Rango de precio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-dollar-sign mr-2 text-green-600"></i>
                  Rango de precio: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>
              </div>

              {/* Solo disponibles */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-filter mr-2 text-green-600"></i>
                  Disponibilidad
                </label>
                <label className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Solo productos disponibles</span>
                </label>
              </div>
            </div>
            
            {/* Resultados */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
              <span>
                {products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
                {selectedCategory !== 'Todos' && ` en ${selectedCategory}`}
                {searchTerm && ` para "${searchTerm}"`}
              </span>
              {(searchTerm || selectedCategory !== 'Todos') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Todos');
                  }}
                  className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                >
                  <i className="fas fa-undo text-xs"></i>
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {/* Productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
              <p className="text-gray-500">Intenta con otros términos de búsqueda o categoría</p>
            </div>
          )}

          {/* Información adicional */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shipping-fast text-green-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Envío Gratis</h3>
              <p className="text-gray-600 text-sm">En compras mayores a $50</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-blue-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Garantía</h3>
              <p className="text-gray-600 text-sm">30 días de garantía en todos los productos</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-headset text-purple-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Soporte 24/7</h3>
              <p className="text-gray-600 text-sm">Atención al cliente siempre disponible</p>
            </div>
          </div>
        </div>
      </div>

      {/* Carrito de compras */}
      <ShoppingCart
        cart={cart}
        totalPrice={getTotalPrice()}
        shippingCost={getShippingCost()}
        totalItems={getTotalItems()}
        paymentMethods={paymentMethods}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
    </MainLayout>
  );
}
