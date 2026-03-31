import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ticket, ChevronRight } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/constants';

interface Coupon {
  id: string;
  code: string;
  discount: string;
  description: string;
  isApplied: boolean;
}

export const DUMMY_COUPONS: Coupon[] = [
  { id: '1', code: 'ABCDEFGHI', discount: '₹250 OFF', description: 'Upto ₹120 on orders above ₹1200', isApplied: true },
  { id: '2', code: 'ABCDEFGHI', discount: '8% OFF', description: 'Upto ₹120 on orders above ₹1200', isApplied: false },
  { id: '3', code: 'ABCDEFGHI', discount: '8% OFF', description: 'Upto ₹120 on orders above ₹1200', isApplied: false },
];

export const CouponCard: React.FC<{ coupon: Coupon; onApply: (id: string) => void }> = ({ coupon, onApply }) => {
  return (
    <View style={styles.card}>
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{coupon.discount}</Text>
      </View>
      <Text style={styles.descriptionText}>{coupon.description}</Text>
      <View style={styles.codeContainer}>
        <Text style={styles.codeText}>{coupon.code}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.applyButton, coupon.isApplied && styles.appliedButton]} 
        onPress={() => onApply(coupon.id)}
      >
        <Text style={[styles.applyButtonText, coupon.isApplied && styles.appliedButtonText]}>
          {coupon.isApplied ? '✓ Applied' : 'APPLY'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const CouponList: React.FC<{ onApply: (id: string) => void }> = ({ onApply }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ticket size={18} color={COLORS.infoBlueText} />
          <Text style={styles.title}>Top coupons for you</Text>
        </View>
        <ChevronRight size={18} color={COLORS.textTertiary} />
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {DUMMY_COUPONS.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} onApply={onApply} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.viewMore}>
        <Text style={styles.viewMoreText}>View more coupons and offers</Text>
        <ChevronRight size={14} color={COLORS.textTertiary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
    marginTop: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
  },
  card: {
    width: 140,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  discountBadge: {
    backgroundColor: COLORS.infoBlue,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: SPACING.xs,
  },
  discountText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLORS.infoBlueText,
  },
  descriptionText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    height: 28,
  },
  codeContainer: {
    backgroundColor: COLORS.background,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed' as any,
    marginBottom: SPACING.sm,
  },
  codeText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.text,
  },
  applyButton: {
    width: '100%',
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
  },
  appliedButton: {
    backgroundColor: COLORS.badgeGreen,
    borderColor: COLORS.primary,
  },
  applyButtonText: {
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLORS.primary,
  },
  appliedButtonText: {
    color: COLORS.primary,
  },
  viewMore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  viewMoreText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
