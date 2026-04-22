# Progreso del Proyecto — FitUpSensei

> Actualizar este archivo manualmente al terminar cada bloque de trabajo.

---

## Estado actual
**Fase:** Setup / Inicialización  
**Última actualización:** 21 Abril 2026 (sesión 4)

---

## ✅ Completado
- Diseño base en Figma (pantallas cliente y entrenador) — React Web, pendiente conversión a RN
- Schema inicial de BD (MySQL) — migrado y mejorado en `DATA_MODELS.md`
- Documentación base del proyecto (`/docs`)
- Proyecto Expo inicializado con TypeScript template (SDK 54, React Native 0.76)
- Dependencias instaladas: nativewind, supabase-js, reanimated, react-navigation, zustand, webview, async-storage
- Estructura de carpetas `mobile/src/` creada (screens, components, hooks, store, services, types, navigation)
- `.env` y `.env.example` creados en `/mobile`
- `.gitignore` raíz creado (excluye `.env` y `node_modules/`)
- Proyecto .NET 8 Web API inicializado (`backend/FitUpSensei.API/`)
  - Paquetes: Npgsql.EFCore 8.0.11, EFCore.Design 8.0.11, Swashbuckle 6.9.0, JwtBearer 8.0.11
  - Estructura de carpetas: Controllers/, Services/, Models/, DTOs/, Data/, Middleware/
  - `.env.example` y `appsettings.Development.json` creados con estructura de keys
  - `Program.cs` limpio con Authentication + Authorization + Controllers configurados
- Base de datos Supabase configurada
  - 9 tablas creadas en schema `public` (profiles, entrenadores, clientes, ejercicios, rutinas, rutina_ejercicios, rutinas_asignadas, sesiones, sesion_ejercicios)
  - RLS habilitado en todas las tablas con policies para coach y client
  - Trigger `on_auth_user_created` activo (crea profile automáticamente al registrarse)
- Cliente Supabase inicializado en mobile (`mobile/src/services/supabase.ts`)
  - AsyncStorage como storage para persistir sesión entre reinicios
  - `autoRefreshToken: true`, `persistSession: true`, `detectSessionInUrl: false`
- Tipos TypeScript del schema de BD definidos (`mobile/src/types/database.types.ts`)
  - 9 interfaces: Profile, Cliente, Entrenador, Ejercicio, Rutina, RutinaEjercicio, RutinaAsignada, Sesion, SesionEjercicio
  - Nombres y tipos exactos según `DATA_MODELS.md`
- Backend .NET conectado con Supabase PostgreSQL
  - 9 modelos EF Core en `Models/` con mapeo snake_case explícito (`[Table]`, `[Column]`)
  - `AppDbContext` con 9 DbSet + precisiones `numeric` configuradas en `OnModelCreating`
  - `SupabaseAuthMiddleware` extrae el `sub` del JWT validado y lo expone en `HttpContext.Items["UserId"]`
  - `Program.cs` actualizado: DbContext con Npgsql, JWT Bearer con secret/URL de Supabase, Swagger con Security Definition JWT

## 🔄 En progreso
- Configurar NativeWind (falta `tailwind.config.js` y actualizar `babel.config.js`)

## ⬜ Próximos pasos (en orden)
1. Rellenar `appsettings.Development.json` con credenciales reales de Supabase (ConnectionString, JwtSecret, Url)
2. Terminar configuración de NativeWind (`tailwind.config.js` + `babel.config.js` + `metro.config.js`)
3. Configurar React Navigation (Stack + Bottom Tabs) en `mobile/src/navigation/`
4. Implementar Auth (Login/Registro) en mobile usando el cliente Supabase
5. Convertir pantalla de Perfil de React Web → React Native

---

## 🐛 Problemas conocidos
- Npgsql latest (10.x) solo es compatible con .NET 10 — usar versión 8.x explícita para este proyecto

---

## 📝 Decisiones tomadas
| Fecha | Decisión | Razón |
|---|---|---|
| Abr 2026 | Backend: C# .NET 8 | Mejor integración con PostgreSQL, Railway gratis, menos RAM que Java |
| Abr 2026 | BD: Supabase (PostgreSQL) | Auth incluido, tier gratis, RLS nativo |
| Abr 2026 | Mobile: Expo Managed | Sin emulador necesario, Expo Go en celular físico |
| Abr 2026 | UUIDs en lugar de INT | Más seguro para multi-tenant, estándar en Supabase |
| Abr 2026 | Npgsql 8.0.11 (no latest) | Npgsql 10.x solo soporta .NET 10; se fija versión 8.x para compatibilidad con net8.0 |
