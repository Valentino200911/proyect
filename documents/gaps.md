# Gaps

- Mediante alguna librería de JS, permitir que pasado cierto tiempo, si una reservación no es pagada, se vuelva automáticamente como "fallen"
- Mejorar los filtros en reservation, en vez de index: true
- Ver // TODO
- Documentar con Swagger
- Agregar testeos (lo ideal sería testear el 70% del código)
- Revisar el local update de naturalElementService
- Documentar el proceso de modificación de reservation
- Práctica usual: Lo comun es recibir un email para confirmar tu cuenta en authService.js (usar NODEMAILER?)
- Anotar en el README como inicializar el proyecto y cambiar la estructura de carpetas
- Manejo de proxy en el front (ver codigo modelo de front)
- Que el usuario vea sus propios contacts y reservation (en el front)
- Manejo del error 429 - Rate limit

// Dudas

- ¿Está bien armado el storage local?

- ¿Está bien planteado el modo de modificar en reservation?
  - ¿Es necesario que genere mensajes de error si un usuario intenta modificar algún campo y este no lo hace por la condición?

- De por sí el usuario viene sin la contraseña en authService.js (verificar Public Data of User) ¿Es necesario aplicar publicDataOfUser(user) en register y login o puedo eliminarlo?
- Puedo definir como index a valores que no son únicos en reservationModel

- En userService, updateUserService, El admin debería ser capaz de modificar el usuario completo, pero si un usuario tiene un perfil, ¿no debería ser capaz de modificarse a sí mismo en ciertos aspectos?
