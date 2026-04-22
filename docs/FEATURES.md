# Features — FitUpSensei

> Estado: ⬜ Pendiente | 🔄 En progreso | ✅ Listo | 🚫 Bloqueado

---

## 🔐 Autenticación (Ambos roles)
| Feature | Estado | Notas |
|---|---|---|
| Login con email + password | ⬜ | Supabase Auth |
| Login con Google OAuth | ⬜ | Supabase Auth + Expo |
| Registro (email + password) | ⬜ | Selección de rol al registrarse |
| Selección de avatar (20 opciones) | ⬜ | Avatares locales en assets/ |
| Logout | ⬜ | |
| Refresh token automático | ⬜ | Manejado por Supabase SDK |

---

## 👤 Cliente — Perfil
| Feature | Estado | Notas |
|---|---|---|
| Ver perfil (nombre, avatar, stats) | ⬜ | Diseño listo en Figma/React Web → convertir a RN |
| Editar datos físicos (peso, altura, etc.) | ⬜ | |
| Ver logros desbloqueados | ⬜ | |
| Ver racha de días activos | ⬜ | |

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
| React Navigation configurado (Stack + Tabs) | ⬜ | |
| Supabase proyecto creado y tablas creadas | ⬜ | Usar `DATA_MODELS.md` como base |
| RLS policies configuradas en Supabase | ⬜ | |
| Proyecto .NET 8 inicializado | ⬜ | `dotnet new webapi` |
| Conexión .NET ↔ Supabase PostgreSQL | ⬜ | |
| Railway deployment del backend | ⬜ | |
| Variables de entorno configuradas | ✅ | `.env` y `.env.example` creados en mobile; backend pendiente |
| Diseño Figma (React Web) convertido a RN | ⬜ | Pantalla de Perfil como primera prueba |

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
