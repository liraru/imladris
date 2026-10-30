# Imladris — Documentación técnica del proyecto

> Biblioteca personal y registro de lectura (novelas, manga y fanfics) con estética "biblioteca nocturna".
> Aplicación Angular + Supabase, desplegada en GitHub Pages como PWA instalable.

**Alcance y fuentes.** Este documento se ha elaborado a partir del repositorio sincronizado en el conocimiento del proyecto (código fuente, `package.json`, `angular.json`, README, snapshot `Estructura_DB`). En la sección [17. Lagunas y discrepancias detectadas](#17-lagunas-y-discrepancias-detectadas) se indica qué partes no han podido verificarse directamente.

---

## Índice

1. [Visión general](#1-visión-general)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Estructura del repositorio](#3-estructura-del-repositorio)
4. [Configuración, build y despliegue](#4-configuración-build-y-despliegue)
5. [Arranque de la aplicación (bootstrap)](#5-arranque-de-la-aplicación-bootstrap)
6. [Rutas y navegación](#6-rutas-y-navegación)
7. [Autenticación y control de acceso](#7-autenticación-y-control-de-acceso)
8. [Modelo de datos](#8-modelo-de-datos)
9. [Capa de servicios](#9-capa-de-servicios)
10. [Constantes y enumeraciones](#10-constantes-y-enumeraciones)
11. [Páginas y funcionalidades](#11-páginas-y-funcionalidades)
12. [Componentes, directivas, pipes y utilidades compartidas](#12-componentes-directivas-pipes-y-utilidades-compartidas)
13. [Estilos y diseño](#13-estilos-y-diseño)
14. [PWA](#14-pwa)
15. [Persistencia en el navegador (localStorage)](#15-persistencia-en-el-navegador-localstorage)
16. [Convenciones de código y decisiones de producto](#16-convenciones-de-código-y-decisiones-de-producto)
17. [Lagunas y discrepancias detectadas](#17-lagunas-y-discrepancias-detectadas)

---

## 1. Visión general

Imladris es una herramienta personal de **un solo usuario (administrador)** con **lectura pública** para invitados. Permite:

- Catalogar la colección de **novelas** y **tomos de manga**, con autores, editoriales, series, géneros, estado de lectura, fechas y portadas.
- Catalogar **fanfics** (fandoms, ships, rating, palabras, capítulos, etc.).
- Registrar las **lecturas anuales** y su **avance** (página/porcentaje por día), con barra de progreso, gráfico diario y mapa de calor tipo GitHub.
- Mantener un **plan de lectura** ordenable por arrastre.
- Calcular páginas estimadas y página actual a partir de la posición del **Kindle**.
- **Gestionar los datos maestros** (autores, editoriales, series, mangas, fandoms, ships).
- Instalarse como **PWA**.

Datos de partida: aproximadamente 288 novelas y 259 tomos de manga (38 títulos), importados desde `Biblioteca.xlsx`.

### Roles

| Rol | Cómo se obtiene | Permisos |
|---|---|---|
| Invitado | Sin sesión | Solo lectura. No ve botones de escritura, ni las pestañas "Plan de lectura" y "Gestión". |
| Administrador | Sesión de Supabase Auth (`signInWithPassword`) | Lectura y escritura (alta, edición, borrado, registro de avances, descarga de imagen anual). |

---

## 2. Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Angular 22.1 (standalone, signals, zoneless) |
| UI | Angular Material 22 (M3, tema oscuro) + Angular CDK (drag-drop, layout) |
| Lenguaje | TypeScript ~6.0 |
| Estilos | CSS por componente + SCSS global (`src/styles`) |
| Backend | Supabase (Postgres + PostgREST + GoTrue Auth) vía `@supabase/supabase-js` ^2.112 |
| Reactividad | Signals + `toSignal`; RxJS ~7.8 solo donde es necesario |
| Exportación a imagen | `html2canvas` ^1.4 (carga diferida con `import()`) |
| PWA | `@angular/service-worker` |
| Tests | Vitest ^4 + jsdom (`ng test`, builder `@angular/build:unit-test`) |
| Formato | Prettier ^3.8 |
| Gestor de paquetes | npm 11.19 |
| CI/CD | GitHub Actions → GitHub Pages |

Diseño visual: paleta oro/vino; tipografías Fraunces (serif cursiva, títulos) e Inter (sans). Rejilla propia de 12 columnas con breakpoints `sm 576`, `md 768`, `lg 1024`, `xl 1280` px.

---

## 3. Estructura del repositorio

```
.
├── angular.json
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.spec.json
├── ngsw-config.json                      # Configuración del service worker
├── scripts/
│   └── supabase-ping.mjs                 # Ping keep-alive a Supabase
├── .github/workflows/                    # Despliegue a Pages + ping periódico
├── db_scripts/                           # Scripts SQL numerados (00_, 01_, …)
├── public/                               # Assets estáticos (iconos, manifest, logo…)
└── src/
    ├── main.ts                           # Bootstrap + locale es
    ├── index.html
    ├── environments/
    │   ├── environment.ts                # Producción
    │   └── environment.dev.ts            # Desarrollo
    ├── styles/
    │   ├── material-theme.scss           # Tema Material M3
    │   ├── styles.scss                   # Estilos globales
    │   └── _library-card.scss            # Parcial compartido (tarjetas, tablas, preview de portada)
    └── app/
        ├── app.ts / app.html / app.css   # Shell: toolbar + navegación
        ├── app.config.ts                 # Providers globales
        ├── app.routes.ts                 # Rutas lazy
        ├── services/                     # Acceso a datos y servicios transversales
        ├── pages/
        │   ├── home/
        │   ├── calculator/
        │   ├── library/
        │   ├── yearly-readings/
        │   ├── reading-plan/
        │   └── management/
        └── shared/
            ├── adapters/                 # AppDateAdapter
            ├── components/               # login-dialog, reading-* (barra, gráfico, heatmap, form modal)
            ├── constants/                # Enums, etiquetas, rutas, formatos de fecha
            ├── directives/               # CoverPreviewDirective
            ├── guards/                   # adminGuard
            ├── models/                   # Interfaces de dominio + tipos de filas Supabase
            ├── pipes/                    # ThousandsPipe
            ├── utils/                    # confirm-discard.util
            └── validators/               # date-range.validator
```

### Alias de rutas TypeScript

| Alias | Destino |
|---|---|
| `@shared/constants` | `src/app/shared/constants/index.ts` |
| `@shared/models` | `src/app/shared/models/index.ts` |

El barrel `src/app/shared/constants/index.ts` reexporta: `routes`, `languages`, `countries`, `reading-status`, `categories`, `date-formats`, `rating`. **Debe mantenerse actualizado al añadir nuevos ficheros de constantes.**

---

## 4. Configuración, build y despliegue

### Scripts npm

| Script | Comando | Uso |
|---|---|---|
| `start` | `ng serve` | Desarrollo (config `development`) |
| `build` | `ng build` | Build de producción (por defecto) |
| `watch` | `ng build --watch --configuration development` | Build continuo |
| `test` | `ng test` | Tests unitarios (Vitest) |
| `supabase:ping` | `node scripts/supabase-ping.mjs` | Evitar la pausa del proyecto Supabase por inactividad |

### `angular.json` (puntos relevantes)

- Builder: `@angular/build:application`, entrada `src/main.ts`.
- **`baseHref: "/imladris/"`** (la app se sirve bajo ese subpath de GitHub Pages).
- Assets: todo `public/**`.
- Estilos globales: `src/styles/material-theme.scss` y `src/styles/styles.scss`.
- Producción: `outputHashing: all`, `serviceWorker: ngsw-config.json`, presupuestos (inicial 500 kB aviso / 1 MB error; estilo por componente 8 kB aviso / 16 kB error).
- Desarrollo: sin optimización, con source maps, y `fileReplacements` hacia `environment.dev.ts`.

### Entornos

`environment.ts` y `environment.dev.ts` exponen `production`, `supabaseUrl` y `supabaseKey` (clave **publishable/anon**, pensada para ser pública; la seguridad real recae en RLS, ver §7).

### CI/CD

- GitHub Actions despliega a GitHub Pages con `actions/upload-pages-artifact@v3` y `actions/deploy-pages@v4`.
- Workflow `supabase-ping` programado que ejecuta `scripts/supabase-ping.mjs`.

### Orden recomendado de despliegue del control de acceso

1. Crear el usuario administrador en Supabase Auth.
2. Desplegar el frontend con login.
3. Ejecutar el script SQL de RLS (idempotente; hacer antes un `pg_dump` de respaldo).

---

## 5. Arranque de la aplicación (bootstrap)

**`src/main.ts`**: registra el locale `es` (`registerLocaleData(localeEs)`) y arranca `App` con `appConfig`.

**`src/app/app.config.ts`** — providers:

| Provider | Propósito |
|---|---|
| `provideZonelessChangeDetection()` | Detección de cambios sin Zone.js (todo basado en signals) |
| `provideBrowserGlobalErrorListeners()` | Listeners globales de errores |
| `MAT_DATE_LOCALE = 'es-ES'`, `LOCALE_ID = 'es-ES'` | Localización |
| `DateAdapter → AppDateAdapter` | Parseo `dd/MM/yyyy` en datepickers (ver §12) |
| `MAT_DATE_FORMATS → APP_DATE_FORMATS` | Formatos de fecha |
| `provideRouter(routes, withComponentInputBinding())` | Router con binding de parámetros a inputs |
| `provideServiceWorker('ngsw-worker.js', …)` | Activo solo fuera de modo dev; registro `registerWhenStable:30000` |
| `provideAppInitializer(...)` | Instancia `PwaInstallService` y `PwaUpdateService` al inicio (el evento `beforeinstallprompt` se emite una sola vez y pronto) |

> No se usa `provideNativeDateAdapter()`: se reemplazó por `AppDateAdapter` + `MAT_DATE_FORMATS`.

**Shell (`app.ts`)**: toolbar con marca "Imladris" + icono (enlace a Home), pestañas de navegación (`mat-tabs` con `routerLink`), botón de login/logout y menú hamburguesa por debajo de 768 px (en móvil el botón de sesión va dentro del menú). El menú móvil se cierra solo al cambiar de URL (`effect` sobre `NavigationEnd`). Al cerrar sesión estando en `/management` o `/reading-plan` se redirige a `/library`.

---

## 6. Rutas y navegación

Definidas en `app.routes.ts` (todas con `loadComponent`, carga diferida) y `shared/constants/routes.constant.ts`.

| Ruta | Componente | Guard | Visible en menú |
|---|---|---|---|
| `''` (Inicio) | `Home` | — | No (se accede por la marca) |
| `calculator` | `PagesCalculatorComponent` | — | Sí |
| `library` | `Library` | — | Sí |
| `yearly-readings` | `YearlyReadings` | — | Sí |
| `reading-plan` | `ReadingPlan` | `adminGuard` | Solo admin |
| `management` | `Management` | `adminGuard` | Solo admin |
| `**` | redirect a `''` | — | — |

El menú se construye con `APP_ROUTES`, excluyendo `HOME` y, si no hay sesión de admin, `MANAGEMENT` y `READING_PLAN` (`ADMIN_ONLY_ROUTE_KEYS`).

---

## 7. Autenticación y control de acceso

### Frontend

- **`SupabaseService`**: único punto de creación del cliente (`createClient`), con `persistSession: true`, `autoRefreshToken: true`, `detectSessionInUrl: false`. Todos los servicios lo inyectan.
- **`AuthService`**:
  - `_session` (signal), `isAdmin = computed(() => session !== null)`, `initialized`, y `ready: Promise<void>` que se resuelve cuando se ha leído la sesión guardada.
  - `signIn(email, password)` y `signOut()`; escucha `onAuthStateChange`.
  - Modelo de un solo usuario: **cualquier sesión activa implica permisos de escritura**.
- **`adminGuard`**: espera `authService.ready`; si no es admin redirige a `/library`.
- **`LoginDialog`**: formulario reactivo (email + contraseña) con mensaje genérico "Usuario o contraseña incorrectos."
- Todos los botones y modales de escritura se envuelven en `@if (authService.isAdmin())`, y los métodos de escritura de los componentes devuelven pronto si no hay sesión.

### Backend (la capa de seguridad real)

El bundle de Angular es público en GitHub Pages, por lo que **los guards de Angular no son seguridad**. La protección está en **RLS de Postgres** validando el JWT de Auth: cuatro políticas por tabla — `public_select`, `admin_insert`, `admin_update`, `admin_delete` — que sustituyen a las antiguas permisivas `using (true)`.

---

## 8. Modelo de datos

### 8.1 Tablas (Supabase / Postgres)

> Región `eu-west-1`. Las columnas se derivan del snapshot `Estructura_DB` y de los tipos de fila en `shared/models/supabase.types.ts`. Las tablas marcadas con † no aparecen en el snapshot (posterior a ellas) y se infieren del código.

**Catálogo (maestros)**

| Tabla | Campos | Notas |
|---|---|---|
| `authors` | `id`, `name`, `country` (enum), `notes`, `created_at` | |
| `editorials` | `id`, `name`, `country` (enum), `website`, `logo`, `created_at` | |
| `book_series` | `id`, `title`, `editorial_id`, `created_at` | Series de novelas |
| `mangas` | `id`, `title`, `demographic` (enum), `created_at` | El "manga" como obra; los tomos cuelgan de él |
| `fandoms` † | `id`, `name`, `origin` | |
| `ships` † | `id`, `fandom_id`, `characters` (text[]) | |

**Contenido**

| Tabla | Campos clave |
|---|---|
| `books` | `id`, `title`, `reading_status` (enum, def. `not_started`), `release_date`, `cover_image_url`, `adquisition_date`, `start_date`, `finish_date`, `notes`, `language` (enum), `editorial_id`, `serie_id`, `serie_volume`, `created_at` |
| `manga_volumes` | `id`, `title`, `manga_id`, `volume_number`, `reading_status`, fechas, `cover_image_url`, `notes`, `language`, `editorial_id`, `created_at` |
| `fanfics` † | `id`, `title`, `authors` (text[]), `rating`, `words`, `chapters`, `pages`, `reading_status`, fechas, `trigger_warnings` (text[]), `language`, `tags` (text[]), `summary`, `file_url`, `original_url`, `cover_url`, `notes` |

> En `books` y `manga_volumes` las columnas de fecha son de tipo **`text`** (formato `yyyy-mm-dd`), no `date`.

**Tablas puente (N:M)**

| Tabla | Relaciona |
|---|---|
| `book_authors` | `book_id` ↔ `author_id` |
| `book_genres` | `book_id` ↔ `genre` (enum) |
| `manga_authors` | `manga_id` ↔ `author_id` |
| `manga_genres` | `manga_id` ↔ `genre` |
| `manga_volume_authors` | `manga_volume_id` ↔ `author_id` |
| `fanfic_fandoms` † | `fanfic_id` ↔ `fandom_id` |
| `fanfic_ships` † | `fanfic_id` ↔ `ship_id` |

**Lecturas**

| Tabla | Campos | Notas |
|---|---|---|
| `yearly_readings` | `id`, `year` (smallint), `title`, `authors` (text[]), `pages`, `start_date` (date), `end_date` (date), `cover_url`, `created_at` | `end_date` **nullable** en el modelo actual: sin fecha de fin = "leyendo" |
| `reading_progress` † | `id`, `reading_id` → `yearly_readings`, `record_date`, `page`, `percentage`, `pages_advanced` | RLS igual que `yearly_readings` |
| `reading_plan` † | `id`, `title`, `authors` (text[]), `pages`, `cover_url`, `order` | Cola ordenable |

**Vistas:** `books_view` y `manga_view` (columnas con alias en español: Título, Autor, Serie, Número de volumen, Notas, Editorial, Fecha de adquisición, Fecha fin lectura, Estado, Portada…). Se usan para consulta/exportación; la aplicación Angular no las consume.

**Borrado en cascada:** al borrar un `book` se eliminan `book_authors` y `book_genres`; al borrar un `manga` se eliminan `manga_authors`, `manga_genres` y `manga_volumes`.

### 8.2 Interfaces de dominio (`shared/models`)

```ts
Volume            { id, title, authors: Author[], readingStatus, releaseDate?, coverImageUrl?,
                    adquisitionDate?, startDate?, finishDate?, notes?, language, editorial }
Book extends Volume       { serie?: BookSerie, serieVolume?, genres: GENRE[] }
BookSerie         { id, title, editorial }
Manga             { id, title, authors, demographic, genres }
MangaVolume extends Volume { mangaId, volumeNumber? }
Fanfic            { id, title, authors: string[], fandoms: Fandom[], ships: Ship[], rating, words,
                    chapters, pages?, readingStatus, releaseDate?, adquisitionDate?, startDate?,
                    finishDate?, triggerWarnings?, language, tags?, summary?, fileUrl?, originalUrl?,
                    coverUrl?, notes? }
Fandom            { id, name, origin }
Ship              { id, characters: string[], fandom }
YearlyReading     { id, year, title, authors: string[], pages, startDate, endDate (nullable), coverUrl }
ReadingProgress   { id, readingId, recordDate, page, percentage, pagesAdvanced }
ReadingPlanItem   { id, title, authors: string[], pages, coverUrl, order }
Author / Editorial / CodeLabel / MenuRoute
```

Las fechas de dominio son cadenas `yyyy-mm-dd`. `supabase.types.ts` define las filas crudas (`BookRow`, `MangaVolumeRow`, `YearlyReadingRow`, `ReadingProgressRow`, `ReadingPlanRow`, `FanficRow`, `FandomRow`, `ShipRow`, `AuthorRow`, `EditorialRow`, `BookSerieRow`, `MangaRow`).

### 8.3 Modelos específicos de feature

- **`LibraryItem`** (`pages/library/models`): vista unificada de libro/tomo para la UI. `fromBook(book)` y `fromMangaVolume(volume, mangaTitle)`. Para manga, `serieId`/`serieTitle` son el `mangaId` y el nombre del manga; el título del tomo se compone como `"<título> vol.<n>"`, o `"<título> - <notas>"` si no hay número.
- **`HomeItem`** (`pages/home/models`): versión mínima para "Últimas incorporaciones" (`HOME_ITEM_TYPE.BOOK | MANGA`), deliberadamente desacoplada de `LibraryItem`.
- **`LibraryFilters` / `FanficFilters`** con sus `DEFAULT_*`.
- **`MasterColumn<T>`** (`pages/management/models`): `{ key, header, value: (item) => string }`.

---

## 9. Capa de servicios

Todos son `@Injectable({ providedIn: 'root' })`, `async/await`, lanzan el `error` de Supabase y mapean fila → dominio con funciones `toXxx()` / `toRow()`.

| Servicio | Tabla(s) | Responsabilidad |
|---|---|---|
| `SupabaseService` | — | Cliente único de Supabase |
| `AuthService` | Auth | Sesión admin (signals) |
| `AuthorService` | `authors` | CRUD; `getUsedIds()` (en `book_authors`, `manga_authors`, `manga_volume_authors`); `getUsageCounts()` |
| `EditorialService` | `editorials` | CRUD; `getUsedIds()` (`books`, `manga_volumes`, `book_series`); `getUsageCounts()` (libros + tomos) |
| `BookSerieService` | `book_series` | CRUD (con `editorial:editorials(*)`); `getUsedIds()`/`getUsageCounts()` vía `books.serie_id` |
| `MangaService` | `mangas` | CRUD; sincroniza `manga_authors` y `manga_genres`; `getUsedIds()`/`getUsageCounts()` vía `manga_volumes.manga_id` |
| `BookService` | `books` (+ puentes) | `getAll`, `getById`, `create`, `update`, `remove`; `syncAuthors`/`syncGenres` |
| `MangaVolumeService` | `manga_volumes` (+ `manga_volume_authors`) | Igual patrón que `BookService` |
| `FandomService` | `fandoms` | CRUD; `getUsedIds()` (`fanfic_fandoms` + `ships`); `getUsageCounts()` |
| `ShipService` | `ships` | CRUD con fandom embebido; `getByFandom`; `getUsedIds()`/`getUsageCounts()` vía `fanfic_ships` |
| `FanficService` | `fanfics` (+ `fanfic_fandoms`, `fanfic_ships`) | CRUD; `_syncFandoms`/`_syncShips` |
| `YearlyReadingService` | `yearly_readings` | `getAll`, `getByYear`, `getRecent(limit)`, `getInProgress(limit?)`, `getById`, CRUD |
| `ReadingProgressService` | `reading_progress` | `getByReadingId`, `getLatestPercentages(ids)`, `getPagesByDay(from)`, `create`, `update`, `remove`; señal `progressChanged` |
| `ReadingPlanService` | `reading_plan` | CRUD + `reorder(updates)` |
| `PwaInstallService` | — | Captura `beforeinstallprompt`; `canInstall`, `install()` |
| `PwaUpdateService` | — | Aviso de nueva versión (snackbar "Recargar") y `checkForUpdate` al volver a la pestaña |

### Patrones recurrentes

- **Selects con relaciones embebidas**, p. ej. en libros:
  ```
  *, editorial:editorials(*), serie:book_series(*, editorial:editorials(*)),
  book_authors(author:authors(*)), book_genres(genre)
  ```
- **Tablas N:M**: en cada alta/edición se hace *delete-and-reinsert* de la tabla puente (`syncAuthors`, `syncGenres`, …). En `update`, solo se sincroniza si el campo viene definido.
- **`toDateString(date)`** en `BookService`, `MangaVolumeService` y `FanficService` construye `yyyy-MM-dd` con año/mes/día **locales** (no `toISOString().slice(0,10)`, que introducía un desfase UTC).
- **Bloqueo de borrado de maestros**: `getUsedIds()` devuelve el conjunto de ids en uso; la UI deshabilita "Eliminar" y vuelve a comprobarlo justo antes de borrar.
- **Filtrado en cliente**: ~300 registros se cargan una vez en un `signal` y `computed()` filtra/ordena sin más viajes a Supabase.

### `ReadingProgressService` en detalle

- `create/update` reciben `totalPages` y un `ReadingProgressInput` con **solo uno** de `page` o `percentage`; el otro se calcula (`percentage = round(page/total·10000)/100`; `page = round(percentage/100·total)`). Si no llega ninguno, lanza error.
- Tras cada alta/edición/borrado se ejecuta **`_recalculateChain(readingId)`**: recorre los avances ordenados por `record_date`, `id` y recalcula `pages_advanced = page − páginaAnterior`, actualizando solo las filas que cambian. Así la cadena queda consistente aunque se toque un registro intermedio.
- `progressChanged` (signal numérico) se incrementa tras cada cambio; el mapa de calor de Home lo observa para recargarse sin acoplarse a quien lo originó.
- `getLatestPercentages` hace una sola consulta ordenada y se queda con el último valor por lectura en cliente.

---

## 10. Constantes y enumeraciones

Ubicación: `src/app/shared/constants/` (globales) y `…/pages/*/constants/` (de feature).

| Constante | Valores |
|---|---|
| `ROUTES` | `''`, `calculator`, `library`, `yearly-readings`, `reading-plan`, `management` (+ `APP_ROUTES` con títulos) |
| `READING_STATUS` | `not_started`, `reading`, `finished`, `abandoned` (etiquetas: No empezado / Leyendo / Finalizado / Abandonado) |
| `LANGUAGE` | `ES`, `EN`, `GL` (`GAL`), `JP` |
| `COUNTRY` | `ES`, `GB`, `US`, `JP`, `FR`, `DE`, `CN`, `KR`, `RU` |
| `DEMOGRAPHIC` | `shonen`, `shojo`, `seinen`, `josei`, `kodomo` |
| `GENRE` | 23 valores: `action`, `adventure`, `bl`, `comedy`, `danmei`, `drama`, `fantasy`, `horror`, `mystery`, `psychological`, `romance`, `sci_fi`, `slice_of_life`, `sports`, `supernatural`, `thriller`, `isekai`, `mecha`, `historical`, `ecchi`, `harem`, `yaoi`, `yuri` |
| `RATING` | `NR`, `G`, `T`, `M`, `E` + `RATING_LABELS`, `RATING_SHORT_LABELS`, `RATING_COLORS` (verde→rojo; NR gris) |
| `APP_DATE_FORMATS` | Formatos de fecha de Material (`dd/MM/yyyy`) |

**Biblioteca** (`library.constants.ts`): `MODE` (GALLERY/TABLE), `TYPE` (BOOK/MANGA), `LIBRARY_TAB` (BOOK/MANGA/FANFIC) + `LIBRARY_TABS` + `tabToType()`, `SORT_FIELD` (`title`, `author`, `serie`, `volumeNumber`, `finishDate`, `adquisitionDate`, `releaseDate`, `notes`), `DEFAULT_SORT_BY` (autor → serie/manga → nº volumen → título → notas, para libros y manga), `DEFAULT_SORT_DIRECTION = 'asc'`.

**Fanfic** (`fanfic.constants.ts`): `FANFIC_SORT_FIELD` (`title`, `author`, `fandom`, `ship`, `rating`, `words`, `chapters`, `finishDate`, `adquisitionDate`); por defecto fandom ascendente, con desempate por título en el comparador de `fanfic-section.ts`.

**Formularios** (`library-form.constants.ts`, `management-form.constants.ts`): `FORM_MODE` con `ALTA` y `EDICION` (el antiguo modo `DETALLE` fue eliminado) + `FORM_MODE_LABELS`.

**Gestión** (`management-menu.constants.ts`): `MANAGEMENT_MASTER` (AUTHORS, EDITORIALS, BOOK_SERIES, MANGAS, FANDOMS, SHIPS) y `MANAGEMENT_MENU_ENTRIES` (etiqueta + icono Material).

---

## 11. Páginas y funcionalidades

### 11.1 Home (`/`)

Ficheros: `home.ts/html/css`, `models/home-item.model.ts`.

Contenido (orden actual):

1. **Cabecera**: icono, "Biblioteca nocturna" (centrada).
2. **Actividad de lectura** (`ReadingHeatmap`) con resumen debajo (días con lectura, racha más larga, mes con más páginas, media de páginas por día de lectura) y panel "En cifras" (páginas del último año, racha actual…).
3. **Leyendo**: una tarjeta destacada (`reading-hero`) por cada lectura en curso: portada con fondo difuminado, porcentaje, páginas leídas/totales, días leyendo, **fin estimado** (según ritmo medio desde el inicio), `ReadingDailyChart` ("Páginas por día"), y para admin menú con **Añadir** (registrar avance) e **Historial**.
4. **Últimas lecturas**: lecturas finalizadas más recientes (sin barra de progreso ni registrar avance); muestra la fecha de finalización.
5. **Últimas incorporaciones**: libros y tomos por fecha de adquisición, con badge "Leído" si procede.

Detalles:
- Nº de entradas de secciones fijas: **5 en escritorio, 4 en móvil** (`BreakpointObserver` a 767 px).
- Carga paralela: lecturas + libros + tomos (`Promise.all`); porcentajes de las lecturas en curso; actividad (`getPagesByDay` desde "hoy hace un año + 1 día").
- Tras registrar/editar un avance, la lectura y el heatmap se refrescan sin spinner.
- Los **tooltips de páginas leídas** (heatmap y gráfico diario) solo aparecen si hay sesión de admin.
- Layout en dos columnas con barra lateral (`home__aside`) en escritorio; la tarjeta "Leyendo" se reorganiza en móvil.

### 11.2 Calculadora (`/calculator`)

`PagesCalculatorComponent` + `CalculatorConfirmDialog`.

- **Bloque I – Páginas totales:** `Math.ceil(palabras / 300 + capítulos × 0.6)`. Tras calcular, un diálogo pregunta si guardar el valor como "páginas totales" para el bloque II.
- **Bloque II – Página actual:** `Math.round(posiciónActual / (posiciónTotal / páginasTotales))`.
- **Historial** de cálculos (con opción de vaciarlo) y botón de **reiniciar** posición total y páginas totales (no afecta al historial).
- Estado persistente en `localStorage` (clave `folio:kindle-data`, compartida con la modal de avance, ver §15).
- Layout con la rejilla de 12 columnas (`col-12 col-lg-4` / `col-lg-8`).

### 11.3 Biblioteca (`/library`)

Pestañas superiores: **Novelas · Manga · Fanfic** (persistidas en `localStorage`). Cabecera común con botón "Añadir" que delega en el formulario de libro/tomo o en el de fanfic según la pestaña.

**Novelas y manga** (`Library`, `LibrarySearch`, `LibraryDataDisplay`):
- Fuente de datos: `books` o `manga_volumes` (según `TYPE`), cargados a signals; filtrado y ordenación en un `computed` (`applyFilters`).
- **Filtros** (`LibrarySearch`, formulario reactivo con campos de autocompletado fuera del `FormGroup`): título, autor, serie, manga, editorial, estado de lectura, año de finalización, año de adquisición, modo (galería/tabla) y criterios de orden. Se persisten en `localStorage` (clave `imladris:library-filters`) con validación defensiva al restaurar; los ids guardados se resuelven a objetos cuando termina la carga de maestros. Contador de filtros activos y panel desplegable.
- **Orden multicriterio**: `mat-select multiple` reordena por posición de opción, no por orden de clic; se usa un signal `manualSortOrder` actualizado vía `onSelectionChange` (con `isUserInput`) como fuente de verdad.
- **Vista galería**: tarjetas (`.library-card`) con portada, título, autor, metadatos; clic abre la **ficha de detalle**.
- **Vista tabla** (`mat-table`, clase `library-table`): columnas `cover, title, authors, editorial, serie, genres, readingStatus, releaseDate, adquisitionDate, startDate, finishDate, language, notes, actions`. Estilo idéntico para novelas y manga; sin bordes entre filas (dos tonos alternos + resalte al pasar el ratón); botones de acción solo-icono; portada ampliada al hover (`CoverPreviewDirective`).
- **Menú contextual (admin)**: Editar · Marcar como leído · Eliminar.
- **Detalle** (`LibraryDetailModal`): ficha HTML de solo lectura; botón "Editar" abre el formulario.
- **Formulario** (`LibraryFormModal`, 760 px, `disableClose`): alta/edición para libro o tomo; autocompletado de autores (chips), editorial, serie (libros) y manga (tomos); permite crear sobre la marcha manga/serie/autor/editorial; pregunta "¿Deseas irte sin guardar?" si hay cambios.
- **Eliminar**: `LibraryDeleteDialog` de confirmación.
- **Marcar como leído**: carga la entidad, la actualiza con `READING_STATUS.FINISHED` y `finishDate = hoy`.

**Fanfic** (`FanficSection`, `FanficSearch`, `FanficDataDisplay`, `FanficFormModal`, `FanficDetailModal`):
- Misma arquitectura (galería/tabla, filtros, detalle + editar), propia de `Fanfic`.
- Tabla: `cover, title, authors, fandom, ship, rating, words, chapters, readingStatus, adquisitionDate, finishDate, actions`.
- Tarjeta de galería: badge de **rating** con color, fandom como etiqueta discreta sobre el título y ship destacado bajo él (cursiva/acento).
- En el formulario, **páginas se calcula solas** (`ceil(palabras/300 + capítulos·0.6)`) con `computed()` + `effect()`; el control `pages` está deshabilitado pero se guarda con `getRawValue()`. Hace falta al menos un fandom y un ship; los ships ofrecidos son solo los de los fandoms elegidos.
- La validez del formulario se expone como signal (`toSignal(form.statusChanges)`) para que `canSubmit` se recalcule correctamente.

### 11.4 Lecturas anuales (`/yearly-readings`)

- Selector de año (`YearlyReadingsSearch`); años disponibles derivados de los datos.
- "Estantería" de portadas por año. Lecturas en curso (sin `endDate`) muestran badge **Leyendo** y `ReadingProgressBar` bajo la portada; las finalizadas, su fecha de fin.
- Cada tarjeta muestra fecha/estado, páginas (icono `auto_stories` + separador de miles) , título y autores.
- **Clic en la tarjeta** → `ReadingDetailModal` (detalle + `ReadingDailyChart`; botón "Editar" solo admin).
- **Menú contextual**: Ver detalle · Editar (admin) · Registrar avance (admin, solo si no finalizada) · Histórico de avances · *(divisor)* Eliminar (admin).
- **`ReadingProgressHistoryModal`**: tabla de avances (orden por fecha: descendente si en curso, ascendente si finalizada; invertible en cabecera); registrar/editar/eliminar solo admin y solo mientras la lectura no esté finalizada.
- **`ReadingProgressFormModal`** (`shared`): fecha, página y porcentaje con cálculo bidireccional en caliente; fecha limitada al rango inicio–fin de la lectura; check "marcar como completado" (100 %, total de páginas y `endDate` = fecha del registro); panel desplegable de **calculadora Kindle** (ver §11.2) que al aplicar la página calculada se oculta solo.
- **`YearlyReadingsFormModal`**: título, autores (separados por comas), páginas, fechas (validador de rango), URL de portada y **autocompletado "Buscar en la biblioteca"** (libros, tomos de manga y fanfics; solo los fanfics aportan `pages`).
- **Descarga de imagen del año (admin)**: `html2canvas` (import dinámico) sobre `captureArea`, fondo `#17171f`, escala 2, ancho de ventana ≥ 1440 para renderizar siempre en modo escritorio; 7 carátulas por fila; cabecera "Lecturas de AAAA · n lecturas · n páginas" visible solo en la captura (se activa un signal, se espera un tick, se captura y se oculta). Descarga `imladris-lecturas-AAAA.png`.
- Eliminar usa `confirm()` nativo.

### 11.5 Plan de lectura (`/reading-plan`, solo admin)

- Lista sin paginación, ordenada por `order`, con **arrastrar y soltar** (CDK `CdkDropList`/`CdkDrag`/`CdkDragHandle`). Al soltar se reordena en local y se persiste solo el **tramo afectado** (`reorder`).
- Miniatura de portada que se amplía al pasar el ratón.
- **Añadir/Editar** (`ReadingPlanFormModal`): igual que el de lecturas anuales sin fechas ni `order`; el `order` de un alta es el último de la cola (`items.length`). Incluye autocompletado desde la biblioteca.
- **Enviar a Lecturas anuales** (`SendToYearlyReadingModal`): pide fecha de inicio (hoy por defecto) y de fin (vacía por defecto, con validador de rango); crea la lectura con `year` = año de inicio, copia título/autores/páginas/portada y **elimina el ítem del plan**.
- Botones editar/borrar con el mismo estilo que Gestión; responsive.

### 11.6 Gestión (`/management`, solo admin)

- Contenedor con `mat-sidenav` colapsable (en móvil, menú superpuesto bajo 768 px) y una entrada por maestro: **Autores, Editoriales, Series, Mangas, Fandoms, Ships**. Incluye el botón **Instalar aplicación** (PWA) cuando `canInstall()`.
- Cada maestro es un componente que usa **`MasterDataTable<T>`** genérica: columnas declaradas con `MasterColumn`, filtro en caliente por cualquier columna, paginación en cliente de **25** por página, botones editar/borrar sin borde, y columna **"Registros"** con el nº de usos.
- Un maestro **en uso no se puede eliminar** (botón deshabilitado con tooltip "En uso: no se puede eliminar"); se revalida contra la BD antes de borrar.
- Cada maestro tiene su modal de alta/edición (`AuthorFormModal`, `BookSerieFormModal`, `MangaFormModal`, `ShipFormModal`, …), con confirmación de descarte.
- `countries/` existe como componente vacío (sin uso aparente).

---

## 12. Componentes, directivas, pipes y utilidades compartidas

| Elemento | Descripción |
|---|---|
| `LoginDialog` | Diálogo de acceso (formulario reactivo, mostrar/ocultar contraseña, spinner) |
| `ReadingProgressBar` | Barra de porcentaje absolutamente posicionada (`:host` abajo) **dentro** del contenedor de portada |
| `ReadingDailyChart` | Gráfico de barras "Páginas por día" desde el inicio hasta hoy/fin; columnas de 6–28 px con 2 px de separación, scroll horizontal arrastrable, medido con `ResizeObserver`, altura relativa al máximo (mínimo 4 %); acepta `reading` como input |
| `ReadingHeatmap` | Mapa de calor tipo GitHub; celdas fijas 12×12 px; semanas desde el lunes; último día = hoy y primer día = hoy −1 año + 1 día (móvil: 4 meses); no etiqueta el primer mes si le quedan < 15 días; tooltip con páginas y fecha; resumen estadístico |
| `ReadingProgressFormModal` | Alta/edición de avances (ver §11.4) |
| `CoverPreviewDirective` (`img[appCoverPreview]`) | Overlay ampliado de portada al hover; solo en dispositivos con hover real; estilos globales `.cover-hover-preview` |
| `ThousandsPipe` | Separador de miles en formato español |
| `AppDateAdapter` | Extiende `NativeDateAdapter`; `parse()` con regex `dd/MM/yyyy` o `dd-MM-yyyy`, rechazando fechas "redondeadas" (31/02). **No declarar constructor propio** (usa `inject()` internamente) |
| `adminGuard` | `CanActivateFn` (ver §7) |
| `dateRangeValidator(start, end)` | Error `dateRangeInvalid` si fin < inicio |
| `confirmDiscardChanges(dialog, form)` | Devuelve `Promise<boolean>`; pregunta "¿Deseas irte sin guardar?" si el formulario está modificado. Uso: `if (await confirmDiscardChanges(this._dialog, this.form)) { dialogRef.close(...) }` |

---

## 13. Estilos y diseño

- **Tema**: `src/styles/material-theme.scss` (Material M3, oscuro). Paleta oro/vino; fondo `#0d0d12` (`theme-color`), superficie de captura `#17171f`.
- **Globales** (`styles.scss`): rejilla de 12 columnas, `.container`, cabecera de página compartida (`.page-header` con `.kicker` + `h1`), overrides de Material, scrollbar muy fina (3 px, color derivado de `--mat-sys-on-surface` al 25 %), estilos del sufijo de texto de la modal de avance y títulos de diálogo (con `!important` porque `.mat-mdc-dialog-title` los sobrescribe).
- **Parcial compartido** `_library-card.scss`: `.library-gallery`, `.library-card*` (incluye `__fandom-tag`, `__ship`, `__rating-badge`, `__menu-trigger`), tablas `library-table`, overlay de preview de portada. **Las clases compartidas entre componentes hermanos deben vivir aquí**, no en el CSS de uno de ellos (encapsulación de Angular).
- **Menú de tarjeta**: `.library-card__menu-trigger` lleva `position/top/right/left` con `!important` porque Material aplica reglas con doble clase (`.mat-mdc-icon-button.mdc-icon-button`) de mayor especificidad; **no quitarlos**.
- **Convenciones**: BEM con `&__`, custom properties en `:host`, `ChangeDetectionStrategy.OnPush`, modales a pantalla completa en móvil.
- **Páginas**: no usar `.container` (ancho máx. 1280 px centrado) en desktop; referencia = Lecturas anuales (ancho completo con el padding de `.app-content`). La calculadora sí usa `.container`.
- **Navbar**: hamburguesa bajo 768 px; botón plano (`mat-icon-button`) sin fondo.

---

## 14. PWA

- `index.html`: `lang="es"`, `theme-color`, `manifest.webmanifest`, `apple-touch-icon`, fuentes (Roboto y Material Icons desde Google Fonts).
- `ngsw-config.json` + `provideServiceWorker` (desactivado en dev).
- **`PwaInstallService`**: guarda el evento `beforeinstallprompt` (con `preventDefault()` para no mostrar la mini-barra), detecta modo standalone y `appinstalled`; la instalación se lanza desde Gestión.
- **`PwaUpdateService`**: cuando el SW tiene `VERSION_READY` muestra un snackbar "Hay una nueva versión de Imladris disponible." con acción "Recargar" (`activateUpdate()` + `reload`); además llama a `checkForUpdate()` cuando la pestaña vuelve a ser visible.
- Decisión de producto: PWA elegida frente a Tauri/Electron/Capacitor.

---

## 15. Persistencia en el navegador (localStorage)

| Clave | Contenido | Dónde |
|---|---|---|
| `imladris:library-filters` | Filtros/orden/modo/tipo de la biblioteca | `LibrarySearch` |
| (clave de pestaña activa, constante `ACTIVE_TAB_STORAGE_KEY`) | Pestaña activa de Biblioteca | `Library` |
| `folio:kindle-data` | Estado de la calculadora (posición total, páginas totales, historial) | `PagesCalculatorComponent` y `ReadingProgressFormModal` (solo `totalPosition`, preservando el resto de campos al guardar) |
| Sesión Supabase | Token de Auth (gestionado por `supabase-js`) | `SupabaseService` |

Todas las lecturas/escrituras van en `try/catch` con degradación silenciosa.

---

## 16. Convenciones de código y decisiones de producto

### Angular

- Componentes **standalone** (sin declarar `standalone: true`, ya es el valor por defecto) y **OnPush**.
- `signal()`, `computed()`, `toSignal()`, `effect()`; inputs con **`input()`**/`input.required()` y outputs con `output()` (no `@Input`/`@Output`).
- Formularios reactivos; los campos de autocompletado usan `FormControl` **fuera del `FormGroup` principal**.
- Rutas lazy con `loadComponent`.
- Inyección con `inject()`; servicios privados con prefijo `_` en componentes.
- **`form.invalid`/`form.valid` no son signals**: dentro de un `computed()` no registran dependencia. Usar `toSignal(form.statusChanges, { initialValue: form.status })`.
- Todo botón guardar/aceptar de formularios incluye `form.invalid` en `[disabled]` además de `saving()`/`loading()`.
- Modal con cambios sin guardar → `confirmDiscardChanges` en cerrar/cancelar/clic fuera/Escape.
- `mat-menu`: los `(click)` de `mat-menu-item` **no** llevan `stopPropagation()`; solo el botón disparador (`matMenuTriggerFor`).
- La ficha de detalle (`*-detail-modal`) es de solo lectura; "Editar" devuelve `{ edit: true }` y el llamante abre el formulario. Mismo patrón en Biblioteca, Fanfic y Lecturas anuales.

### Datos

- Servicios con `toXxx()`/`toRow()`; N:M por sync (delete + reinsert).
- Fechas de dominio como `yyyy-mm-dd`; construir con getters **locales**.
- Filtrar/ordenar en cliente con `computed()`.
- Idempotencia de seeds SQL: tras `INSERT … WHERE NOT EXISTS`, un `UPDATE … WHERE campo IS NULL` para parchear filas previas.

### Estructura

- El nombre `library.consants.ts` conserva una errata de forma intencionada (si existe en el repo; en el código actual el fichero consultado es `library.constants.ts`, ver §17).
- Mantener el barrel `shared/constants/index.ts`.
- Los componentes nuevos no declaran `standalone: true`.

### Reglas de producto relevantes

**Lecturas anuales / progreso**
- `end_date` es opcional: sin fecha de fin = en curso.
- Orden base de Lecturas anuales: fecha de fin → id; las que no tienen fecha de fin van al final por id. En Home el orden es el inverso.
- Lecturas finalizadas: sin barra de progreso, sin "Registrar avance", histórico solo lectura; la ficha de detalle muestra el gráfico "Páginas por día".
- Solo el admin crea/edita/borra `reading_progress`; el progreso es visible para invitados.
- Imagen exportada: 7 carátulas por fila, margen mínimo de 3 rem, tamaño de carátula igual al de la vista normal.
- `html2canvas` no captura `display:none`: para contenido solo-captura, alternar signal → esperar tick → capturar → ocultar.

**Biblioteca**
- Detalle al clicar tarjeta/fila; menú contextual con "Editar" (no "Ver detalle").
- Tablas de novelas y manga con estilo idéntico y mismo set de acciones ("Marcar como leído" en ambas).
- Orden de fanfics por defecto: fandom → título.

**Gestión**
- Un componente por maestro, tabla paginada a 25, filtro en caliente, columna de usos, borrado bloqueado si está en uso.

**Plan de lectura**
- Solo admin; `order` numérico; enviar a Lecturas anuales mueve el registro.

**Móvil**
- Todas las modales a pantalla completa; navbar con hamburguesa; botón de sesión dentro del menú.

---

## 17. Lagunas y discrepancias detectadas

**No verificado directamente en esta revisión** (no recuperado del repositorio indexado): contenido de `db_scripts/`, `.github/workflows/*.yml`, `ngsw-config.json`, `manifest.webmanifest`, `scripts/supabase-ping.mjs`, `styles.scss`/`material-theme.scss` en su totalidad, y el código interno de algunos componentes menores (`library-detail-modal`, `library-delete-dialog`, `fanfic-search`, `yearly-readings-search`, `reading-plan-form-modal`, `editorials`, `fandoms`, formularios de editorial/fandom, `MangaService` completo). Su descripción en este documento se basa en cómo los usan los componentes que sí se revisaron y en las decisiones de producto registradas.

**Discrepancias entre documentos y código:**

1. **`Estructura_DB` está desactualizado**: no incluye `fanfics`, `fandoms`, `ships`, `fanfic_fandoms`, `fanfic_ships`, `reading_progress` ni `reading_plan`, y marca `yearly_readings.end_date` como `NOT NULL`, cuando el código lo trata como opcional. Conviene regenerarlo.
2. **`README.md` es el generado por Angular CLI** y su sección "Estructura del proyecto" está obsoleta (menciona `public/data/library/books.json`, `manga.json` y `public/data/yearly-readings/…`, que ya no son la fuente de datos; faltan `reading-plan`, servicios, etc.). Este documento puede sustituirla.
3. **`environment.ts` → `environment.ts`**: en la configuración `production` de `angular.json`, el `fileReplacements` reemplaza el fichero por sí mismo (no tiene efecto). Funciona porque `environment.ts` ya es el de producción, pero es redundante.
4. **`adminGuard`**: su comentario dice proteger solo `/management`, pero se aplica también a `/reading-plan`.
5. **`library.consants.ts`**: la convención recoge una errata intencionada en ese nombre, pero el fichero recuperado es `library.constants.ts`; conviene confirmar cuál es el nombre real en el repo.
6. **`countries/`** (gestión) es un componente vacío sin uso aparente.
7. **`confirm()`/`alert()` nativos** se usan en eliminaciones de Lecturas anuales, Plan de lectura y maestros, mientras que Biblioteca usa un diálogo Material (`LibraryDeleteDialog`); es una inconsistencia de UX.
8. **Memoria de proyecto vs. código**: el campo `pages` de `yearly_readings` es el total de páginas; la modal de avance, al hablar de "total de palabras", usa en realidad ese total de páginas junto con la posición total de Kindle.

---
