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
    <Text style={styles.tealStarText}>%</Text>
  </View>
);

export const CouponCard: React.FC<{ coupon: Coupon; onApply: (id: string) => void }> = ({ coupon, onApply }) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.circularBadge}>
        <Text style={styles.circularBadgeText}>{coupon.discount}</Text>
      </View>

      <View style={[styles.card, coupon.isApplied && styles.appliedCard]}>
        <View style={styles.topSection}>
          <Text style={[
            styles.descriptionText,
            coupon.id === '1' && { color: '#E55555' }
          ]}>
            {coupon.description}
          </Text>

          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{coupon.code}</Text>
          </View>
        </View>

        {/* <View style={styles.dividerContainer}>
          <View style={styles.leftPunch} />
          <View style={styles.dashedDivider} />
          <View style={styles.rightPunch} />
        </View> */}

        {/* 4. Bottom Section (Apply/Applied Button) */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.applyButton, coupon.isApplied && styles.appliedButton]}
          onPress={() => onApply(coupon.id)}
        >
          {coupon.isApplied ? (
            <View style={styles.appliedButtonContent}>
              <CheckCircle2 size={16} color={COLORS.white} style={{ marginRight: 6 }} />
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
          🎉 You are <Text style={styles.boldText}>saving ₹250</Text> with this coupon! 🎉
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
    width: 22,
    height: 22,
    backgroundColor: COLORS.navTeal,
    borderRadius: 5,
    transform: [{ rotate: '45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  tealStarText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
    transform: [{ rotate: '-45deg' }],
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
    width: 155, // Slightly wider to match screenshot proportions
    marginRight: SPACING.md,
    alignItems: 'center',
  },
  circularBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.navTeal,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -30,
    zIndex: 10,
    borderWidth: 4,
    borderColor: COLORS.white,

  },
  circularBadgeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 18,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    alignItems: 'center',
    marginTop: 0,
    overflow: 'hidden',
  },
  topSection: {
    paddingTop: 36, // Extra space for top badge
    paddingBottom: 12,
    paddingHorizontal: SPACING.sm,
    alignItems: 'center',
    width: '100%',
  },
  descriptionText: {
    fontSize: 12,
    color: '#8A8A8A',
    textAlign: 'center',
    marginBottom: SPACING.sm,
    fontWeight: '600',
    lineHeight: 16,
    height: 34,
  },
  codeContainer: {
    marginBottom: SPACING.xs,
  },
  codeText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 20,
  },
  leftPunch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginLeft: -10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rightPunch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginRight: -10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dashedDivider: {
    flex: 1,
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    borderStyle: 'dashed',
    marginHorizontal: 2,
  },
  appliedCard: {
    borderColor: '#FFB075',
  },
  applyButton: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  appliedButton: {
    backgroundColor: '#FF8844',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFB075',
    letterSpacing: 1,
  },
  appliedButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appliedButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 1,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
    marginHorizontal: SPACING.md,
  },
  viewMoreText: {
    fontSize: 12,
    color: COLORS.textTertiary,
    fontWeight: '600',
    marginRight: 4,
  },
});
