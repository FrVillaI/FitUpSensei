# Modelos de Datos — FitUpSensei

> Base de datos: PostgreSQL en Supabase  
> Nota: Se migró del schema MySQL original a PostgreSQL con mejoras de tipos y nombres

---

## Diagrama de Relaciones (texto)
```
auth.users (Supabase Auth)
    ↓ 1:1
profiles ──────────── entrenadores  (si role = 'coach')
    │
    └──────────────── clientes       (si role = 'client')
                            │
                            └── rutina_asignada ←── rutinas
                                                        │
                                                    rutina_ejercicios ←── ejercicios
                                                        │
                                                    sesion_ejercicio  (log del cliente)
```

---

## Tablas

### `profiles`
Extiende `auth.users` de Supabase. Todos los usuarios (coaches y clientes) tienen un profile.

| Columna | Tipo | Notas |
|---|---|---|
| `id` | `uuid` PK | Mismo UUID que `auth.users.id` |
| `role` | `text` | `'coach'` o `'client'` |
| `nombre` | `text` NOT NULL | |
| `apellido` | `text` NOT NULL | |
| `avatar_id` | `int` | 1-20 (avatares predefinidos) |
| `created_at` | `timestamptz` | Default: `now()` |
| `updated_at` | `timestamptz` | |

---

### `clientes`
Datos físicos y de salud del cliente.

| Columna | Tipo | Notas |
|---|---|---|
| `id` | `uuid` PK | FK → `profiles.id` |
| `edad` | `int` | |
| `peso_kg` | `numeric(5,2)` | Peso actual |
| `estatura_cm` | `numeric(5,2)` | |
| `imc` | `numeric(5,2)` | Calculado |
| `objetivo` | `text` | Ej: 'Definición', 'Fuerza', 'Resistencia' |
| `enfermedades` | `text` | |
| `lesiones` | `text` | |
| `condiciones_especiales` | `text` | |
| `horas_sueno_promedio` | `numeric(3,1)` | |
| `consume_alcohol` | `boolean` | |
| `consume_tabaco` | `boolean` | |
| `fc_reposo` | `int` | Frecuencia cardíaca en reposo |
| `presion_arterial` | `text` | Ej: "120/80" |
| `coach_id` | `uuid` | FK → `profiles.id` (el entrenador asignado) |
| `created_at` | `timestamptz` | |

---

### `entrenadores`
Datos del perfil público del coach.

| Columna | Tipo | Notas |
|---|---|---|
| `id` | `uuid` PK | FK → `profiles.id` |
| `presentacion` | `text` | Bio del entrenador |
| `ejercicio_favorito` | `text` | |
| `puntuacion` | `numeric(3,2)` | Rating 0.00–5.00 |
| `created_at` | `timestamptz` | |

---

### `ejercicios`
Biblioteca global de ejercicios. Pueden ser del sistema o creados por un entrenador.

| Columna | Tipo | Notas |
|---|---|---|
| `id` | `uuid` PK | |
| `nombre` | `text` NOT NULL | |
| `categoria` | `text` | Ej: 'Pecho', 'Pierna', 'Cardio' |
| `musculos_implicados` | `text[]` | Array de músculos |
| `descripcion` | `text` | |
| `foto_url` | `text` | URL de Supabase Storage |
| `video_youtube_id` | `text` | ID del video de YouTube (no URL completa) |
| `es_global` | `boolean` | `true` = ejercicio del sistema, `false` = creado por coach |
| `creado_por` | `uuid` | FK → `profiles.id` (null si es global) |
| `created_at` | `timestamptz` | |

---

### `rutinas`
Rutina creada por un entrenador. Puede asignarse a múltiples clientes.

| Columna | Tipo | Notas |
|---|---|---|
| `id` | `uuid` PK | |
| `coach_id` | `uuid` NOT NULL | FK → `profiles.id` |
| `nombre` | `text` NOT NULL | Ej: "Día A - Empuje" |
| `descripcion` | `text` | |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

---

### `rutina_ejercicios`
Detalle de un ejercicio dentro de una rutina (con los parámetros del entrenador).

| Columna | Tipo | Notas |
|---|---|---|
| `id` | `uuid` PK | |
| `rutina_id` | `uuid` NOT NULL | FK → `rutinas.id` |
| `ejercicio_id` | `uuid` NOT NULL | FK → `ejercicios.id` |
| `orden` | `int` NOT NULL | Posición en la rutina (1, 2, 3...) |
| `series` | `int` | Número de series |
| `repeticiones` | `int` | Reps por serie |
| `peso_objetivo_kg` | `numeric(6,2)` | Peso sugerido por el coach |
| `tiempo_descanso_seg` | `int` | Descanso entre sets en segundos |
| `notas` | `text` | Instrucciones adicionales del coach |

---

### `rutinas_asignadas`
Relación entre una rutina y un cliente (asignación).

| Columna | Tipo | Notas |
|---|---|---|
| `id` | `uuid` PK | |
| `rutina_id` | `uuid` NOT NULL | FK → `rutinas.id` |
| `cliente_id` | `uuid` NOT NULL | FK → `profiles.id` |
| `fecha_asignacion` | `date` | |
| `activa` | `boolean` | Si está activa para el cliente |
| `created_at` | `timestamptz` | |

---

### `sesiones`
Registro de cada vez que un cliente ejecuta una rutina completa.

| Columna | Tipo | Notas |
|---|---|---|
| `id` | `uuid` PK | |
| `cliente_id` | `uuid` NOT NULL | FK → `profiles.id` |
| `rutina_id` | `uuid` NOT NULL | FK → `rutinas.id` |
| `fecha` | `date` NOT NULL | |
| `completada` | `boolean` | Si terminó toda la rutina |
| `duracion_min` | `int` | Minutos que duró la sesión |
| `created_at` | `timestamptz` | |

---

### `sesion_ejercicios`
Log detallado de cada ejercicio ejecutado dentro de una sesión. **Esta es la tabla más importante para el progreso.**

| Columna | Tipo | Notas |
|---|---|---|
| `id` | `uuid` PK | |
| `sesion_id` | `uuid` NOT NULL | FK → `sesiones.id` |
| `rutina_ejercicio_id` | `uuid` NOT NULL | FK → `rutina_ejercicios.id` |
| `serie_numero` | `int` | Número de la serie ejecutada |
| `repeticiones_realizadas` | `int` | Reps que el cliente logró |
| `peso_realizado_kg` | `numeric(6,2)` | Peso que el cliente usó realmente |
| `rpe` | `int` | Escala 1-10 (percepción de esfuerzo) |
| `completado` | `boolean` | Si marcó este set como completado |
| `notas_cliente` | `text` | Observación del cliente |
| `created_at` | `timestamptz` | |

---

## Políticas RLS (Row Level Security) — Resumen

Habilitar RLS en todas las tablas. Reglas principales:

- **`profiles`:** Cada usuario lee su propio perfil. Coaches ven perfiles de sus clientes.
- **`clientes`:** Solo el propio cliente y su coach asignado pueden leer/editar.
- **`ejercicios`:** Todos pueden leer globales. Solo el creador puede editar los suyos.
- **`rutinas`:** Solo el coach creador puede crear/editar. Sus clientes asignados pueden leer.
- **`sesion_ejercicios`:** Solo el cliente puede insertar. Su coach puede solo leer.

---

## Notas de Migración desde el Schema MySQL Original
- `INT AUTO_INCREMENT` → `uuid` con `gen_random_uuid()` (más seguro para multi-tenant)
- Nombres de columnas con espacios (ej: `Frecuencia cardíaca en reposo`) → `fc_reposo` (snake_case sin espacios)
- `VARCHAR(45)` genérico → tipos específicos (`int`, `numeric`, `boolean`, `text`)
- `serie` + `Rutina` del original → reemplazadas por `rutina_ejercicios` + `rutinas_asignadas` + `sesiones` + `sesion_ejercicios` para tener historial completo
