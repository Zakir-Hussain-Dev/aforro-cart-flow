import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme/constants';

interface Coupon {
  id: string;
  code: string;
  discount: string;
  description: string;
  subtext?: string;
  isApplied: boolean;
}

export const DUMMY_COUPONS: Coupon[] = [
  {
    id: '1',
    code: 'ABCDEFGHI',
    discount: '₹250 \n OFF',
    description: 'Add items worth ₹20 to avail this offer',
    isApplied: false
  },
  {
    id: '2',
    code: 'ABCDEFGHI',
    discount: '₹250 \n OFF',
    description: 'Upto ₹120 on orders above ₹1200',
    isApplied: true
  },
  {
    id: '3',
    code: 'ABCDEFGHI',
    discount: '₹250 \n OFF',
    description: 'Upto ₹120 on orders above ₹1200',
    isApplied: false
  },
];

// Custom Teal Star Icon from Figma
const TealStar = () => (
  <View style={styles.tealStar}>
    <View style={styles.tealStarInner} />
  </View>
);

export const CouponCard: React.FC<{ coupon: Coupon; onApply: (id: string) => void }> = ({ coupon, onApply }) => {
  return (
    <View style={styles.cardWrapper}>
      {/* The overlapping circular badge */}
      <View style={styles.circularBadge}>
        <Text style={styles.circularBadgeText}>{coupon.discount}</Text>
      </View>

      <View style={[styles.card, coupon.isApplied && styles.appliedCard]}>
        {/* Ticket Punch Holes */}
        <View style={styles.leftPunch} />
        <View style={styles.rightPunch} />

        <Text style={[
          styles.descriptionText,
          coupon.id === '1' && { color: COLORS.error }
        ]}>
          {coupon.description}
        </Text>

        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>{coupon.code}</Text>
        </View>

        <TouchableOpacity
          style={[styles.applyButton, coupon.isApplied && styles.appliedButton]}
          onPress={() => onApply(coupon.id)}
        >
          {coupon.isApplied ? (
            <View style={styles.appliedButtonContent}>
              <CheckCircle2 size={12} color={COLORS.white} style={{ marginRight: 4 }} />
              <Text style={styles.appliedButtonText}>APPLIED</Text>
            </View>
          ) : (
            <Text style={styles.applyButtonText}>APPLY</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const CouponList: React.FC<{ onApply: (id: string) => void }> = ({ onApply }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TealStar />
        <Text style={styles.title}>Top coupons for you</Text>
        <TealStar />
      </View>

      <View style={styles.dashedLine} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {DUMMY_COUPONS.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} onApply={onApply} />
        ))}
      </ScrollView>

      <View style={styles.dashedLine} />

      {/* Savings Summary Banner */}
      <View style={styles.savingsBanner}>
        <Text style={styles.savingsBannerText}>
          🥳 You are <Text style={styles.boldText}>saving ₹250</Text> with this coupon! 🥳
        </Text>
      </View>

      <View style={[styles.dashedLine, { marginTop: SPACING.md }]} />

      <TouchableOpacity style={styles.viewMore}>
        <Text style={styles.viewMoreText}>View more coupons and offers</Text>
        <ChevronRight size={14} color={COLORS.textTertiary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    marginTop: SPACING.md,
    borderRadius: 16,
    marginHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  tealStar: {
    width: 18,
    height: 18,
    backgroundColor: '#007C7C',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
  tealStarInner: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.white,
    borderRadius: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.navTeal,
    marginHorizontal: SPACING.sm,
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    borderStyle: 'dashed',
    marginHorizontal: SPACING.md,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: 32, // Space for circular overlapping badges
    paddingBottom: SPACING.md,
  },
  cardWrapper: {
    width: 120,
    marginRight: SPACING.md,
    alignItems: 'center',
  },
  circularBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#007C7C',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -22, // Positioning to overlap the top of the card
    zIndex: 6,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  circularBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.divider,
    padding: SPACING.sm,
    paddingTop: 24, // Internal space for the badge
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden', // Required for punch hole effect
  },
  leftPunch: {
    position: 'absolute',
    left: -10,
    top: '50%',
    marginTop: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.background, // Match screen background
    borderWidth: 1,
    borderColor: COLORS.divider,
    zIndex: 1,
  },
  rightPunch: {
    position: 'absolute',
    right: -10,
    top: '50%',
    marginTop: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.divider,
    zIndex: 1,
  },
  appliedCard: {
    borderColor: '#FFBB99',
  },
  descriptionText: {
    fontSize: 9,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    height: 28,
    fontWeight: '600',
  },
  codeContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: SPACING.sm,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  applyButton: {
    width: '100%',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    borderStyle: 'dashed',
  },
  appliedButton: {
    backgroundColor: '#FF8844',
    borderTopWidth: 0,
    borderRadius: 8,
  },
  applyButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FF8844',
  },
  appliedButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appliedButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.white,
  },
  savingsBanner: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  savingsBannerText: {
    fontSize: 13,
    color: '#007C7C',
    fontWeight: '600',
  },
  boldText: {
    fontWeight: '800',
  },
  viewMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  viewMoreText: {
    fontSize: 12,
    color: COLORS.textTertiary,
    fontWeight: '600',
    marginRight: 4,
  },
});
