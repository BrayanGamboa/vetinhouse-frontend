import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <>
      {/* Video de fondo */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-20">
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
        >
          <source 
            src="https://cdn.pixabay.com/video/2020/08/23/47892-452144048_large.mp4" 
            type="video/mp4" 
          />
          Tu navegador no soporta el elemento de video.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10" />
      </div>

      {/* Huellas animadas */}
      <div className="fixed w-full h-full pointer-events-none">
        <div className="absolute text-white/10 animate-floating left-[10%] text-[20px]">
          🐾
        </div>
        <div className="absolute text-white/10 animate-floating left-[40%] text-[25px] [animation-delay:5s]">
          🐾
        </div>
        <div className="absolute text-white/10 animate-floating left-[70%] text-[30px] [animation-delay:10s]">
          🐾
        </div>
      </div>

      {/* Burbujas flotantes */}
      <div className="fixed w-full h-full -z-10 pointer-events-none">
        <div className="absolute bottom-[-100px] w-10 h-10 bg-white/10 rounded-full opacity-50 animate-rise left-[10%]" />
        <div className="absolute bottom-[-100px] w-5 h-5 bg-white/10 rounded-full opacity-50 animate-rise left-[20%] [animation-delay:1s]" />
        <div className="absolute bottom-[-100px] w-12 h-12 bg-white/10 rounded-full opacity-50 animate-rise left-[35%] [animation-delay:2s]" />
        <div className="absolute bottom-[-100px] w-20 h-20 bg-white/10 rounded-full opacity-50 animate-rise left-[50%]" />
        <div className="absolute bottom-[-100px] w-9 h-9 bg-white/10 rounded-full opacity-50 animate-rise left-[55%] [animation-delay:1s]" />
        <div className="absolute bottom-[-100px] w-11 h-11 bg-white/10 rounded-full opacity-50 animate-rise left-[65%] [animation-delay:3s]" />
      </div>
    </>
  );
};

export default AnimatedBackground;
