# Progreso del Proyecto — FitUpSensei

> Actualizar este archivo manualmente al terminar cada bloque de trabajo.

---

## Estado actual
**Fase:** Perfil Cliente  
**Última actualización:** 21 Abril 2026 (sesión 7)

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
- Auth completo en mobile (sesión 5)
  - `mobile/src/types/auth.types.ts` — tipos `UserRole`, `SignUpParams`, `AuthState`, `AuthActions`
  - `mobile/src/store/authStore.ts` — Zustand store con `initialize`, `signIn`, `signUp`, `signOut`, `setSession` + mapeo de errores Supabase en español
  - `mobile/src/screens/auth/LoginScreen.tsx` — email + password, validación local, link a registro
  - `mobile/src/screens/auth/RegisterScreen.tsx` — nombre, apellido, email, password, confirm, toggle Coach/Cliente
  - `mobile/src/navigation/AuthNavigator.tsx` — Stack: Login → Register
  - `mobile/src/navigation/AppNavigator.tsx` — Bottom Tabs diferenciados por role (placeholders)
  - `mobile/src/navigation/RootNavigator.tsx` — spinner mientras carga sesión, switch Auth/App según `session`
  - `App.tsx` — conectado a `SafeAreaProvider` + `RootNavigator`
- Selección de avatar completa (sesión 6)
  - `mobile/src/types/auth.types.ts` — agregado `avatarId: number | null` a `AuthState` y `setAvatarId` a `AuthActions`
  - `mobile/src/store/authStore.ts` — `fetchProfile()` trae `role` + `avatar_id` juntos; nuevo action `setAvatarId`
  - `mobile/src/services/profileService.ts` — `updateAvatarId(userId, avatarId)` actualiza `profiles.avatar_id` en Supabase
  - `mobile/src/screens/auth/AvatarPickerScreen.tsx` — grilla 4×5, placeholders de color sólido, borde accent al seleccionar, botón "Continuar" guarda en BD
  - `mobile/src/navigation/RootNavigator.tsx` — tercer branch: sesión + `avatarId null` → AvatarPicker
- Pantalla de Perfil cliente + Logout (sesión 7)
  - `mobile/src/types/client.types.ts` — interfaces `ClientProfile`, `ClientStats`, `EditableClientFields`
  - `mobile/src/components/AvatarImage.tsx` — componente reutilizable de avatar (placeholder de color, misma paleta que AvatarPickerScreen)
  - `mobile/src/services/profileService.ts` — agregado `updateClientData()`: actualiza `peso_kg`, `estatura_cm`, `objetivo` e `imc` calculado en `clientes`
  - `mobile/src/hooks/useClientProfile.ts` — fetch con JOIN `profiles → clientes`, stats desde `sesiones` (total, racha, logros); `update()` optimista
  - `mobile/src/screens/client/ProfileScreen.tsx` — pantalla completa: header animado, datos físicos, stats de actividad, badges de objetivo activo, modal de edición bottom-sheet, botón logout
  - `mobile/src/navigation/AppNavigator.tsx` — tab Perfil conectado a `ProfileScreen`; íconos `Ionicons` en todas las tabs

## 🔄 En progreso
- Configurar NativeWind (falta `tailwind.config.js` y actualizar `babel.config.js`)

## ⬜ Próximos pasos (en orden)
1. Terminar configuración de NativeWind (`tailwind.config.js` + `babel.config.js` + `metro.config.js`)
2. Reemplazar placeholders de color en `AvatarImage` y `AvatarPickerScreen` con imágenes reales (`assets/avatars/avatar_1.png` … `avatar_20.png`)
3. Pantalla Inicio cliente: ver rutina del día asignada (siguiente en orden de desarrollo MVP)

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
