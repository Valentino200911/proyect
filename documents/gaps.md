# Gaps

- Cambio de estado de isPaid según reservationState
- Mediante alguna librería de JS, permitir que pasado cierto tiempo, si una reservación no es pagada, se vuelva automáticamente como "fallen"
- Documentar el proceso de modificación de reservation
- Verificación general de la existencia de elementos necesarios en los services
- Práctica usual: Lo comun es recibir un email para confirmar tu cuenta en authService.js (usar NODEMAILER?)
- Anotar en el README como inicializar el proyecto y cambiar la estructura de carpetas
- Habilitar multer y supabase para naturalElement.js y cottage.js
- Manejo de proxy en el front (ver codigo modelo de front)
- Que el usuario vea sus propios contacts y reservation (en el front)
- Manejo del error 429 - Rate limit
- Habilitar Firebase
- Analizar OWASP

// Dudas

- ¿Está bien planteado el modo de modificar en reservation?
  - ¿Es necesario que genere mensajes de error si un usuario intenta modificar algún campo y este no lo hace por la condición?

- ¿Están bien definidas las restricciones para eliminar un user en userService, así como un cottage en cottageService?

- ¿Es necesario deshabilitar a través de un comentario la ruta POST de userRoutes.js ya que registerService ya cumple con esa función?

- De por sí el usuario viene sin la contraseña en authService.js (verificar Public Data of User) ¿Es necesario aplicar publicDataOfUser(user) en register y login o puedo eliminarlo?
- Puedo definir como index a valores que no son únicos en reservationModel

- ¿Es necesario que todos los services tengan una función verifyIfExists?, ¿Cómo puedo centralizarlas?
