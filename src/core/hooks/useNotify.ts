import { useNotifications } from '../components/NotificationContext';

export const useNotify = () => {
  const { addNotification } = useNotifications();

  const notify = {
    success: (title: string, message: string, duration = 5000) => {
      addNotification({
        type: 'success',
        title,
        message,
        duration,
        position: 'top'
      });
    },

    error: (title: string, message: string, duration = 7000) => {
      addNotification({
        type: 'error',
        title,
        message,
        duration,
        position: 'bottom-right'
      });
    },

    warning: (title: string, message: string, duration = 6000) => {
      addNotification({
        type: 'warning',
        title,
        message,
        duration,
        position: 'bottom-right'
      });
    },

    info: (title: string, message: string, duration = 5000) => {
      addNotification({
        type: 'info',
        title,
        message,
        duration,
        position: 'bottom-right'
      });
    },

    // Métodos específicos para eventos de la aplicación
    loginSuccess: (userName: string) => {
      addNotification({
        type: 'success',
        title: '¡Bienvenido!',
        message: `Hola ${userName}, has iniciado sesión correctamente`,
        duration: 4000,
        position: 'top'
      });
    },

    registerSuccess: (userName: string) => {
      addNotification({
        type: 'success',
        title: '¡Registro Exitoso!',
        message: `Bienvenido ${userName}, tu cuenta ha sido creada correctamente`,
        duration: 5000,
        position: 'top'
      });
    },

    documentTypeCreated: (typeName: string) => {
      addNotification({
        type: 'success',
        title: 'Tipo de Documento Creado',
        message: `El tipo de documento "${typeName}" se ha creado correctamente`,
        duration: 4000,
        position: 'top'
      });
    },

    roleCreated: (roleName: string) => {
      addNotification({
        type: 'success',
        title: 'Rol Creado',
        message: `El rol "${roleName}" se ha creado correctamente`,
        duration: 4000,
        position: 'top'
      });
    },

    loginError: (errorMessage: string) => {
      addNotification({
        type: 'error',
        title: 'Error de Inicio de Sesión',
        message: errorMessage,
        duration: 6000,
        position: 'bottom-right'
      });
    },

    registerError: (errorMessage: string) => {
      addNotification({
        type: 'error',
        title: 'Error en el Registro',
        message: errorMessage,
        duration: 6000,
        position: 'bottom-right'
      });
    },

    connectionError: () => {
      addNotification({
        type: 'error',
        title: 'Error de Conexión',
        message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
        duration: 8000,
        position: 'bottom-right'
      });
    }
  };

  return notify;
};
