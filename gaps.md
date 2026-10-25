# Gaps

- Cambio de estado de isPaid según reservationState
- Definir comentarios sobre el funcionamiento de getAllContactsService y getContactServiceById
- Revisar y definir los índices de los modelos para reservation
- Revisión correcta de totalPrice en Reservation
- Delete de reservationService
- validateDateSuperposition en reservationService
- Verificar si los controller con más de un argumento no están invertidos
- Verificar nuevamente todas las rutas de reservation
- Verificar que no se elimine el cottage si hay alguna reservación que la emplea
- Verificar el manejo del UTC de las fechas según JS
- Revisión correcta de totalPrice en Reservation
- Verificar estructura de DELETE en los services
- Verificar nuevamente todas las rutas de reservation
- Verificar contact
- Descentralizar return en los services
- Descentralizar funciones de cálculo de fecha en reservationService
- Verificación general de la existencia de elementos necesarios en los services
- Verificar si los controller con más de un argumento no están invertidos
- validateDateSuperposition en reservationService
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
- ¿Cómo puedo dinamizar el cálculo del precio sin tener que traer los datos desde un detail en cottage para reservationModel.js y reservationService.js?
- ¿Están bien definidas las restricciones para eliminar un user en userService, así como un cottage en cottageService?
- En reservationService, ¿getMyReservationByIdService y getReservationByIdService no son lo mismo?
- Está bien armado el service de Reservation, así como el Model
- ¿Es necesario deshabilitar a través de un comentario la ruta POST de userRoutes.js ya que registerService ya cumple con esa función?
- Revisar los permisos para get/:id en user, ¿Cualquiera podría ver el usuario de otra persona si conoce el id?
- De por sí el usuario viene sin la contraseña en authService.js (verificar Public Data of User) ¿Es necesario aplicar publicDataOfUser(user) en register y login o puedo eliminarlo?
