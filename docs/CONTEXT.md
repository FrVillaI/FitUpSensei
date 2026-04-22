# FitUpSensei — Contexto del Proyecto

## ¿Qué es?
Aplicación móvil de gestión de rutinas de entrenamiento con dos tipos de usuario:
- **Entrenador (Coach):** Crea ejercicios, arma rutinas y las asigna a sus clientes. Ve el progreso de cada uno.
- **Cliente:** Recibe rutinas asignadas, las ejecuta registrando sets/reps/peso real alcanzado y su percepción de esfuerzo (RPE 1-10).

## Nombre del proyecto
`FitUpSensei`

## Repositorio / carpetas clave
```
FitUpSensei/
├── mobile/          ← App React Native + Expo (código principal)
│   ├── src/
│   │   ├── screens/         ← Pantallas (una por vista)
│   │   ├── components/      ← Componentes reutilizables
│   │   ├── hooks/           ← Lógica reutilizable (custom hooks)
│   │   ├── store/           ← Estado global (Zustand)
│   │   ├── services/        ← Llamadas a API y Supabase
│   │   ├── types/           ← Interfaces TypeScript
│   │   └── navigation/      ← React Navigation (stack + tabs)
│   └── assets/              ← Imágenes, íconos, fuentes
├── backend/         ← API REST en C# con .NET 8
│   ├── Controllers/
│   ├── Services/
│   ├── Models/
│   └── Data/                ← Context de Supabase/PostgreSQL
├── docs/            ← Esta carpeta de documentación
└── design/          ← Archivos exportados de Figma (React web — requieren conversión a RN)
```

## Roles y pantallas principales

### Cliente
- Login / Registro (email+password o Google OAuth)
- Selección de avatar (20 avatares predefinidos)
- Perfil personal (peso, altura, edad, objetivos, logros, racha)
- Rutina del día (ver ejercicios asignados, iniciar rutina)
- Ejecución de ejercicio (sets, reps, peso objetivo vs peso real, RPE)
- Biblioteca de ejercicios (con video YouTube demostrativo)
- Progreso (gráficas de peso levantado, RPE histórico)

### Entrenador (Coach)
- Login / Registro
- Dashboard de clientes (lista, progreso general)
- Detalle de cliente (historial de rutinas, datos físicos, evolución)
- Biblioteca de ejercicios global + agregar ejercicios propios
- Crear rutina (nombre, descripción, lista de ejercicios con sets/reps/peso)
- Asignar rutina a uno o varios clientes
- Ver ejecución de rutinas completadas por cliente

## Convenciones de código
- **Lenguaje:** TypeScript estricto en mobile; C# en backend
- **Componentes:** PascalCase (`ExerciseCard.tsx`)
- **Hooks:** camelCase con prefijo `use` (`useRoutine.ts`)
- **Variables/funciones:** camelCase
- **Constantes:** UPPER_SNAKE_CASE
- **Branches Git:** `feat/nombre-feature`, `fix/nombre-bug`
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`)

## Notas importantes para la IA
1. **El diseño de Figma está en React Web (no React Native).** Al usar componentes del diseño, SIEMPRE convertir: `div` → `View`, `p/span` → `Text`, `className` → `StyleSheet` o NativeWind, `motion/react` → `react-native-reanimated`.
2. **No usar `localStorage` ni `sessionStorage`** — usar AsyncStorage de Expo o estado en Zustand.
3. **Base de datos:** Supabase (PostgreSQL). Usar el cliente `@supabase/supabase-js` en mobile y el SDK oficial de .NET en backend.
4. **Autenticación:** Supabase Auth (email/password + Google OAuth). El token JWT de Supabase se pasa al backend para validación.
5. **Siempre leer `DATA_MODELS.md` antes de crear o modificar cualquier lógica de datos.**
6. **Siempre leer `FEATURES.md` antes de comenzar a codear una feature para ver su estado actual.**
