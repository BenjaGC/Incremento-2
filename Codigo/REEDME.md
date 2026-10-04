# Proyecto para colaboradores

Esta copia incluye el código, las 33 tablas con datos actuales y los archivos de public/uploads y public/manuales. Cada PC tendrá una base independiente; los cambios no se sincronizan con otros equipos.

## Instalar en otro PC

1. Instalar Node.js 20 o superior y MySQL 8.0/8.4. Iniciar el servicio MySQL.
2. Abrir una terminal en esta carpeta y ejecutar: npm ci
3. Copiar .env.example a .env y configurar DB_USER y DB_PASSWORD con las credenciales MySQL de ese PC. DB_NAME debe ser un nombre nuevo, por ejemplo clinica_desarrollo.
4. Ejecutar: npm run db:import
5. Ejecutar: npm start
6. Abrir http://localhost:3000

## Acceso a la aplicación

Todas las cuentas de ESTA COPIA usan la contraseña de desarrollo: Dev-xLoW9--KjaXE

- Benjamin | RUT: 2131636-9 | Rol: Usuario
- benjamin | RUT: 21316363-9 | Rol: Admin

Esta contraseña no es la contraseña de MySQL. Las contraseñas personales y los tokens de sesión fueron sustituidos solo en esta copia. La base original no se modificó.

## Correo e integraciones

Los avisos al administrador están incluidos. Sigue docs/CORREOS-ADMINISTRADOR.md para usar tus propios correos. MAIL_ENABLED=false evita envíos hasta completar esa configuración. Los reportes programados y la URL de integración externa están desactivados en la base de desarrollo; la cola de correos está vacía. Para probar envíos reales, usar una cuenta propia en MAIL_USER/MAIL_PASSWORD y cambiar MAIL_ENABLED=true; las direcciones de los usuarios se conservan, por lo que deben revisarse antes de activar envíos.

## Compartir trabajo

Este paquete contiene registros y adjuntos actuales: compártelo solo con los compañeros autorizados. No se incluyen .env, node_modules, respaldos privados ni logs. No es una versión preparada para publicación en Internet.

Compartir cambios de código mediante Git o los archivos modificados. No reimportar el SQL para cada cambio de código. El importador se niega a sobrescribir bases existentes. Para trabajar sobre los mismos tickets en tiempo real se necesita un servidor común, no copias independientes.
