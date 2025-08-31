import MainLayout from '../../../core/layouts/MainLayout';

export default function PetShopView() {
  return (
    <MainLayout title="PetShop - Tienda Virtual" showBackgroundEffects={true}>
      {/* Contenido específico del PetShop */}
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-5">
          
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-10 text-white text-center mb-8">
            <div className="text-4xl mb-4">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h2 className="text-3xl font-bold mb-4">Bienvenido a nuestro PetShop</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Encuentra todo lo que necesitas para el cuidado y bienestar de tu mascota. 
              Alimentos premium, juguetes, accesorios y mucho más.
            </p>
          </section>

          {/* Categorías */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Categorías</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="text-3xl text-green-500 mb-4 text-center">
                  <i className="fas fa-bone"></i>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">Alimentos</h4>
                <p className="text-gray-600 text-sm text-center">
                  Comida premium para perros y gatos de todas las edades
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="text-3xl text-orange-500 mb-4 text-center">
                  <i className="fas fa-football-ball"></i>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">Juguetes</h4>
                <p className="text-gray-600 text-sm text-center">
                  Juguetes interactivos y educativos para el entretenimiento
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="text-3xl text-blue-500 mb-4 text-center">
                  <i className="fas fa-user-tag"></i>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">Accesorios</h4>
                <p className="text-gray-600 text-sm text-center">
                  Collares, correas, camas y accesorios de calidad
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="text-3xl text-purple-500 mb-4 text-center">
                  <i className="fas fa-spa"></i>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">Cuidado</h4>
                <p className="text-gray-600 text-sm text-center">
                  Productos de higiene y cuidado personal para mascotas
                </p>
              </div>

            </div>
          </section>

          {/* Productos destacados */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Productos Destacados</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <i className="fas fa-bone text-4xl text-green-500"></i>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Royal Canin Premium</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Alimento completo y balanceado para perros adultos
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-500">$45.99</span>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <i className="fas fa-football-ball text-4xl text-orange-500"></i>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Pelota Interactiva</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Pelota con sonidos y luces para entretenimiento
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-500">$15.99</span>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <i className="fas fa-user-tag text-4xl text-blue-500"></i>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Collar Premium</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Collar ajustable con identificación LED integrada
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-500">$29.99</span>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">¿No encontraste lo que buscabas?</h3>
              <p className="text-lg mb-6">
                Contáctanos y te ayudaremos a encontrar el producto perfecto para tu mascota
              </p>
              <button className="bg-white text-green-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Contactar Soporte
              </button>
            </div>
          </section>

        </div>
      </div>
    </MainLayout>
  );
}
