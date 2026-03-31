import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/constants';
import { useCart } from '../context/CartContext';

export const PriceDetails: React.FC = () => {
  const { totalAmount, deliveryFee, platformFee, discount, payableAmount } = useCart();

  const Row = ({ label, value, isBold = false, isDiscount = false, color }: any) => (
    <View style={styles.row}>
      <Text style={[styles.label, isBold && styles.boldText]}>{label}</Text>
      <Text style={[
        styles.value, 
        isBold && styles.boldText, 
        isDiscount && styles.discountText,
        color && { color }
      ]}>
        {isDiscount ? '-' : ''}₹{value === 'FREE' ? 'FREE' : value}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bill Details</Text>
      
      <Row label="Item total" value={totalAmount} />
      <Row 
        label="Delivery fee" 
        value={deliveryFee === 0 ? 'FREE' : deliveryFee} 
        color={deliveryFee === 0 ? COLORS.infoBlueText : COLORS.text}
      />
      <Row label="Discount" value={discount} isDiscount={true} color={COLORS.infoBlueText} />
      <Row label="Platform fee" value={platformFee} />
      
      <View style={styles.payableRow}>
        <Text style={styles.payableLabel}>Total payable amount</Text>
        <Text style={styles.payableValue}>₹{payableAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 12,
    color: COLORS.text,
  },
  boldText: {
    fontWeight: 'bold',
  },
  discountText: {
    fontWeight: 'bold',
  },
  payableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  payableLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  payableValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});
