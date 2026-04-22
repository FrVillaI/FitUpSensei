-- ============================================
-- FitUpSensei — Schema PostgreSQL para Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================

-- EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLA: profiles
-- Extiende auth.users de Supabase
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role        TEXT NOT NULL CHECK (role IN ('coach', 'client')),
  nombre      TEXT NOT NULL,
  apellido    TEXT NOT NULL,
  avatar_id   INT DEFAULT 1 CHECK (avatar_id BETWEEN 1 AND 20),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: entrenadores
-- ============================================
CREATE TABLE IF NOT EXISTS public.entrenadores (
  id                  UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  presentacion        TEXT,
  ejercicio_favorito  TEXT,
  puntuacion          NUMERIC(3,2) DEFAULT 0.00,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: clientes
-- ============================================
CREATE TABLE IF NOT EXISTS public.clientes (
  id                      UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  coach_id                UUID REFERENCES public.profiles(id),
  edad                    INT,
  peso_kg                 NUMERIC(5,2),
  estatura_cm             NUMERIC(5,2),
  imc                     NUMERIC(5,2),
  objetivo                TEXT,
  enfermedades            TEXT,
  lesiones                TEXT,
  condiciones_especiales  TEXT,
  horas_sueno_promedio    NUMERIC(3,1),
  consume_alcohol         BOOLEAN DEFAULT FALSE,
  consume_tabaco          BOOLEAN DEFAULT FALSE,
  fc_reposo               INT,
  presion_arterial        TEXT,
  created_at              TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: ejercicios
-- ============================================
CREATE TABLE IF NOT EXISTS public.ejercicios (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre              TEXT NOT NULL,
  categoria           TEXT,
  musculos_implicados TEXT[],
  descripcion         TEXT,
  foto_url            TEXT,
  video_youtube_id    TEXT,
  es_global           BOOLEAN DEFAULT TRUE,
  creado_por          UUID REFERENCES public.profiles(id),
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: rutinas
-- ============================================
CREATE TABLE IF NOT EXISTS public.rutinas (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id    UUID NOT NULL REFERENCES public.profiles(id),
  nombre      TEXT NOT NULL,
  descripcion TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: rutina_ejercicios
-- ============================================
CREATE TABLE IF NOT EXISTS public.rutina_ejercicios (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rutina_id            UUID NOT NULL REFERENCES public.rutinas(id) ON DELETE CASCADE,
  ejercicio_id         UUID NOT NULL REFERENCES public.ejercicios(id),
  orden                INT NOT NULL,
  series               INT,
  repeticiones         INT,
  peso_objetivo_kg     NUMERIC(6,2),
  tiempo_descanso_seg  INT DEFAULT 60,
  notas                TEXT
);

-- ============================================
-- TABLA: rutinas_asignadas
-- ============================================
CREATE TABLE IF NOT EXISTS public.rutinas_asignadas (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rutina_id        UUID NOT NULL REFERENCES public.rutinas(id),
  cliente_id       UUID NOT NULL REFERENCES public.profiles(id),
  fecha_asignacion DATE DEFAULT CURRENT_DATE,
  activa           BOOLEAN DEFAULT TRUE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(rutina_id, cliente_id)
);

-- ============================================
-- TABLA: sesiones
-- ============================================
CREATE TABLE IF NOT EXISTS public.sesiones (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id   UUID NOT NULL REFERENCES public.profiles(id),
  rutina_id    UUID NOT NULL REFERENCES public.rutinas(id),
  fecha        DATE NOT NULL DEFAULT CURRENT_DATE,
  completada   BOOLEAN DEFAULT FALSE,
  duracion_min INT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: sesion_ejercicios
-- ============================================
CREATE TABLE IF NOT EXISTS public.sesion_ejercicios (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sesion_id                 UUID NOT NULL REFERENCES public.sesiones(id) ON DELETE CASCADE,
  rutina_ejercicio_id       UUID NOT NULL REFERENCES public.rutina_ejercicios(id),
  serie_numero              INT NOT NULL,
  repeticiones_realizadas   INT,
  peso_realizado_kg         NUMERIC(6,2),
  rpe                       INT CHECK (rpe BETWEEN 1 AND 10),
  completado                BOOLEAN DEFAULT FALSE,
  notas_cliente             TEXT,
  created_at                TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entrenadores     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ejercicios       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rutinas          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rutina_ejercicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rutinas_asignadas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sesiones         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sesion_ejercicios ENABLE ROW LEVEL SECURITY;

-- profiles: cada usuario ve y edita su propio perfil
CREATE POLICY "profiles_own" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- clientes: el cliente ve su propio registro; el coach ve los de sus clientes
CREATE POLICY "clientes_own" ON public.clientes
  FOR ALL USING (auth.uid() = id OR auth.uid() = coach_id);

-- entrenadores: el coach ve y edita su propio registro
CREATE POLICY "entrenadores_own" ON public.entrenadores
  FOR ALL USING (auth.uid() = id);

-- ejercicios: todos pueden leer; solo el creador puede modificar los suyos
CREATE POLICY "ejercicios_read" ON public.ejercicios
  FOR SELECT USING (TRUE);
CREATE POLICY "ejercicios_write" ON public.ejercicios
  FOR INSERT WITH CHECK (auth.uid() = creado_por);
CREATE POLICY "ejercicios_update" ON public.ejercicios
  FOR UPDATE USING (auth.uid() = creado_por);

-- rutinas: el coach gestiona las suyas; los clientes asignados pueden leer
CREATE POLICY "rutinas_coach" ON public.rutinas
  FOR ALL USING (auth.uid() = coach_id);
CREATE POLICY "rutinas_client_read" ON public.rutinas
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.rutinas_asignadas ra
      WHERE ra.rutina_id = id AND ra.cliente_id = auth.uid()
    )
  );

-- rutina_ejercicios: misma lógica que rutinas
CREATE POLICY "rutina_ejercicios_coach" ON public.rutina_ejercicios
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.rutinas r WHERE r.id = rutina_id AND r.coach_id = auth.uid())
  );
CREATE POLICY "rutina_ejercicios_client_read" ON public.rutina_ejercicios
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.rutinas_asignadas ra
      WHERE ra.rutina_id = rutina_id AND ra.cliente_id = auth.uid()
    )
  );

-- rutinas_asignadas: coach gestiona; cliente lee las suyas
CREATE POLICY "asignadas_coach" ON public.rutinas_asignadas
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.rutinas r WHERE r.id = rutina_id AND r.coach_id = auth.uid())
  );
CREATE POLICY "asignadas_client_read" ON public.rutinas_asignadas
  FOR SELECT USING (auth.uid() = cliente_id);

-- sesiones: el cliente crea y ve las suyas; el coach ve las de sus clientes
CREATE POLICY "sesiones_client" ON public.sesiones
  FOR ALL USING (auth.uid() = cliente_id);
CREATE POLICY "sesiones_coach_read" ON public.sesiones
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.clientes c WHERE c.id = cliente_id AND c.coach_id = auth.uid())
  );

-- sesion_ejercicios: igual que sesiones
CREATE POLICY "sesion_ej_client" ON public.sesion_ejercicios
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.sesiones s WHERE s.id = sesion_id AND s.cliente_id = auth.uid())
  );
CREATE POLICY "sesion_ej_coach_read" ON public.sesion_ejercicios
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.sesiones s
      JOIN public.clientes c ON c.id = s.cliente_id
      WHERE s.id = sesion_id AND c.coach_id = auth.uid()
    )
  );

-- ============================================
-- TRIGGER: crear profile automáticamente al registrarse
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, nombre, apellido)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
    COALESCE(NEW.raw_user_meta_data->>'nombre', ''),
    COALESCE(NEW.raw_user_meta_data->>'apellido', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
