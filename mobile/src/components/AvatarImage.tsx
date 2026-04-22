import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AVATAR_COLORS = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#14B8A6', '#3B82F6', '#8B5CF6', '#EC4899',
  '#F43F5E', '#FB923C', '#A3E635', '#34D399',
  '#38BDF8', '#818CF8', '#C084FC', '#FB7185',
  '#FCD34D', '#6EE7B7', '#7DD3FC', '#A78BFA',
];

interface Props {
  avatarId: number | null;
  size?: number;
}

export default function AvatarImage({ avatarId, size = 80 }: Props) {
  const color = avatarId != null
    ? AVATAR_COLORS[(avatarId - 1) % AVATAR_COLORS.length]
    : '#6B7280';

  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
      ]}
    >
      <Text style={[styles.label, { fontSize: size * 0.32 }]}>
        {avatarId ?? '?'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontWeight: '700',
  },
});
