import supabase from './supabase';
import { EditableClientFields } from '../types/client.types';

export async function updateAvatarId(userId: string, avatarId: number): Promise<string | null> {
  const { error } = await supabase
    .from('profiles')
    .update({ avatar_id: avatarId })
    .eq('id', userId);
  if (error) return error.message;
  return null;
}

export async function updateClientData(
  userId: string,
  fields: EditableClientFields,
): Promise<string | null> {
  const payload: Record<string, unknown> = {
    peso_kg: fields.peso_kg,
    estatura_cm: fields.estatura_cm,
    objetivo: fields.objetivo,
  };

  if (fields.peso_kg != null && fields.estatura_cm != null) {
    const alturaM = fields.estatura_cm / 100;
    payload.imc = parseFloat((fields.peso_kg / (alturaM * alturaM)).toFixed(2));
  }

  const { error } = await supabase
    .from('clientes')
    .update(payload)
    .eq('id', userId);
  if (error) return error.message;
  return null;
}
