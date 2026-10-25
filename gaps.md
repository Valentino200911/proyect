# Gaps

- Cambio de estado de isPaid según reservationState
- Definir que un admin no pueda eliminar a otro admin
- Revisar y definir los índices de los modelos para reservation
- Verificación general de la existencia de elementos necesarios en los services
- Práctica usual: Lo comun es recibir un email para confirmar tu cuenta en authService.js (usar NODEMAILER?)
- Anotar en el README como inicializar el proyecto
- Habilitar multer y supabase para naturalElement.js y cottage.js
- Manejo de proxy en el front (ver codigo modelo de front)
- Que el usuario vea sus propios contacts y reservation (en el front)
- Manejo del error 429 - Rate limit
- Habilitar Firebase
- Analizar OWASP

// Dudas

- ¿Cómo puedo hacer para que isPaid cambie de estado o se mantenga en reservationService
- ¿Están bien definidas las restricciones para eliminar un user en userService, así como un cottage en cottageService?
- ¿Es necesario deshabilitar a través de un comentario la ruta POST de userRoutes.js ya que registerService ya cumple con esa función?
- De por sí el usuario viene sin la contraseña en authService.js (verificar Public Data of User) ¿Es necesario aplicar publicDataOfUser(user) en register y login o puedo eliminarlo?
- Puedo definir como index a valores que no son únicos en reservationModel
- ¿Es necesario que todos los services tengan una función verifyIfExists?
