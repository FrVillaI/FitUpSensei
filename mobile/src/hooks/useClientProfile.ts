import { useState, useEffect, useCallback } from 'react';
import supabase from '../services/supabase';
import { updateClientData } from '../services/profileService';
import { ClientProfile, ClientStats, EditableClientFields } from '../types/client.types';

type SessionRow = { fecha: string };

type ProfileRow = {
  nombre: string;
  apellido: string;
  avatar_id: number | null;
  clientes:
    | {
        peso_kg: number | null;
        estatura_cm: number | null;
        edad: number | null;
        objetivo: string | null;
      }
    | {
        peso_kg: number | null;
        estatura_cm: number | null;
        edad: number | null;
        objetivo: string | null;
      }[]
    | null;
};

function computeStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const unique = [...new Set(dates)].sort((a, b) => b.localeCompare(a));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let streak = 0;
  const expected = new Date(today);
  for (const dateStr of unique) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setHours(0, 0, 0, 0);
    if (d.getTime() === expected.getTime()) {
      streak++;
      expected.setDate(expected.getDate() - 1);
    } else if (d.getTime() < expected.getTime()) {
      break;
    }
  }
  return streak;
}

export function useClientProfile(userId: string) {
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [stats, setStats] = useState<ClientStats>({
    totalWorkouts: 0,
    currentStreak: 0,
    achievements: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);

    const [profileRes, sessionsRes] = await Promise.all([
      supabase
        .from('profiles')
        .select('nombre, apellido, avatar_id, clientes(peso_kg, estatura_cm, edad, objetivo)')
        .eq('id', userId)
        .single<ProfileRow>(),
      supabase
        .from('sesiones')
        .select('fecha')
        .eq('cliente_id', userId)
        .eq('completada', true)
        .order('fecha', { ascending: false }),
    ]);

    if (profileRes.error) {
      setError('No se pudo cargar el perfil');
      setIsLoading(false);
      return;
    }

    const d = profileRes.data;
    const clienteRaw = d.clientes;
    const cliente = Array.isArray(clienteRaw) ? clienteRaw[0] ?? null : clienteRaw;

    setProfile({
      nombre: d.nombre,
      apellido: d.apellido,
      avatar_id: d.avatar_id,
      peso_kg: cliente?.peso_kg ?? null,
      estatura_cm: cliente?.estatura_cm ?? null,
      edad: cliente?.edad ?? null,
      objetivo: cliente?.objetivo ?? null,
    });

    const dates = ((sessionsRes.data ?? []) as SessionRow[]).map((s) => s.fecha);
    const total = dates.length;
    setStats({
      totalWorkouts: total,
      currentStreak: computeStreak(dates),
      achievements: Math.floor(total / 10),
    });

    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const update = useCallback(
    async (fields: EditableClientFields): Promise<string | null> => {
      const err = await updateClientData(userId, fields);
      if (!err) {
        setProfile((prev) => (prev ? { ...prev, ...fields } : prev));
      }
      return err;
    },
    [userId],
  );

  return { profile, stats, isLoading, error, refetch: fetchProfile, update };
}
