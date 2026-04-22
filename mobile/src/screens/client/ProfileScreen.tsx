import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AvatarImage from '../../components/AvatarImage';
import { useClientProfile } from '../../hooks/useClientProfile';
import useAuthStore from '../../store/authStore';
import { EditableClientFields } from '../../types/client.types';

const OBJETIVO_OPTIONS = ['Definición', 'Fuerza', 'Resistencia', 'Hipertrofia', 'Pérdida de peso'];

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const { profile, stats, isLoading, error, update } = useClientProfile(user?.id ?? '');

  const [modalVisible, setModalVisible] = useState(false);
  const [editPeso, setEditPeso] = useState('');
  const [editAltura, setEditAltura] = useState('');
  const [editObjetivo, setEditObjetivo] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const openModal = () => {
    setEditPeso(profile?.peso_kg?.toString() ?? '');
    setEditAltura(profile?.estatura_cm?.toString() ?? '');
    setEditObjetivo(profile?.objetivo ?? '');
    setSaveError(null);
    setModalVisible(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    const fields: EditableClientFields = {
      peso_kg: editPeso ? parseFloat(editPeso) : null,
      estatura_cm: editAltura ? parseFloat(editAltura) : null,
      objetivo: editObjetivo || null,
    };
    const err = await update(fields);
    setSaving(false);
    if (err) {
      setSaveError('No se pudo guardar. Intenta de nuevo.');
    } else {
      setModalVisible(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const fullName = `${profile?.nombre ?? ''} ${profile?.apellido ?? ''}`.trim();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header: avatar + nombre + objetivo */}
        <View style={styles.header}>
          <AvatarImage avatarId={profile?.avatar_id ?? null} size={96} />
          <Text style={styles.name}>{fullName}</Text>
          {profile?.objetivo ? (
            <Text style={styles.objetivoLabel}>{profile.objetivo}</Text>
          ) : null}
          <TouchableOpacity style={styles.editButton} onPress={openModal}>
            <Ionicons name="pencil-outline" size={15} color="#3B82F6" />
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Datos físicos */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>DATOS FÍSICOS</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCol}>
              <Text style={styles.statValue}>
                {profile?.peso_kg != null ? profile.peso_kg : '—'}
              </Text>
              <Text style={styles.statUnit}>Peso (kg)</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statCol}>
              <Text style={styles.statValue}>
                {profile?.estatura_cm != null ? profile.estatura_cm : '—'}
              </Text>
              <Text style={styles.statUnit}>Altura (cm)</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statCol}>
              <Text style={styles.statValue}>
                {profile?.edad != null ? profile.edad : '—'}
              </Text>
              <Text style={styles.statUnit}>Edad</Text>
            </View>
          </View>
        </View>

        {/* Stats de actividad */}
        <View style={styles.activityRow}>
          <View style={[styles.activityCard, { borderColor: '#3B82F630' }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#3B82F615' }]}>
              <Ionicons name="trending-up" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.activityValue}>{stats.totalWorkouts}</Text>
            <Text style={styles.activityLabel}>Entrena{'\n'}mientos</Text>
          </View>
          <View style={[styles.activityCard, { borderColor: '#22C55E30' }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#22C55E15' }]}>
              <Ionicons name="flame" size={20} color="#22C55E" />
            </View>
            <Text style={styles.activityValue}>{stats.currentStreak}</Text>
            <Text style={styles.activityLabel}>Racha{'\n'}(días)</Text>
          </View>
          <View style={[styles.activityCard, { borderColor: '#EAB30830' }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#EAB30815' }]}>
              <Ionicons name="trophy" size={20} color="#EAB308" />
            </View>
            <Text style={styles.activityValue}>{stats.achievements}</Text>
            <Text style={styles.activityLabel}>Logros</Text>
          </View>
        </View>

        {/* Objetivos activos (badges) */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>OBJETIVOS ACTIVOS</Text>
          <View style={styles.badgesRow}>
            {OBJETIVO_OPTIONS.map((op) => {
              const active = profile?.objetivo === op;
              return (
                <View
                  key={op}
                  style={[styles.badge, active ? styles.badgeActive : styles.badgeInactive]}
                >
                  <Text style={[styles.badgeText, active ? styles.badgeTextActive : styles.badgeTextInactive]}>
                    {op}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Logout */}
        <View>
          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Modal de edición */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        presentationStyle="overFullScreen"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Editar datos</Text>

            <Text style={styles.inputLabel}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              value={editPeso}
              onChangeText={setEditPeso}
              keyboardType="decimal-pad"
              placeholder="75.5"
              placeholderTextColor="#6B7280"
            />

            <Text style={styles.inputLabel}>Altura (cm)</Text>
            <TextInput
              style={styles.input}
              value={editAltura}
              onChangeText={setEditAltura}
              keyboardType="decimal-pad"
              placeholder="175"
              placeholderTextColor="#6B7280"
            />

            <Text style={styles.inputLabel}>Objetivo</Text>
            <View style={styles.badgesRow}>
              {OBJETIVO_OPTIONS.map((op) => (
                <TouchableOpacity
                  key={op}
                  style={[styles.badge, editObjetivo === op ? styles.badgeActive : styles.badgeInactive]}
                  onPress={() => setEditObjetivo(op)}
                >
                  <Text style={[styles.badgeText, editObjetivo === op ? styles.badgeTextActive : styles.badgeTextInactive]}>
                    {op}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {saveError ? <Text style={styles.errorText}>{saveError}</Text> : null}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
                disabled={saving}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, saving && styles.buttonDisabled]}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.saveText}>Guardar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    color: '#F9FAFB',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 4,
  },
  objetivoLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  editButtonText: {
    color: '#3B82F6',
    fontSize: 13,
    fontWeight: '600',
  },

  // Card
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionLabel: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 16,
  },

  // Physical stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#F9FAFB',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statUnit: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  verticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#374151',
  },

  // Activity cards
  activityRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  activityCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityValue: {
    color: '#F9FAFB',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  activityLabel: {
    color: '#9CA3AF',
    fontSize: 11,
    textAlign: 'center',
  },

  // Badges
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
  },
  badgeActive: {
    backgroundColor: '#3B82F6',
  },
  badgeInactive: {
    backgroundColor: '#374151',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  badgeTextActive: {
    color: '#fff',
  },
  badgeTextInactive: {
    color: '#9CA3AF',
  },

  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF444430',
    backgroundColor: '#EF444410',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '600',
  },

  // Errors
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalSheet: {
    backgroundColor: '#1F2937',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4B5563',
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#F9FAFB',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  inputLabel: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#111827',
    color: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#374151',
  },
  cancelText: {
    color: '#9CA3AF',
    fontSize: 15,
    fontWeight: '600',
  },
  saveButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#3B82F6',
  },
  saveText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
});
