# Control de recepción — Incremento 2

Origen: `Incremento 2-20261004T220902Z-1-001.zip`. Fecha: 4 de octubre de 2026.

Se recibieron 133 archivos: 111 se incorporaron al repositorio, 1 videos se distribuyen en Releases y 21 archivos se omitieron. El inventario registra la ruta original, destino y SHA-256 de cada copia; las copias adaptadas incluyen sus dos hashes.

Los respaldos temporales .bkp se omitieron. Los nombres se normalizaron para evitar caracteres dañados y espacios finales recibidos del ZIP. Se comprobaron paquetes Word, Excel, PowerPoint y Workbench como ZIP íntegros; los diagramas .drawio como XML. Esta revisión de formato no certifica el contenido académico ni el funcionamiento histórico.

## Ajustes de publicación

- Codigo/.gitignore: reglas de exclusión actualizadas para proteger .env, dependencias y adjuntos privados.

- Base-de-datos/contenido.json: Conteos ajustados a la base publica sin registros privados.
- Codigo/database/contenido.json: Conteos ajustados a la base publica sin registros privados.
- Base-de-datos/clinica-con-datos.sql: Se retiraron registros de: comment, equipment, scheduled_report, ticket, user, user_role
- Codigo/database/clinica-con-datos.sql: Se retiraron registros de: comment, equipment, scheduled_report, ticket, user, user_role

Los dumps clinica-con-datos.sql mantienen su nombre original para conservar las referencias del importador histórico, pero en la copia pública se retiraron registros personales y operativos. Los conteos de contenido.json reflejan esa copia pública.

## Videos recibidos

- Presentacion-Incremento-II.mp4: 860109883 bytes; SHA-256 411870036fff2610e3d6238714a4be437eee89795e6f3e02bd30a5d20c1426ec

Los videos se conservan completos. Las evidencias son las enviadas por el equipo y no se alteraron sus resultados. No se recrearon documentos ausentes ni se reemplazó el código histórico por el Incremento 3.
