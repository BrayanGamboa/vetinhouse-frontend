import type { Testimonial } from '../types/home.types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-orange-400"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-orange-400"></i>);
    }
    
    return stars;
  };

  return (
    <section className="py-20 px-5 bg-white">
      <div className="text-center text-3xl mb-12 text-gray-800 relative">
        <h2>Lo que dicen nuestros clientes</h2>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-500 rounded"></div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id}
            className="bg-white rounded-2xl p-8 w-80 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mb-5 relative">
              <i className="fas fa-quote-left text-2xl text-green-200 mb-2 block"></i>
              <p className="text-gray-600 italic leading-relaxed">{testimonial.content}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <img 
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">{testimonial.name}</h4>
                <div className="flex gap-1 text-sm">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}