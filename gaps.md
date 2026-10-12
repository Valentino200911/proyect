# Gaps

- Cambio de estado de isPaid según reservationState
- Revisar y definir los índices de los modelos para reservation
- Revisión correcta de totalPrice en Reservation
- Delete de reservationService
- Práctica usual: Lo comun es recibir un email para confirmar tu cuenta en authService.js (usar NODEMAILER?)
- Habilitar una plantilla de POSTMAN para consultas HTTP y anotar en el README como inicializar el proyecto
- Habilitar multer y supabase para naturalElement.js y cottage.js
- Manejo de proxy en el front (ver codigo modelo de front)
- Que el usuario vea sus propios mensajes (en el front)
- Relación entre create y register user (userService y authService respectivamente)
- Manejo del error 429 - Rate limit
- Habilitar Firebase
- Analizar OWASP

// Dudas

- En reservationService, getMyReservationByIdService y getReservationByIdService no son lo mismo?
- Verificar cómo está armado el service de Reservation, así como el Model
- Se deshabilita a través de un comentario la ruta POST de userRoutes.js ya que registerService ya cumple con esa función?
- Revisar los permisos para get/:id en user, ¿Cualquiera podría ver el usuario de otra persona si conoce el id?
- De por sí el usuario viene sin la contraseña en authService (verificar Public Data of User) Es necesario aplicar publicDataOfUser(user) en register y login?
