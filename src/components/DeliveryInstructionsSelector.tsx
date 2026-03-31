import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Bell, Phone, ShieldCheck } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/constants';

interface Instruction {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export const DeliveryInstructionsSelector: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const instructions: Instruction[] = [
    { id: 'bell', icon: <Bell size={18} color={selected === 'bell' ? COLORS.primary : COLORS.textTertiary} />, label: "Don't ring the bell" },
    { id: 'call', icon: <Phone size={18} color={selected === 'call' ? COLORS.primary : COLORS.textTertiary} />, label: "Don't call" },
    { id: 'guard', icon: <ShieldCheck size={18} color={selected === 'guard' ? COLORS.primary : COLORS.textTertiary} />, label: "Leave order with guard" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Instructions</Text>
      <View style={styles.optionsRow}>
        {instructions.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[
              styles.optionCard, 
              selected === item.id && styles.selectedOption
            ]}
            onPress={() => setSelected(item.id === selected ? null : item.id)}
          >
            {item.icon}
            <Text style={[
              styles.optionLabel, 
              selected === item.id && styles.selectedLabel
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Type in any other instructions..."
        placeholderTextColor={COLORS.textTertiary}
        value={note}
        onChangeText={setNote}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    marginTop: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  optionCard: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
  },
  optionLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  selectedLabel: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weight.semiBold as any,
  },
  input: {
    height: 60,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: SPACING.sm,
    fontSize: 12,
    color: COLORS.text,
    textAlignVertical: 'top',
  },
});
