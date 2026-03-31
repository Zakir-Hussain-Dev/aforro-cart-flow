import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BellOff, PhoneOff, UserRound } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/constants';

interface Instruction {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const INSTRUCTIONS: Instruction[] = [
  { id: '1', label: "Don't ring the bell", icon: <BellOff size={16} color={COLORS.text} /> },
  { id: '2', label: "Don't call", icon: <PhoneOff size={16} color={COLORS.text} /> },
  { id: '3', label: "Leave order with guard", icon: <UserRound size={16} color={COLORS.text} /> },
];

export const DeliveryInstructionsSelector: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [otherText, setOtherText] = useState('');

  const toggle = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery instructions</Text>
      <View style={styles.optionsGrid}>
        {INSTRUCTIONS.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[
              styles.option, 
              selected.includes(item.id) && styles.optionSelected
            ]}
            onPress={() => toggle(item.id)}
          >
            {item.icon}
            <Text style={[
              styles.label, 
              selected.includes(item.id) && styles.labelSelected
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type in any other instructions..."
          placeholderTextColor={COLORS.textTertiary}
          style={styles.input}
          value={otherText}
          onChangeText={setOtherText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginTop: SPACING.md,
    borderRadius: 12,
    marginHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginBottom: SPACING.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.divider,
    minWidth: '30%',
  },
  optionSelected: {
    borderColor: '#FFBB99',
    backgroundColor: '#FFF9F6',
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 11,
    color: COLORS.text,
    marginLeft: 6,
    flexShrink: 1,
  },
  labelSelected: {
    color: '#FF8844',
    fontWeight: '700',
  },
  inputContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.divider,
    height: 40,
    justifyContent: 'center',
  },
  input: {
    fontSize: 12,
    color: COLORS.text,
  },
});
