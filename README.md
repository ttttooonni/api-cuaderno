# API-CUADERNO

Cuaderno digital de campo para apicultura.

## Principios

- Los datos del apicultor son prioritarios y no se pierden con las actualizaciones.
- IndexedDB es el almacenamiento principal.
- Toda modificación de esquema requiere migración versionada.
- Los backups JSON deben permitir restaurar todos los datos.
- La aplicación debe funcionar offline.
- Las actualizaciones importantes deben mostrar un aviso visible.
- La interfaz está pensada para móvil y trabajo en campo.
- No se modifica el repositorio histórico `mi-apiario`.

## Estado

Proyecto inicializado. La implementación se realizará por etapas y cada etapa deberá pasar sus comprobaciones antes de considerarse válida.

## Arquitectura prevista

UI → lógica de aplicación → repositorios → IndexedDB

La capa de datos queda aislada de la interfaz para facilitar validaciones, migraciones, pruebas y futuras sincronizaciones.

## Dominio previsto

Apiarios, colmenas/núcleos, reinas, inspecciones, acciones históricas, tareas, sanidad, varroa, tratamientos, alimentación, producción, pérdidas, fotografías, material, histórico y copias de seguridad.

## Calidad

La CI deberá ejecutar instalación reproducible, typecheck, tests, lint y build.

> Regla absoluta: ninguna actualización debe eliminar, sustituir, truncar ni alterar silenciosamente datos existentes.
