# Progreso del Proyecto — FitUpSensei

> Actualizar este archivo manualmente al terminar cada bloque de trabajo.

---

## Estado actual
**Fase:** Setup / Inicialización  
**Última actualización:** 21 Abril 2026

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

## 🔄 En progreso
- Configurar NativeWind (falta `tailwind.config.js` y actualizar `babel.config.js`)

## ⬜ Próximos pasos (en orden)
1. Terminar configuración de NativeWind (`tailwind.config.js` + `babel.config.js` + `metro.config.js`)
2. Crear proyecto en Supabase y ejecutar el schema SQL de `DATA_MODELS.md`
3. Configurar React Navigation (Stack + Bottom Tabs) en `mobile/src/navigation/`
4. Conectar .NET con Supabase PostgreSQL (connection string en `appsettings.Development.json`)
5. Implementar Auth (Login/Registro) en mobile + backend
6. Convertir pantalla de Perfil de React Web → React Native

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
