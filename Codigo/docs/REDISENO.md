# Rediseño de Ticketera Clínica Aconcagua

## Inspección previa

El proyecto utiliza HTML y CSS sin compilador, Alpine.js 3 con un único estado global `app()`, Express 4, MySQL 8, Multer, Nodemailer, Chart.js, jsPDF, PDFKit, QRCode, Archiver y XLSX. Se conserva esta estructura y no se introduce otro framework.

El servidor expone 76 declaraciones de rutas y middleware. Las principales conexiones de la interfaz son `/login`, `/registro`, `/sesion/verificar`, `/incidentes`, `/incidentes/buscar`, `/incidentes/cerrados`, `/incidente`, `/incidente/ver`, `/incidente/comentar`, las acciones de estado y reapertura, `/manuales`, `/prioridades`, `/matriz-categorias`, `/horario-operativo`, `/reportes/*`, `/tickets/riesgo-sla`, `/reportes-programados`, `/feriados`, `/configuracion-externa`, `/insumos/*` y `/equipos/*`. No se modificaron rutas ni consultas del servidor durante el rediseño.

Los roles actuales se conservan: `permisos === 'si'` habilita administración; `esCritico` habilita los recursos técnicos específicos; los demás usuarios disponen de sus tickets, historial y manuales. Los permisos de acciones del detalle siguen utilizando los getters originales (`esAdmin`, `puedeEscribir`, `puedeNotaPrivada`, `puedeReabrir`, etc.).

La interfaz original tenía navegación solo en el perfil, un fondo verde completo, acciones con colores y emojis diferentes, numerosas reglas de estilo incrustadas, administración en una ventana modal y mensajes vacíos con contraste insuficiente. Las herramientas de reportes, inventario, configuración y detalle ya existían.

Se aplicaron las skills `frontend-design` y `redesign-existing-projects`, disponibles también en `C:\Users\gonza\.claude\skills`. La copia de frontend coincide con la disponible en `.agents`. Tras la primera implementación se recibió la imagen de concepto del usuario y se ajustó la interfaz: portal de funcionarios claro con verde petróleo, consola de soporte con navegación azul marino y acciones azules, avatar con iniciales reales, pestañas Activos/Cerrados, filtros rápidos y detalle lateral. Los números, logotipo y tickets ilustrativos de la referencia no se importaron.

## Implementación

- `public/index.html`: navegación lateral adaptable, barra de búsqueda/notificaciones/perfil, bandeja, filtros, estados de carga/error/vacío y administración como página completa. Las otras herramientas mantienen sus formularios y acciones originales.
- `public/css/theme.css`: tokens y componentes comunes, colores solicitados, Arial como única familia de interfaz, tablas, formularios, reportes, detalle, foco visible y adaptación móvil.
- `public/css/legacy-utilities.css`: estilos estáticos extraídos de los elementos originales. Las expresiones `:style` siguen reactivas; las plantillas de documentos exportados permanecen autocontenidas.
- `public/js/ui.js`: extensión de presentación del estado Alpine, filtros locales, bandeja, navegación, nombres de prioridades y mejoras de accesibilidad. Se integra mediante descriptores para conservar los getters reactivos.
- `public/js/app.js`: integración de la extensión de interfaz, errores visibles en la carga de tickets, actualización de la bandeja al crear un incidente y eliminación de marcas decorativas en algunos mensajes. La lógica de negocio permanece en sus métodos originales.

Se corrigió una expresión del detalle que accedía a `usuario.nombre` sin sesión, se evitó la doble inicialización de Alpine, se cerró correctamente el diálogo al cancelar y se destruyen los gráficos mediante `Alpine.raw` para evitar errores de Chart.js al cerrar y reabrir ventanas. Se evita renderizar reportes cuando su ventana ya se cerró durante la carga.
- `public/vendor/icons.svg` y `phosphor-LICENSE`: iconos locales de Phosphor. El pictograma de clínica es un icono de navegación; no se sustituyó un logotipo institucional existente.

Administración conserva sus 15 accesos: siete de reportes y seguimiento, cinco de configuración y tres de recursos técnicos. Los controles se transformaron en botones de teclado sin cambiar los métodos que invocan.

Los resúmenes cuentan exclusivamente `listaTickets`, es decir, la vista seleccionada; no son indicadores globales inventados. La bandeja administrativa usa el listado existente. Para el técnico crítico se limita a sus asignaciones y solicitudes. Los filtros operan sobre esa vista. El SLA muestra la fecha de vencimiento y la alerta que devuelve el servidor, sin introducir otro cálculo ni modificar pausas, prioridades o estados.

Se conserva la búsqueda y el alcance de acceso del sistema original. Este trabajo no constituye una revisión o endurecimiento de la autorización del backend.

## Verificación reproducible

`npm run check` comprueba la sintaxis, incluyendo el archivo de presentación.

`npm run test:ui` crea una base MySQL temporal con nombre `clinica_ui_test_<fecha>`, copia los archivos públicos a una carpeta temporal, arranca el mismo servidor en el puerto 3100 y desactiva el envío de correos solo en ese proceso de pruebas. Crea cuentas y tickets de prueba únicamente allí. Al finalizar elimina esa base y los archivos temporales. Requiere MySQL disponible, credenciales de `.env` con permiso para crear bases y Chromium de Playwright (`npx playwright install chromium`).

El recorrido comprueba login de funcionario, administrador y técnico crítico, permisos visibles, validación y creación de un incidente Hardware, consulta, cambio automático de Pendiente a En curso al verlo el técnico, búsqueda, filtros, historial vacío y con un resuelto, las 15 herramientas administrativas en escritorio y móvil, carga/lectura de un manual PDF temporal y error de red con reintento. Se comprueban errores de JavaScript, respuestas HTTP 500 y desbordamiento del contenedor principal. Las tablas anchas permiten desplazamiento horizontal dentro de su superficie.

`npm run capture:ui` captura la instalación local del puerto 3000 usando una sesión administrativa existente, sin iniciar otra sesión ni modificar tickets. Las capturas de escritorio, administración, historial y móvil se guardan en `artifacts/`. La captura `prueba-detalle.png` procede exclusivamente de la base temporal y contiene datos de prueba; no representa registros de producción.

El resultado de la ejecución funcional queda en `artifacts/verificacion.json`.

## Límites y datos existentes

No se insertaron usuarios, tickets, estadísticas ni catálogos ficticios en `mydb` para el rediseño. Las capturas de la instalación reflejan sus datos actuales, incluidos los estados vacíos.

El SQL aportado inicialmente contiene estructura sin registros. En una reparación posterior solicitada por el usuario se completaron las seis categorías definidas en el formulario, con respaldo previo del catálogo. El servidor deja de utilizar el equipo fijo ID 1 al crear incidentes sin activo especificado: busca o crea el registro correspondiente al aparato seleccionado. Se verificó la persistencia de incidentes en las seis categorías, con y sin activo, en MySQL temporal. El script `scripts/reparar-catalogos.cjs` permite comprobar el catálogo sin sobrescribir categorías incompatibles.

No se enviaron correos ni solicitudes a proveedores externos durante las pruebas. No se verificaron todos los escenarios de cierre/reapertura, descuentos de stock, aprobaciones, exportaciones y ejecuciones programadas con datos operativos reales. Sus métodos y endpoints originales se conservaron.

Se guardó una copia local anterior de HTML, CSS y JavaScript en `.local-backup/`, excluida de Git y fuera de la carpeta pública.
