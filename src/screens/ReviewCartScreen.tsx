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
import { MapPin, Info, Plus } from 'lucide-react-native';
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

  const OutOfStockBanner = () => {
    const outOfStockItems = items.filter(item => !item.inStock);
    if (outOfStockItems.length === 0) return null;

    return (
      <View style={styles.ootBanner}>
        <Text style={styles.ootTitle}>This item is out of stock</Text>
        <Text style={styles.ootText}>
          Please remove these items to proceed with the rest of your order.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Review Cart" />
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Savings Ribbon */}
        <InfoBanner 
          message={`You are saving ₹${totalSavings} with this order!`} 
          variant="info" 
          style={styles.ribbon}
        />

        {/* Warning Banner */}
        <InfoBanner 
          message="Your order might be delayed due to high demand" 
          variant="warning" 
          style={styles.banner}
          icon={<Info size={16} color={COLORS.warningYellowText} />}
        />

        {/* Cart Items */}
        <View style={styles.itemsSection}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </View>

        <OutOfStockBanner />

        {/* Did you forget? Section */}
        <View style={styles.suggestionSection}>
          <Text style={styles.sectionTitle}>Did you forget?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionScroll}>
            {[1, 2, 3].map((i) => (
              <View key={i} style={styles.suggestionBox}>
                <Image 
                  source={{ uri: 'https://rukminim2.flixcart.com/image/240/240/xif0q/milk/x/d/c/fresh-toned-milk-500-ml-pack-of-1-toned-milk-amul-original-imah2yr8tysp2bwm.jpeg' }} 
                  style={styles.suggestionImage}
                  resizeMode="contain"
                />
                <Text style={styles.suggestionName}>Amul Toned Milk</Text>
                <Text style={styles.suggestionPrice}>₹30</Text>
                <TouchableOpacity style={styles.suggestionAdd}>
                  <Plus size={14} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Address Selection */}
        <View style={styles.addressSection}>
          <TouchableOpacity 
            style={styles.addressRow}
            onPress={() => (navigation as any).navigate('AddressSelection')}
          >
            <MapPin color={COLORS.infoBlueText} size={20} />
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>Deliver to Home</Text>
              <Text style={styles.addressSnippet} numberOfLines={1}>
                {selectedAddress ? `${selectedAddress.houseNo}, ${selectedAddress.area}` : 'Select a delivery address'}
              </Text>
            </View>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <CouponList onApply={() => {}} />

        {/* Cashback Banner */}
        <View style={styles.cashbackBanner}>
          <View style={styles.cashbackIcon}>
             <Info size={16} color={COLORS.infoBlueText} />
          </View>
          <Text style={styles.cashbackText}>
            Add items worth <Text style={styles.boldText}>₹45 more</Text> to get <Text style={styles.boldText}>1% cashback</Text>
          </Text>
        </View>

        <DeliveryInstructionsSelector />

        <View style={styles.billSection}>
          <PriceDetails />
        </View>

        {/* Final Savings Ribbon below bill */}
        <InfoBanner 
          message={`You are saving ₹${totalSavings} with this order!`} 
          variant="info" 
          style={styles.bottomRibbon}
        />

        <View style={styles.cancellationPolicy}>
          <Text style={styles.policyTitle}>Cancellation Policy</Text>
          <Text style={styles.policyText}>
            You can cancel your order for free within the first minutes. After that, a cancellation fee will apply.
          </Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <SafeAreaView style={styles.bottomBar}>
        <View style={styles.bottomContent}>
          <View>
            <Text style={styles.finalTotalValue}>₹{payableAmount}</Text>
            <TouchableOpacity onPress={() => {}}>
               <Text style={styles.viewBillText}>View Bill Details</Text>
            </TouchableOpacity>
          </View>
          <Button 
            title={isAuthenticated ? "Proceed" : "Login to Continue"} 
            onPress={handleProceed} 
            style={styles.finalBtn}
            disabled={items.some(item => !item.inStock)}
          />
        </View>
      </SafeAreaView>
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
  ribbon: {
    marginVertical: 0,
    borderRadius: 0,
    justifyContent: 'center',
  },
  banner: {
    margin: SPACING.md,
    marginBottom: 0,
  },
  itemsSection: {
    backgroundColor: COLORS.white,
    marginTop: SPACING.md,
  },
  suggestionSection: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    marginTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLORS.text,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  suggestionScroll: {
    paddingLeft: SPACING.md,
  },
  suggestionBox: {
    width: 100,
    marginRight: SPACING.md,
    alignItems: 'center',
    paddingBottom: SPACING.sm,
  },
  suggestionImage: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    marginBottom: SPACING.xs,
  },
  suggestionName: {
    fontSize: 10,
    color: COLORS.text,
    textAlign: 'center',
    height: 28,
  },
  suggestionPrice: {
    fontSize: 10,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  suggestionAdd: {
    position: 'absolute',
    top: 45,
    right: 15,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  addressSection: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginTop: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
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
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addressSnippet: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  changeText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  cashbackBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginTop: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.divider,
    marginHorizontal: SPACING.md,
    borderRadius: 8,
  },
  cashbackIcon: {
    marginRight: SPACING.sm,
  },
  cashbackText: {
    fontSize: 11,
    color: COLORS.text,
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  billSection: {
    backgroundColor: COLORS.white,
    marginTop: SPACING.md,
  },
  bottomRibbon: {
    marginHorizontal: SPACING.md,
    borderRadius: 8,
    marginTop: -SPACING.lg,
    zIndex: 1,
  },
  cancellationPolicy: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  policyTitle: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: 'bold',
    color: COLORS.textTertiary,
    marginBottom: 4,
  },
  policyText: {
    fontSize: 10,
    color: COLORS.textTertiary,
    lineHeight: 14,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  viewBillText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  finalBtn: {
    minWidth: 140,
    borderRadius: 8,
  },
  ootBanner: {
    backgroundColor: '#FFE5E5',
    padding: SPACING.md,
    borderRadius: 8,
    margin: SPACING.md,
    borderWidth: 1,
    borderColor: '#FFB2B2',
  },
  ootTitle: {
    color: COLORS.error,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  ootText: {
    color: COLORS.error,
    fontSize: 10,
  },
});
