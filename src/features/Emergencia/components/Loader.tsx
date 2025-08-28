interface LoaderProps {
  isVisible: boolean;
}

export default function Loader({ isVisible }: LoaderProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-[9999] transition-opacity duration-500">
      <div className="text-center">
        <div className="text-5xl mb-4 animate-bounce">🐾</div>
        <p className="text-green-500 font-medium">Cargando sistema de emergencias...</p>
      </div>
    </div>
  );
}