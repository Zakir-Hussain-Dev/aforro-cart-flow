import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, CheckCircle2, ChevronRight } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../theme/constants';
import { Address } from '../context/AddressContext';

interface AddressCardProps {
  address: Address;
  selected?: boolean;
  onSelect?: () => void;
  showChevron?: boolean;
}

export const AddressCard: React.FC<AddressCardProps> = ({ 
  address, 
  selected = false, 
  onSelect,
  showChevron = false,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, selected && styles.selectedContainer]} 
      onPress={onSelect}
      disabled={!onSelect}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MapPin color={selected ? COLORS.primary : COLORS.textSecondary} size={20} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.type}>{address.type}</Text>
          {selected && <CheckCircle2 color={COLORS.primary} size={16} />}
        </View>
        <Text style={styles.addressLine} numberOfLines={2}>
          {address.addressLine1}, {address.city}, {address.pincode}
        </Text>
      </View>

      {showChevron && (
        <View style={styles.chevron}>
          <ChevronRight color={COLORS.textTertiary} size={20} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },
  selectedContainer: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  type: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLORS.text,
  },
  addressLine: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  chevron: {
    paddingLeft: SPACING.sm,
  },
});
