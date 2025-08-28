import { useState, useEffect } from 'react';
import type { Service, Testimonial, QuickAccessItem } from '../types/home.types';

export const useHome = () => {
  const [isLoading, setIsLoading] = useState(true);

  const quickAccessItems: QuickAccessItem[] = [
    {
      id: '1',
      title: 'Agendar Cita',
      description: 'Programa una visita veterinaria a domicilio',
      icon: 'fas fa-calendar-alt',
      href: '/cita'
    },
    {
      id: '2',
      title: 'PetShop',
      description: 'Productos de calidad para tu mascota',
      icon: 'fas fa-shopping-cart',
      href: '/petshop'
    },
    {
      id: '3',
      title: 'Paseadores',
      description: 'Encuentra paseadores confiables para tu mascota',
      icon: 'fas fa-walking',
      href: '/paseador'
    },
    {
      id: '4',
      title: 'GPS',
      description: 'Localiza a tu mascota en tiempo real',
      icon: 'fas fa-map-marker-alt',
      href: '/gps'
    }
  ];

  const services: Service[] = [
    {
      id: '1',
      title: 'Consulta General',
      description: 'Evaluación completa del estado de salud de tu mascota en la comodidad de tu hogar.',
      icon: 'fas fa-stethoscope'
    },
    {
      id: '2',
      title: 'Vacunación',
      description: 'Programa completo de vacunación para perros y gatos con seguimiento personalizado.',
      icon: 'fas fa-syringe'
    },
    {
      id: '3',
      title: 'Limpieza Dental',
      description: 'Cuidado dental profesional para prevenir enfermedades y mantener la salud bucal.',
      icon: 'fas fa-tooth'
    },
    {
      id: '4',
      title: 'Peluquería',
      description: 'Servicio de estética y cuidado del pelaje adaptado a las necesidades de cada mascota.',
      icon: 'fas fa-cut'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'María Rodríguez',
      content: 'El servicio de VetInHouse ha sido una bendición para mi perro anciano. Ya no tenemos que pasar por el estrés de llevarlo a la clínica.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      id: '2',
      name: 'Carlos Méndez',
      content: 'Los veterinarios son muy profesionales y amables. Mi gata, que normalmente es muy asustadiza, se sintió cómoda durante toda la consulta.',
      rating: 4.5,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '3',
      name: 'Laura Torres',
      content: 'El servicio de paseadores es excelente. Siempre puntuales y envían fotos durante el paseo. Mi perro los adora.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
    }
  ];

  useEffect(() => {
    // Simular carga inicial
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  return {
    isLoading,
    quickAccessItems,
    services,
    testimonials,
    handleLogout
  };
};