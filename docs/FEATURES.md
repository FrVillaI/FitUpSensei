# Features — FitUpSensei

> Estado: ⬜ Pendiente | 🔄 En progreso | ✅ Listo | 🚫 Bloqueado

---

## 🔐 Autenticación (Ambos roles)
| Feature | Estado | Notas |
|---|---|---|
| Login con email + password | ✅ | `supabase.auth.signInWithPassword()` + Zustand store |
| Login con Google OAuth | ⬜ | Supabase Auth + Expo |
| Registro (email + password) | ✅ | Selección de rol (Coach/Cliente) + metadatos en signUp |
| Selección de avatar (20 opciones) | ✅ | AvatarPickerScreen con placeholders de color sólido; guarda en `profiles.avatar_id`; flujo post-registro automático |
| Logout | ✅ | Botón en `ProfileScreen` (tab Perfil cliente) |
| Refresh token automático | ✅ | `autoRefreshToken: true` + `onAuthStateChange` en authStore |

---

## 👤 Cliente — Perfil
| Feature | Estado | Notas |
|---|---|---|
| Ver perfil (nombre, avatar, stats) | ✅ | `ProfileScreen`: avatar (`AvatarImage`), nombre, apellido, objetivo, datos físicos, stats de actividad |
| Editar datos físicos (peso, altura, etc.) | ✅ | Modal bottom-sheet en `ProfileScreen`; actualiza `clientes` (peso_kg, estatura_cm, objetivo, imc) en Supabase |
| Ver logros desbloqueados | ✅ | Milestone: 1 logro cada 10 entrenamientos completados; calculado en `useClientProfile` |
| Ver racha de días activos | ✅ | Calculado desde `sesiones.fecha` en `useClientProfile`; días consecutivos hasta hoy |

## 🏋️ Cliente — Rutinas
| Feature | Estado | Notas |
|---|---|---|
| Ver rutina asignada del día | ⬜ | |
| Iniciar rutina | ⬜ | |
| Ver ejercicio con instrucciones | ⬜ | |
| Ver video YouTube demostrativo | ⬜ | WebView con youtube-nocookie |
| Registrar peso real y reps realizadas por set | ⬜ | Diferente al objetivo del coach |
| Marcar set como completado | ⬜ | |
| Registrar RPE al completar ejercicio (1-10) | ⬜ | |
| Finalizar rutina completa | ⬜ | |

## 📊 Cliente — Progreso
| Feature | Estado | Notas |
|---|---|---|
| Ver historial de rutinas completadas | ⬜ | |
| Gráfica de evolución de peso levantado por ejercicio | ⬜ | |
| Gráfica de RPE histórico | ⬜ | |

## 📚 Cliente — Biblioteca de ejercicios
| Feature | Estado | Notas |
|---|---|---|
| Ver todos los ejercicios con detalle | ⬜ | |
| Filtrar por categoría / músculo | ⬜ | |
| Ver video demostrativo (YouTube) | ⬜ | |

---

## 🧑‍💼 Entrenador — Dashboard
| Feature | Estado | Notas |
|---|---|---|
| Ver lista de clientes activos | ⬜ | Diseño en Figma |
| Ver resumen de progreso por cliente | ⬜ | |
| Ver detalle completo de un cliente | ⬜ | Historial, peso, RPE |

## 🏗️ Entrenador — Gestión de Rutinas
| Feature | Estado | Notas |
|---|---|---|
| Crear rutina nueva | ⬜ | Nombre, descripción, lista de ejercicios |
| Agregar ejercicio a rutina (con sets/reps/peso) | ⬜ | |
| Editar rutina existente | ⬜ | |
| Eliminar rutina | ⬜ | |
| Asignar rutina a un cliente | ⬜ | |
| Asignar misma rutina a múltiples clientes | ⬜ | |
| Desactivar asignación | ⬜ | |

## 📖 Entrenador — Biblioteca de Ejercicios
| Feature | Estado | Notas |
|---|---|---|
| Ver biblioteca global de ejercicios | ⬜ | |
| Agregar ejercicio propio (foto + video + descripción) | ⬜ | |
| Editar/eliminar ejercicio propio | ⬜ | |

---

## ⚙️ Infraestructura / Setup
| Feature | Estado | Notas |
|---|---|---|
| Proyecto Expo inicializado | ✅ | `npx create-expo-app` con TypeScript template |
| NativeWind configurado | 🔄 | Instalado; falta tailwind.config.js y babel.config.js |
| React Navigation configurado (Stack + Tabs) | ✅ | AuthNavigator (Stack) + AppNavigator (Bottom Tabs) + RootNavigator |
| Supabase proyecto creado y tablas creadas | ✅ | 9 tablas creadas desde `schema.sql` |
| RLS policies configuradas en Supabase | ✅ | RLS activo + policies en todas las tablas + trigger `on_auth_user_created` |
| Proyecto .NET 8 inicializado | ✅ | Web API con EF Core, Npgsql, Swagger, JWT. Estructura Controllers/Services/Models/DTOs/Data/Middleware |
| Cliente Supabase inicializado en mobile | ✅ | `services/supabase.ts` con AsyncStorage, autoRefreshToken, persistSession |
| Tipos TypeScript de BD definidos | ✅ | 9 interfaces en `types/database.types.ts` — nombres exactos del schema |
| Conexión .NET ↔ Supabase PostgreSQL | ✅ | AppDbContext + 9 modelos EF Core + JWT Bearer + SupabaseAuthMiddleware |
| Railway deployment del backend | ⬜ | |
| Variables de entorno configuradas | ✅ | `.env` y `.env.example` en mobile y backend |
| Diseño Figma (React Web) convertido a RN | ✅ | `ProfileScreen` convertida: `div`→`View`, `motion/react`→`reanimated FadeInDown`, `className`→`StyleSheet` |

---

## 📋 Orden de desarrollo sugerido (MVP)
1. Setup infraestructura (Supabase + Expo + .NET)
2. Auth: Login/Registro + selección de avatar
3. Perfil cliente (convertir componente Figma)
4. Biblioteca de ejercicios (solo lectura)
5. Coach: crear rutina + asignar a cliente
6. Cliente: ver rutina + ejecutar + registrar RPE
7. Coach: ver progreso de cliente
8. Gráficas de progreso cliente
