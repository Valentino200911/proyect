# Gaps

- Mediante alguna librería de JS, permitir que pasado cierto tiempo, si una reservación no es pagada, se vuelva automáticamente como "fallen"
- Mejorar los filtros en reservation, en vez de index: true
- Ver `// TODO`
- Continuar con swagger.js
- Agregar testeos (lo ideal sería testear el 70% del código)
- Revisar el local update de naturalElementService
- Documentar el proceso de modificación de reservation
- Anotar en el README como inicializar el proyecto y cambiar la estructura de carpetas
- Manejo del error 429 - Rate limit
- Validar mayoría de edad para registro (Para algo tiene que servir birthDate)
- Analizar la descentralización de generalConstants.js
- Agragar validaciones de 404
- Modificar la separación por roles

## Dudas

- ¿Está bien armado el storage local?

- ¿Está bien planteado el modo de modificar en reservation?
  - ¿Es necesario que genere mensajes de error si un usuario intenta modificar algún campo y este no lo hace por la condición?

- Puedo definir como index a valores que no son únicos en reservationModel

- En userService, updateUserService, El admin debería ser capaz de modificar el usuario completo, pero si un usuario tiene un perfil, ¿no debería ser capaz de modificarse a sí mismo en ciertos aspectos?

## Funcionalidades a Futuro

- Práctica usual: Lo comun es recibir un email para confirmar tu cuenta en authService.js (usar NODEMAILER?)

- Manejo del error 429 - Rate limit

- Validar mayoría de edad para registro (Para algo tiene que servir birthDate)

- Mediante alguna librería de JS, permitir que pasado cierto tiempo, si una reservación no es pagada, se vuelva automáticamente como "fallen"
