import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  CircleDollarSign,
  Info,
  BadgePercent,
  Bike,
  Tag
} from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/constants';
import { useCart } from '../context/CartContext';
import { ScallopedBanner } from '../components/ScallopedBanner';

export const PriceDetails: React.FC = () => {
  const { totalAmount, deliveryFee, platformFee, discount, payableAmount } = useCart();

  const Row = ({
    label,
    value,
    isBold = false,
    isDiscount = false,
    color,
    icon: IconComp,
    originalValue,
    subtext,
    badge
  }: any) => (
    <View style={styles.rowContainer}>
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <View style={styles.iconCircle}>
            {IconComp && <IconComp size={12} color={COLORS.textSecondary} />}
          </View>
          <Text style={[styles.label, isBold && styles.boldText]}>{label}</Text>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <View style={styles.valueContainer}>
          {originalValue && (
            <Text style={styles.originalValue}>₹{originalValue}</Text>
          )}
          <Text style={[
            styles.value,
            isBold && styles.boldText,
            isDiscount && styles.discountText,
            color && { color }
          ]}>
            {isDiscount ? '-' : ''}₹{value === 'FREE' ? 'FREE' : value}
          </Text>
        </View>
      </View>
      {subtext && (
        <Text style={styles.subtext}>{subtext}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Row
        label="Item total"
        value={totalAmount}
        icon={CircleDollarSign}
        badge="Saved ₹20"
      />
      <View style={styles.dashedDivider} />

      <Row
        label="Delivery fee"
        value={deliveryFee === 0 ? 'FREE' : deliveryFee}
        originalValue={444}
        color="#FF8844"
        icon={Bike}
        subtext="Add items worth ₹20 to get free delivery"
      />
      <View style={styles.dashedDivider} />

      <Row
        label="Discount"
        value={discount}
        isDiscount={true}
        color={COLORS.text}
        icon={BadgePercent}
      />
      <View style={styles.dashedDivider} />

      <Row
        label="Platform fee"
        value={platformFee}
        icon={Tag}
      />

      <View style={styles.dashedDivider} />

      <View style={styles.payableRow}>
        <Text style={styles.payableLabel}>Total payable amount</Text>
        <Text style={styles.payableValue}>₹{payableAmount}</Text>
      </View>

      <>
        <ScallopedBanner
          message={`You are saving ₹${99} with this order!`}
          style={styles.scallopedContainer}
        />
      </>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginTop: SPACING.md,
    borderRadius: 16,
    marginHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  rowContainer: {
    paddingVertical: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#FFE5D1', // Matching Figma peach-orange mix
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeText: {
    color: '#FF8844',
    fontSize: 9,
    fontWeight: '900',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '700',
  },
  originalValue: {
    fontSize: 12,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  subtext: {
    fontSize: 11,
    color: '#FF8844',
    marginLeft: 30,
    marginTop: 0,
    fontWeight: '600',
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    borderStyle: 'dashed',
    marginVertical: 4,
  },
  boldText: {
    fontWeight: '700',
  },
  discountText: {
    fontWeight: '700',
  },
  payableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
  },
  payableLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  payableValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
  },

  scallopedContainer: {
    marginTop: SPACING.sm,
  },
});
