interface ActionButtonsProps {
  unreadCount: number;
  onCallWalker: () => void;
  onOpenChat: () => void;
  onReport: () => void;
  onContactVet: () => void;
}

export default function ActionButtons({ 
  unreadCount, 
  onCallWalker, 
  onOpenChat, 
  onReport, 
  onContactVet 
}: ActionButtonsProps) {
  return (
    <div className="mx-auto max-w-6xl p-5 my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <button 
          onClick={onCallWalker}
          className="bg-white border-2 border-green-200 hover:bg-green-500 hover:text-white p-5 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3 hover:-translate-y-1 hover:shadow-lg group"
        >
          <i className="fas fa-phone text-3xl text-green-500 group-hover:text-white"></i>
          <span className="font-semibold">Llamar Paseador</span>
        </button>

        <button 
          onClick={onOpenChat}
          className="bg-white border-2 border-blue-200 hover:bg-blue-500 hover:text-white p-5 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3 hover:-translate-y-1 hover:shadow-lg group relative"
        >
          <i className="fas fa-comment text-3xl text-blue-500 group-hover:text-white"></i>
          <span className="font-semibold">Chat</span>
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {unreadCount}
            </div>
          )}
        </button>

        <button 
          onClick={onReport}
          className="bg-white border-2 border-orange-200 hover:bg-orange-500 hover:text-white p-5 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3 hover:-translate-y-1 hover:shadow-lg group"
        >
          <i className="fas fa-flag text-3xl text-orange-500 group-hover:text-white"></i>
          <span className="font-semibold">Reportar Problema</span>
        </button>

        <button 
          onClick={onContactVet}
          className="bg-white border-2 border-red-200 hover:bg-red-500 hover:text-white p-5 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3 hover:-translate-y-1 hover:shadow-lg group"
        >
          <i className="fas fa-user-md text-3xl text-red-500 group-hover:text-white"></i>
          <span className="font-semibold">Contactar Veterinario</span>
        </button>
      </div>
    </div>
  );
}