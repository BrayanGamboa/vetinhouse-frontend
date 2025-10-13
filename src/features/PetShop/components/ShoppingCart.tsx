import { useState } from 'react';
import type { CartItem, PaymentMethod, ShippingInfo } from '../types/petshop.types';

interface ShoppingCartProps {
  cart: CartItem[];
  totalPrice: number;
  shippingCost: number;
  totalItems: number;
  paymentMethods: PaymentMethod[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function ShoppingCart({
  cart,
  totalPrice,
  shippingCost,
  totalItems,
  paymentMethods,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    address: '',
    city: '',
    phone: '',
    notes: ''
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  const handleCheckout = () => {
    if (!selectedPayment || !shippingInfo.address || !shippingInfo.city || !shippingInfo.phone) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    // Iniciar procesamiento de pago
    setProcessingPayment(true);
    
    // Simular procesamiento de pago (2-3 segundos)
    setTimeout(() => {
      // Generar número de orden
      const orderNum = `VH-${Date.now().toString().slice(-8)}`;
      setOrderNumber(orderNum);
      setProcessingPayment(false);
      setOrderComplete(true);
      
      // Limpiar carrito después de 5 segundos
      setTimeout(() => {
        onClearCart();
        setOrderComplete(false);
        setShowCheckout(false);
        setIsOpen(false);
        setSelectedPayment('');
        setShippingInfo({
          address: '',
          city: '',
          phone: '',
          notes: ''
        });
      }, 5000);
    }, 2500);
  };

  // Modal de procesamiento de pago
  if (processingPayment) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4 shadow-2xl">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <i className="fas fa-credit-card text-3xl text-blue-600"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Procesando pago...</h3>
          <p className="text-gray-600 mb-4">Por favor espera mientras verificamos tu pago</p>
          <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <i className="fas fa-lock"></i>
            <span>Conexión segura SSL</span>
          </div>
        </div>
      </div>
    );
  }

  // Modal de confirmación de pedido
  if (orderComplete) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-lg mx-4 shadow-2xl">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <i className="fas fa-check-circle text-5xl text-green-600"></i>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">¡Pedido Confirmado!</h3>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600 mb-1">Número de orden:</p>
            <p className="text-2xl font-bold text-green-600">{orderNumber}</p>
          </div>
          <p className="text-gray-700 mb-2">Tu pedido ha sido procesado exitosamente</p>
          <p className="text-gray-600 text-sm mb-6">Recibirás un email con los detalles de seguimiento</p>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3 text-left">
              <i className="fas fa-shipping-fast text-2xl text-blue-600 mt-1"></i>
              <div>
                <p className="font-semibold text-gray-900">Entrega estimada</p>
                <p className="text-sm text-gray-600">24-48 horas hábiles</p>
                <p className="text-xs text-gray-500 mt-1">Te notificaremos cuando tu pedido esté en camino</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Subtotal</p>
              <p className="font-bold text-gray-900">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Envío</p>
              <p className={`font-bold ${shippingCost === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                {shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toFixed(2)}`}
              </p>
            </div>
            <div className="flex-1 bg-green-50 rounded-lg p-3 border-2 border-green-200">
              <p className="text-xs text-green-700">Total</p>
              <p className="font-bold text-green-600">${(totalPrice + shippingCost).toFixed(2)}</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-6">Esta ventana se cerrará automáticamente...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Botón del carrito */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 z-40 group"
      >
        <i className="fas fa-shopping-cart text-xl group-hover:animate-bounce"></i>
        {totalItems > 0 && (
          <>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full w-7 h-7 flex items-center justify-center font-bold animate-pulse">
              {totalItems}
            </span>
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-green-800 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
              ${totalPrice.toFixed(2)}
            </span>
          </>
        )}
      </button>

      {/* Modal del carrito */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Carrito de Compras ({totalItems} items)
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="overflow-y-auto max-h-96">
              {cart.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-shopping-cart text-3xl text-gray-400"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Tu carrito está vacío</h3>
                  <p className="text-gray-500 text-sm">Agrega productos para comenzar tu compra</p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                      <div className="relative">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                        <p className="text-xs text-gray-500 mb-1">{item.product.brand}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-bold">${item.product.price}</span>
                          <span className="text-xs text-gray-400">x {item.quantity}</span>
                          <span className="text-sm font-semibold text-gray-700">= ${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                        >
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                        >
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="w-8 h-8 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors ml-1"
                        >
                          <i className="fas fa-trash text-xs"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal ({totalItems} items):</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Envío:</span>
                    <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                      {shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${(totalPrice + shippingCost).toFixed(2)}
                    </span>
                  </div>
                  {shippingCost > 0 && totalPrice < 50 && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Agrega ${(50 - totalPrice).toFixed(2)} más para envío gratis
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-credit-card"></i>
                    Proceder al pago
                  </button>
                  <button
                    onClick={() => onClearCart()}
                    className="px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title="Vaciar carrito"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de checkout */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Finalizar Compra</h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Información de envío */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Información de Envío</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Dirección completa *"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Ciudad *"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono *"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Notas adicionales (opcional)"
                    value={shippingInfo.notes}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-20 resize-none"
                  />
                </div>
              </div>

              {/* Métodos de pago */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="fas fa-credit-card text-green-600"></i>
                  Método de Pago
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`p-4 border-2 rounded-xl flex flex-col items-center gap-3 transition-all duration-200 hover:shadow-md ${
                        selectedPayment === method.id
                          ? 'border-green-500 bg-green-50 shadow-lg transform scale-105'
                          : 'border-gray-200 hover:border-green-300 bg-white'
                      }`}
                    >
                      {method.icon.startsWith('http') ? (
                        <img 
                          src={method.icon} 
                          alt={method.name}
                          className="h-8 w-auto object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                            if (nextSibling) {
                              nextSibling.style.display = 'block';
                            }
                          }}
                        />
                      ) : (
                        <i className={`${method.icon} text-2xl text-green-600`}></i>
                      )}
                      <i className={`fas fa-credit-card text-2xl text-green-600`} style={{display: 'none'}}></i>
                      <span className="text-sm font-medium text-gray-700">{method.name}</span>
                      {selectedPayment === method.id && (
                        <i className="fas fa-check-circle text-green-500 text-sm"></i>
                      )}
                    </button>
                  ))}
                </div>
                {selectedPayment && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 flex items-center gap-2">
                      <i className="fas fa-shield-alt"></i>
                      Pago seguro con {paymentMethods.find(m => m.id === selectedPayment)?.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Resumen */}
              <div className="bg-gradient-to-r from-gray-50 to-green-50 p-5 rounded-xl border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="fas fa-receipt text-green-600"></i>
                  Resumen del pedido
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal ({totalItems} items):</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Envío:</span>
                    <span className={`font-medium ${
                      shippingCost === 0 ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  {shippingCost === 0 && (
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <i className="fas fa-gift"></i>
                      ¡Felicidades! Tienes envío gratis
                    </div>
                  )}
                  <div className="border-t border-green-200 pt-2 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total a pagar:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${(totalPrice + shippingCost).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!selectedPayment || !shippingInfo.address || !shippingInfo.city || !shippingInfo.phone}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <i className="fas fa-lock"></i>
                Confirmar Pedido Seguro
                <span className="text-sm font-normal">
                  ${(totalPrice + shippingCost).toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}