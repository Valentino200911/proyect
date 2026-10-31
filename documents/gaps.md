# Gaps

- Mediante alguna librería de JS, permitir que pasado cierto tiempo, si una reservación no es pagada, se vuelva automáticamente como "fallen"
- Ver // TODO
- Cambiar el nombre de los endpoints en routers y POSTMAN
- Documentar el proceso de modificación de reservation
- Práctica usual: Lo comun es recibir un email para confirmar tu cuenta en authService.js (usar NODEMAILER?)
- Separación de responsabilidades de app.js e index.js
- Anotar en el README como inicializar el proyecto y cambiar la estructura de carpetas
- Habilitar multer y supabase para cottage.js
- Revisar el local update de naturalElementService
- Manejo de proxy en el front (ver codigo modelo de front)
- Que el usuario vea sus propios contacts y reservation (en el front)
- Manejo del error 429 - Rate limit
- Habilitar Firebase
- Analizar OWASP

// Dudas

- ¿Está bien armado el storage local?

- ¿Está bien planteado el modo de modificar en reservation?
  - ¿Es necesario que genere mensajes de error si un usuario intenta modificar algún campo y este no lo hace por la condición?

- De por sí el usuario viene sin la contraseña en authService.js (verificar Public Data of User) ¿Es necesario aplicar publicDataOfUser(user) en register y login o puedo eliminarlo?
- Puedo definir como index a valores que no son únicos en reservationModel

- En userService, updateUserService, El admin debería ser capaz de modificar el usuario completo, pero si un usuario tiene un perfil, ¿no debería ser capaz de modificarse a sí mismo en ciertos aspectos?
