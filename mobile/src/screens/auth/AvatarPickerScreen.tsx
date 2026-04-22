import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import useAuthStore from '../../store/authStore';
import { updateAvatarId } from '../../services/profileService';

const AVATAR_COLORS = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#14B8A6', '#3B82F6', '#8B5CF6', '#EC4899',
  '#F43F5E', '#FB923C', '#A3E635', '#34D399',
  '#38BDF8', '#818CF8', '#C084FC', '#FB7185',
  '#FCD34D', '#6EE7B7', '#7DD3FC', '#A78BFA',
];

const AVATARS = Array.from({ length: 20 }, (_, i) => i + 1);

export default function AvatarPickerScreen() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useAuthStore((s) => s.user);
  const setAvatarId = useAuthStore((s) => s.setAvatarId);

  const handleContinue = async () => {
    if (!selectedId || !user) return;
    setSaving(true);
    setError(null);
    const err = await updateAvatarId(user.id, selectedId);
    setSaving(false);
    if (err) {
      setError('No se pudo guardar. Intenta de nuevo.');
      return;
    }
    setAvatarId(selectedId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Elige tu avatar</Text>
        <Text style={styles.subtitle}>Podrás cambiarlo más adelante</Text>
      </View>

      <FlatList
        data={AVATARS}
        numColumns={4}
        keyExtractor={(item) => String(item)}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => {
          const isSelected = selectedId === item;
          return (
            <TouchableOpacity
              style={styles.cell}
              onPress={() => setSelectedId(item)}
              activeOpacity={0.75}
            >
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: AVATAR_COLORS[item - 1] },
                  isSelected && styles.avatarSelected,
                ]}
              >
                <Text style={styles.avatarNumber}>{item}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, (!selectedId || saving) && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!selectedId || saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continuar</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 48,
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    color: '#F9FAFB',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 14,
  },
  grid: {
    paddingBottom: 24,
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    margin: 8,
  },
  avatar: {
    flex: 1,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  avatarSelected: {
    borderColor: '#3B82F6',
  },
  avatarNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  error: {
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
