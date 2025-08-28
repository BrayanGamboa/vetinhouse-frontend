export default function AboutSection() {
  const aboutItems = [
    {
      id: 1,
      title: 'Nuestra Misión',
      description: 'En VetInHouse, nuestra misión es proporcionar atención veterinaria de calidad en la comodidad de tu hogar, garantizando el bienestar de tus mascotas y evitando el estrés de los traslados.',
      icon: 'fas fa-bullseye',
      image: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Nuestra Visión',
      description: 'Queremos ser la plataforma líder en atención veterinaria domiciliaria, ofreciendo un servicio accesible, rápido y confiable que revolucione la forma en que cuidamos a nuestras mascotas.',
      icon: 'fas fa-eye',
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: '¿Por qué lo hacemos?',
      description: 'Sabemos lo importante que es la salud de tu mascota, por eso facilitamos el acceso a veterinarios y paseadores con solo un clic. Creemos que el cuidado de calidad debe ser accesible para todos.',
      icon: 'fas fa-heart',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="py-20 px-5 bg-white">
      <div className="text-center text-3xl mb-12 text-gray-800 relative">
        <h2>Conoce VetInHouse</h2>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-500 rounded"></div>
      </div>
      
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        {aboutItems.map((item, index) => (
          <div 
            key={item.id}
            className={`flex items-center gap-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''} flex-col lg:flex-row`}
          >
            <div className="flex-1 max-w-full lg:max-w-1/2 rounded-3xl overflow-hidden shadow-lg relative group">
              <img 
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="flex-1 relative pt-10 px-8 pb-8">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl shadow-md z-10">
                <i className={item.icon}></i>
              </div>
              <h3 className="text-2xl font-semibold mb-5 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}