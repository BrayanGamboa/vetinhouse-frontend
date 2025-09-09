# Funcionalidad de Tipos de Documento - VetInHouse

## Descripción

Se agregó la funcionalidad para crear tipos de documento desde la pantalla de registro de VetInHouse. Esta funcionalidad permite a los usuarios crear nuevos tipos de documento que serán almacenados en el backend mediante una API REST.

## Archivos Modificados y Creados

### Archivos Creados:

1. **`src/features/Register/components/DocumentTypeModal.tsx`**
   - Modal para crear tipos de documento
   - Formulario con campos para nombre y descripción
   - Diseño consistente con el estilo de la aplicación
   - Validaciones de formulario

### Archivos Modificados:

1. **`src/features/Register/types/register.types.ts`**
   - Agregados tipos `DocumentType` y `CreateDocumentTypeResponse`

2. **`src/features/Register/hooks/useRegister.ts`**
   - Agregada función `createDocumentType` para comunicarse con la API
   - Integración con el endpoint: `https://vetinhouse-backend-1.onrender.com/document_type`

3. **`src/features/Register/components/RegisterForm.tsx`**
   - Agregado botón "Crear Tipo de Documento"
   - Integración del modal `DocumentTypeModal`
   - Funciones para manejar la apertura/cierre del modal

## Funcionalidad

### Endpoint de la API
- **URL**: `https://vetinhouse-backend-1.onrender.com/document_type`
- **Método**: POST
- **Estructura de datos enviados**:
```json
{
  "id": <número_especificado_por_usuario>,
  "name": "<nombre_del_tipo>",
  "description": "<descripción_del_tipo>"
}
```

### Flujo de Usuario

1. El usuario accede a la pantalla de registro
2. En el formulario de registro, aparece un botón azul "Crear Tipo de Documento"
3. Al hacer clic, se abre un modal con:
   - Campo numérico para el ID
   - Campo de texto para el nombre
   - Campo de texto para la descripción
   - Botones de "Cancelar" y "Crear"
4. Al enviar el formulario:
   - Se valida que todos los campos estén llenos
   - Se valida que el ID sea un número válido
   - Se envía la petición POST a la API con el ID especificado por el usuario
   - Se muestra mensaje de éxito o error
   - Se cierra el modal automáticamente si es exitoso

### Características Técnicas

- **Validación**: Campos obligatorios para ID, nombre y descripción
- **Validación de ID**: Campo numérico con valor mínimo de 1
- **Loading States**: Indicador de carga durante la petición
- **Error Handling**: Manejo de errores de la API
- **Responsive Design**: Compatible con diferentes tamaños de pantalla
- **Animaciones**: Transiciones suaves y animaciones de entrada
- **Accesibilidad**: Botones con íconos descriptivos

### Estilos y Diseño

- Consistente con el diseño existente de la aplicación
- Uso de colores del tema: verde (#5FD068) y azul (#2196F3)
- Efectos de glassmorphism (cristal esmerilado)
- Animaciones suaves y transiciones
- Sombras y efectos hover

## Cómo Probar

1. Iniciar el servidor de desarrollo: `npm run dev`
2. Navegar a la página de registro
3. Hacer clic en "Registrarse con correo"
4. En el formulario, hacer clic en "Crear Tipo de Documento"
5. Llenar todos los campos del modal (ID, nombre y descripción) y enviar
6. Verificar la respuesta en el mensaje de estado

## Posibles Mejoras Futuras

- Agregar un listado de tipos de documento existentes
- Permitir editar/eliminar tipos de documento
- Validación de nombres duplicados
- Paginación para grandes listas de tipos
- Búsqueda y filtrado de tipos de documento
