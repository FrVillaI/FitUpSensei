# Stack Tecnológico — FitUpSensei

## Mobile (Frontend)
| Tecnología | Versión | Notas |
|---|---|---|
| React Native | 0.76+ | Vía Expo SDK |
| Expo | SDK 52 | Managed workflow |
| TypeScript | 5.x | Strict mode |
| NativeWind | 4.x | Tailwind para RN |
| React Navigation | 6.x | Stack + Bottom Tabs |
| Zustand | 5.x | Estado global |
| @supabase/supabase-js | 2.x | Cliente de BD y Auth |
| react-native-reanimated | 3.x | Animaciones (reemplaza motion/react) |
| expo-av | latest | Videos YouTube embebidos |
| react-native-webview | latest | Para videos YouTube |

## Backend
| Tecnología | Versión | Notas |
|---|---|---|
| .NET | 8 (LTS) | Runtime principal |
| ASP.NET Core | 8 | API REST |
| Entity Framework Core | 8 | ORM para PostgreSQL |
| Npgsql | 8.x | Driver PostgreSQL para .NET |
| Supabase C# SDK | latest | Autenticación y Storage |
| Swagger / OpenAPI | latest | Documentación de endpoints |

## Base de Datos
| Tecnología | Notas |
|---|---|
| Supabase | Tier gratuito (500MB, 2 proyectos) |
| PostgreSQL 15 | Motor relacional (provisto por Supabase) |
| Row Level Security (RLS) | Habilitado para multi-tenant (entrenador/cliente) |

## Despliegue (Fase de pruebas — GRATUITO)
| Servicio | Uso | Plan gratuito |
|---|---|---|
| Supabase | Base de datos + Auth + Storage | Free tier (500MB DB) |
| Railway.app | Backend .NET 8 | $5 crédito/mes (suficiente para pruebas) |
| Expo Go | Testing mobile | Gratis |
| EAS Build | Builds de producción | Gratis (30 builds/mes) |

## Herramientas de Desarrollo
| Herramienta | Uso |
|---|---|
| VS Code | Editor principal |
| Claude Code | Asistente de IA para codear |
| Expo Go (celular) | Ver la app en tiempo real, sin emulador |
| Postman | Probar endpoints del backend |
| TablePlus / DBeaver | Ver y editar datos en Supabase/PostgreSQL |

## Variables de Entorno Necesarias (`.env`)
```
# Supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   ← Solo en backend, NUNCA en mobile

# Backend
BACKEND_URL=https://tu-app.railway.app   ← En mobile, apunta a esto
JWT_SECRET=...                            ← Generado por Supabase automáticamente
```

## Notas de Migración Futura
- Supabase Free → Supabase Pro ($25/mes) cuando haya usuarios reales
- Railway Free → Railway Hobby ($5/mes) para uptime garantizado
- Considerar CDN (Cloudflare R2) para imágenes/videos si el Storage de Supabase se satura
