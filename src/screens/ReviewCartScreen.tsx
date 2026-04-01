import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapPin, Info, Plus, ChevronDown, ShoppingCart } from 'lucide-react-native';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { InfoBanner } from '../components/InfoBanner';
import { CouponList } from '../components/CouponList';
import { DeliveryInstructionsSelector } from '../components/DeliveryInstructionsSelector';
import { PriceDetails } from '../components/PriceDetails';
import { CartItem } from '../components/CartItem';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/constants';
import { useCart } from '../context/CartContext';
import { useAddress } from '../context/AddressContext';
import { useAuth } from '../context/AuthContext';
import { DiscountBadge } from '../components/DiscountBadge';

export const ReviewCartScreen = () => {
  const navigation = useNavigation();
  const { items, payableAmount, totalSavings } = useCart();
  const { selectedAddress } = useAddress();
  const { isAuthenticated } = useAuth();

  const handleProceed = () => {
    if (!isAuthenticated) {
      (navigation as any).navigate('Login');
    } else {
      Alert.alert('Success', 'Order placed successfully!');
    }
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Header title="Review Cart" />
        <View style={styles.emptyContent}>
          <View style={styles.emptyIconCircle}>
            <ShoppingCart size={48} color={COLORS.navTeal} />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added anything to your cart yet.
          </Text>
          <Button
            title="Start Shopping"
            onPress={() => (navigation as any).navigate('Home')}
            style={styles.emptyBtn}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Review Cart" />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* <InfoBanner
          message={`You are saving ₹${totalSavings} with this order!`}
          variant="info"
          style={styles.topInfo}
        /> */}

        <InfoBanner
          message="You are saving ₹99 with this order!"
          variant="info"
          style={styles.topWarning}
          icon={<Info size={16} color={COLORS.warningYellowText} />}
        />

        <View style={styles.itemsSection}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </View>

        {/* suggestions block */}
        <View style={styles.suggestionSection}>
          <Text style={styles.sectionTitle}>Did you forget?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionScroll}>
            {[1, 2, 3].map((i) => (
              <View key={i} style={styles.suggestionBox}>
                <DiscountBadge percentage={52} containerStyle={styles.suggestionBadge} />
                <Image
                  source={{ uri: i === 3 ? 'https://rukminim2.flixcart.com/image/2880/2880/xif0q/chocolate/o/z/0/-original-imah2yr8tysp2bwm.jpeg?q=90' : 'https://rukminim2.flixcart.com/image/2880/2880/xif0q/chocolate/o/z/0/-original-imah2yr8tysp2bwm.jpeg?q=90' }}
                  style={styles.suggestionImage}
                  resizeMode="contain"
                />
                <Text style={styles.suggestionBrand}>Tata Tea</Text>
                <Text style={styles.suggestionName} numberOfLines={2}>Gold Premium Assam Tea Rich...</Text>
                <Text style={styles.suggestionUnit}>1kg</Text>
                <View style={styles.suggestionPriceRow}>
                  <Text style={styles.suggestionPrice}>₹444</Text>
                  <Text style={styles.suggestionOriginalPrice}>₹2444</Text>
                </View>
                <TouchableOpacity style={[styles.suggestionBtn, i < 3 && styles.suggestionBtnOptions]}>
                  {i < 3 ? (
                    <View style={styles.btnContent}>
                      <Text style={styles.btnText}>2 options</Text>
                      <ChevronDown size={14} color={COLORS.white} />
                    </View>
                  ) : (
                    <Text style={styles.btnText}>Add</Text>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Coupons */}
        <CouponList onApply={() => { }} />

        {/* Cashback Banner */}
        <View style={styles.cashbackBanner}>
          <View style={styles.cashbackIconCircle}>
            <Image
              source={{ uri: 'https://c7.alamy.com/comp/2PPM009/cashback-icon-isolated-on-blue-background-cashback-or-money-back-label-vector-illustration-2PPM009.jpg' }}
              style={styles.cashbackImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cashbackContent}>
            <Text style={styles.cashbackTitle}>Yay! You’ve received a cashback of ₹200</Text>
            <Text style={styles.cashbackSubtitle}>The cashback will be added in your Aforro wallet</Text>
          </View>
        </View>

        <DeliveryInstructionsSelector />

        <PriceDetails />



        <View style={styles.policySection}>
          <Text style={styles.policyTitle}>Cancellation policy</Text>
          <Text style={styles.policyText}>
            You can cancel your order for free within the first 90 seconds. After that, a cancellation fee will apply.
          </Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <SafeAreaView>
          {/* Deliver to address block */}
          <TouchableOpacity
            style={styles.bottomAddressRow}
            onPress={() => (navigation as any).navigate('AddressSelection')}
          >
            <View style={styles.pinCircle}>
              <MapPin color={COLORS.white} size={14} fill={COLORS.white} />
            </View>
            <View style={styles.bottomAddressInfo}>
              <Text style={styles.bottomAddressLabel}>Deliver to</Text>
              <Text style={styles.bottomAddressText} numberOfLines={1}>
                {selectedAddress ? `${selectedAddress.houseNo}, ${selectedAddress.area}` : 'Select a delivery address'}
              </Text>
            </View>
            <Text style={styles.bottomChangeText}>Change</Text>
          </TouchableOpacity>

          <View style={styles.bottomDivider} />

          <View style={styles.bottomContent}>
            <View>
              <Text style={styles.bottomPayLabel}>To Pay</Text>
              <Text style={styles.bottomPayAmount}>₹{payableAmount}</Text>
            </View>
            <Button
              title={isAuthenticated ? "PROCEED" : "Login to continue"}
              onPress={handleProceed}
              style={styles.finalBtn}
              disabled={items.some(item => !item.inStock)}
            />
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  topInfo: {
    marginVertical: 0,
    borderRadius: 0,
    justifyContent: 'center',
    paddingVertical: SPACING.md,
  },
  topWarning: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    borderRadius: 12,
  },
  itemsSection: {
    backgroundColor: COLORS.white,
    marginTop: SPACING.md,
    borderRadius: 12,
    marginHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  suggestionSection: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: 12,
    marginHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  suggestionScroll: {
    paddingLeft: SPACING.md,
  },
  suggestionBox: {
    width: 130,
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 12,
    padding: SPACING.sm,
    position: 'relative',
    backgroundColor: COLORS.white,
  },
  suggestionBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  suggestionImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: SPACING.xs,
  },
  suggestionBrand: {
    fontSize: 9,
    color: COLORS.textTertiary,
    marginBottom: 2,
    fontWeight: '600',
  },
  suggestionName: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.text,
    height: 30,
    lineHeight: 14,
  },
  suggestionUnit: {
    fontSize: 9,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  suggestionPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  suggestionPrice: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.text,
  },
  suggestionOriginalPrice: {
    fontSize: 9,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  suggestionBtn: {
    backgroundColor: '#4E8C2F',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  suggestionBtnOptions: {
    backgroundColor: '#529734',
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
    marginRight: 4,
  },
  addressSection: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginTop: SPACING.md,
    borderRadius: 12,
    marginHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressInfo: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  addressSnippet: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  changeText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '800',
  },
  cashbackBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginTop: SPACING.md,
    alignItems: 'center',
    marginHorizontal: SPACING.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.divider,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cashbackIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.navTeal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    overflow: 'hidden',
  },
  cashbackImage: {
    width: 30,
    height: 30,
    padding: 30
  },
  cashbackContent: {
    flex: 1,
  },
  cashbackTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 20,
  },
  cashbackSubtitle: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  boldText: {
    fontWeight: '800',
  },
  policySection: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: 12,
    marginHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
    marginBottom: "20%",
  },
  policyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  policyText: {
    fontSize: 11,
    color: COLORS.textTertiary,
    lineHeight: 16,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  bottomAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  pinCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.navTeal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  bottomAddressInfo: {
    flex: 1,
  },
  bottomAddressLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  bottomAddressText: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  bottomChangeText: {
    fontSize: 14,
    color: '#4E8C2F',
    fontWeight: '800',
  },
  bottomDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: -SPACING.lg,
    marginBottom: SPACING.md,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: SPACING.xs,
  },
  bottomPayLabel: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginBottom: 2,
  },
  bottomPayAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
  },
  finalBtn: {
    minWidth: '60%',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D6F4F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textTertiary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
  emptyBtn: {
    width: '100%',
    backgroundColor: COLORS.navTeal,
  },
});
