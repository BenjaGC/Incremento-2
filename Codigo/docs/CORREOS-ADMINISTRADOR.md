# Probar los correos del administrador en otro PC

El rol Admin pertenece a una cuenta de la ticketera, no a un tipo especial de Gmail. Hay dos direcciones distintas: el remitente configurado en `.env` envía los mensajes; el correo guardado en el perfil Admin los recibe. Pueden ser la misma dirección para una prueba personal.

## 1. Registrar tu cuenta y asignarle Admin

Después de importar la base siguiendo `LEEME-PRIMERO.md`, regístrate en la página con tu RUT y tu propio correo. En MySQL Workbench selecciona la base de desarrollo, consulta el identificador y cambia el rol de ESA cuenta:

```sql
USE clinica_desarrollo;
SELECT user_id, first_name, rut, institutional_email FROM user;

-- Sustituye 123 por el identificador obtenido arriba; no uses 123 literalmente.
SET @mi_usuario = 123;
START TRANSACTION;
DELETE FROM user_role WHERE user_id = @mi_usuario;
INSERT INTO user_role (assignment_date, active, role_id, user_id)
SELECT NOW(), 1, r.role_id, u.user_id
FROM role r CROSS JOIN user u
WHERE r.role_name = 'Admin' AND u.user_id = @mi_usuario;
COMMIT;
```

Cierra sesión y vuelve a entrar. En Editar perfil verifica tu dirección. Los tickets nuevos avisan a todas las cuentas Admin activas: revisa las direcciones de los administradores importados y sustitúyelas por correos de prueba de tus compañeros antes de activar envíos. Cambiar MAIL_USER no cambia los destinatarios.

## 2. Configurar una cuenta Gmail remitente propia

Activa la verificación en dos pasos en tu cuenta Google y crea una contraseña de aplicación para esta instalación. Algunas cuentas de organizaciones o con Protección Avanzada no permiten esa opción. Consulta la [guía oficial de Google](https://support.google.com/accounts/answer/185833?hl=es).

En `.env` configura:

```dotenv
MAIL_ENABLED=true
MAIL_USER=tu-cuenta-remitente@gmail.com
MAIL_PASSWORD="tu contraseña de aplicación"
```

No uses la contraseña habitual de Gmail. No compartas `.env`. Reinicia la aplicación con `npm start` después de cambiarlo. Para dejar de enviar correos durante otras pruebas usa `MAIL_ENABLED=false`.

## 3. Verificar

Crea un ticket desde otra cuenta de la ticketera. Revisa la bandeja y spam de tu cuenta Admin. El aviso de ticket nuevo se intenta inmediatamente, incluso fuera de la ventana operativa. Si SMTP falla, queda pendiente para reintentar cada minuto mientras el servidor está abierto. Otros avisos conservan sus reglas de horario.

Para diagnosticar sin mostrar contraseñas:

```sql
SELECT u.first_name, u.institutional_email, ur.active
FROM user u JOIN user_role ur ON ur.user_id=u.user_id
JOIN role r ON r.role_id=ur.role_id WHERE r.role_name='Admin';
SELECT queue_id, destinatario, asunto, enviado, encolado_date, enviado_date
FROM email_queue ORDER BY queue_id DESC;
```

`enviado=1` significa que el servidor de correo aceptó el envío, no garantiza la ubicación en bandeja de entrada. Los mensajes pueden llegar a spam. Las cuentas `@temp.com` no reciben avisos.
