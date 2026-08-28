# Imladris

**Imladris** es una aplicación personal para llevar el control de tus lecturas: calcula páginas estimadas de un libro a partir de tu progreso en Kindle, guarda un historial de cálculos y organiza tu biblioteca (libros y manga) por año de lectura.

Construida con [Angular](https://angular.dev) y [Angular Material](https://material.angular.io), con un tema oscuro personalizado (tipografía Fraunces + Inter, paleta dorado/vino/verde) y navegación por pestañas.

## Secciones

- **Inicio** (`/`) — página de bienvenida.
- **Calculadora** (`/calculator`)
  - Estima el número de páginas de un libro a partir del total de palabras y capítulos.
  - Calcula en qué página vas según tu posición actual del Kindle.
  - Guarda automáticamente la posición y las páginas totales en `localStorage` para no tener que reintroducirlas.
  - Historial de cálculos realizados, con opción de vaciarlo.
  - Diálogos de confirmación (Angular Material) para acciones de guardado y acciones destructivas.
  - Opción de reiniciar posición y páginas totales guardadas sin afectar al historial.
- **Biblioteca** (`/library`) — catálogo de libros y manga, con datos en `public/data/library/books.json` y `manga.json`. *(en desarrollo)*
- **Lecturas anuales** (`/yearly-readings`) — seguimiento de lo leído por año, con datos en `public/data/yearly-readings/`. *(en desarrollo)*
- **Gestión** (`/management`) — administración de datos de la aplicación. *(en desarrollo)*

## Stack técnico

- Angular 22 (standalone components, signals, `provideZonelessChangeDetection`)
- Angular Material 22 (tema M3 personalizado con paleta propia)
- SCSS con sistema de grid propio de 12 columnas (`src/styles/_grid.scss`)
- Vitest para tests unitarios
- Prettier para formateo (incluye parser Angular para plantillas HTML)

## Desarrollo

Para levantar un servidor de desarrollo local:

```bash
ng serve
```

Una vez iniciado, abre `http://localhost:4200/`. La aplicación se recarga automáticamente al modificar los archivos fuente.

## Scaffolding de código

Angular CLI incluye herramientas de scaffolding. Para generar un nuevo componente:

```bash
ng generate component component-name
```

Para ver todos los esquemas disponibles (`components`, `directives`, `pipes`, etc.):

```bash
ng generate --help
```

## Build

Para compilar el proyecto:

```bash
ng build
```

Los artefactos de compilación se guardan en `dist/`. Por defecto, el build de producción optimiza la aplicación para rendimiento y velocidad.

## Tests unitarios

Los tests se ejecutan con [Vitest](https://vitest.dev/):

```bash
ng test
```

## Tests end-to-end

Angular CLI no incluye un framework de e2e por defecto; puedes añadir el que prefieras.

```bash
ng e2e
```

## Estructura del proyecto

```
src/app/
├── app.ts / app.html / app.css      # Shell de la aplicación (toolbar + navegación por tabs)
├── app.routes.ts                     # Definición de rutas (lazy-loaded)
├── app.config.ts                     # Configuración de la aplicación (router, zoneless, etc.)
├── pages/
│   ├── home/                         # Página de inicio
│   ├── calculator/                   # Calculadora de páginas
│   │   ├── components/
│   │   │   └── calculator-confirm-dialog/   # Diálogo de confirmación reutilizable           
│   ├── library/                      # Biblioteca de libros y manga
│   ├── yearly-readings/              # Lecturas anuales
│   └── management/                   # Gestión de datos
└── shared/
    ├── constants/                    # ROUTES, LANGUAGE, COUNTRY, READING_STATUS, GENRE, DEMOGRAPHIC
    └── models/                       # Volume, Book, Manga, Author, Editorial, CodeLabel, MenuRoute

public/data/
├── library/                          # books.json, manga.json
└── yearly-readings/                  # Lecturas por año (ej. 2026.json)
```

## Recursos adicionales

Para más información sobre Angular CLI y sus comandos, consulta la [documentación oficial](https://angular.dev/tools/cli).
