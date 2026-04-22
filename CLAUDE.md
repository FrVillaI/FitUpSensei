# CLAUDE.md — Instrucciones para Claude Code

> Este archivo es leído automáticamente por Claude Code al iniciar cada sesión.
> Contiene las reglas del proyecto. NO modificar sin revisar con el equipo.

---

## Proyecto
**FitUpSensei** — App móvil de gestión de rutinas de entrenamiento (entrenador ↔ cliente).

## Antes de escribir cualquier código, lee:
1. `/docs/CONTEXT.md` — Qué es el proyecto y cómo está organizado
2. `/docs/FEATURES.md` — Estado de cada feature (no reimplementes lo que ya está listo)
3. `/docs/DATA_MODELS.md` — Estructura de BD (usa los nombres exactos de tablas y columnas)
4. `/docs/STACK.md` — Versiones exactas de tecnologías

---

## Reglas críticas (NUNCA violar)

### Mobile (React Native)
- ❌ NUNCA usar `div`, `p`, `span`, `img` — esto es React Native, no React Web
- ✅ SIEMPRE usar `View`, `Text`, `Image`, `ScrollView`, `TouchableOpacity`
- ❌ NUNCA usar `className` con strings de Tailwind directamente — usar NativeWind con `className` solo si NativeWind ya está configurado, o usar `StyleSheet.create()`
- ❌ NUNCA usar `localStorage` o `sessionStorage` — usar `AsyncStorage` o Zustand
- ❌ NUNCA usar `motion/react` (es para web) — usar `react-native-reanimated`
- ✅ El diseño de Figma está en React Web: SIEMPRE convertir antes de usar

### Base de datos
- ✅ Usar UUIDs, no integers, para todos los IDs primarios
- ✅ Respetar exactamente los nombres de tablas y columnas de `DATA_MODELS.md`
- ✅ Toda query a Supabase desde mobile usa el anon key
- ✅ Toda operación privilegiada (admin) va por el backend .NET con service_role key
- ❌ NUNCA poner `SUPABASE_SERVICE_ROLE_KEY` en el código del mobile

### Seguridad
- ❌ NUNCA hardcodear credenciales en el código
- ✅ Usar variables de entorno (ver `STACK.md` para la lista)
- ✅ RLS debe estar habilitado en todas las tablas de Supabase

### TypeScript
- ✅ Usar tipos estrictos siempre
- ✅ Definir interfaces en `/src/types/` antes de usarlas
- ❌ NUNCA usar `any` — si no sabes el tipo, usar `unknown` y castear con guard

---

## Estructura de carpetas (respetar siempre)
```
mobile/src/
├── screens/      ← Una carpeta por pantalla principal
├── components/   ← Componentes reutilizables
├── hooks/        ← Custom hooks (prefijo 'use')
├── store/        ← Zustand stores
├── services/     ← Supabase queries y llamadas al backend
├── types/        ← Interfaces TypeScript
└── navigation/   ← Configuración de React Navigation
```

---

## Cómo responder al trabajar en este proyecto

1. **Al iniciar una tarea nueva:** Confirma qué archivos vas a tocar antes de escribir código
2. **Al crear un componente:** Primero define el tipo/interface en `/types/`, luego el componente
3. **Al hacer queries a BD:** Usa los nombres exactos de `DATA_MODELS.md`
4. **Si una feature ya existe en `FEATURES.md` como ✅:** No la reimplementes, pregunta primero
5. **Al terminar un bloque:** Recuerda al usuario actualizar `PROGRESS.md` y `FEATURES.md`

---

## Comandos útiles del proyecto
```bash
# Mobile
cd mobile
npx expo start          # Iniciar con Expo Go
npx expo start --tunnel # Si la red local tiene problemas

# Backend
cd backend
dotnet run              # Iniciar API local
dotnet watch run        # Con hot reload

# Base de datos
# Editar directamente en el SQL Editor de Supabase dashboard
```
