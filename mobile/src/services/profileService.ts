import supabase from './supabase';

export async function updateAvatarId(userId: string, avatarId: number): Promise<string | null> {
  const { error } = await supabase
    .from('profiles')
    .update({ avatar_id: avatarId })
    .eq('id', userId);
  if (error) return error.message;
  return null;
}
