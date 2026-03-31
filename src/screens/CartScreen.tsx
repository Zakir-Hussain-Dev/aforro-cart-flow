import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  FlatList, 
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { CartItem } from '../components/CartItem';
import { ProductCard } from '../components/ProductCard';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../theme/constants';
import { useCart, Product } from '../context/CartContext';

const SUGGESTED_PRODUCTS: Product[] = [
  {
    id: '3',
    name: 'Oreo Vanilla Creme Biscuit',
    price: 30,
    originalPrice: 35,
    unit: '120g',
    image: 'https://m.media-amazon.com/images/I/61XG0f-N3+L._SL1000_.jpg',
    inStock: true,
  },
  {
    id: '5',
    name: 'Kellogg\'s Corn Flakes',
    price: 195,
    originalPrice: 210,
    unit: '475g',
    image: 'https://m.media-amazon.com/images/I/71X9qOn9L+L._SL1500_.jpg',
    inStock: true,
  },
];

export const CartScreen = () => {
  const navigation = useNavigation();
  const { items, itemCount, payableAmount } = useCart();

  if (itemCount === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Header title="Your Cart" />
        <View style={styles.emptyContent}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/11329/11329060.png' }} 
            style={styles.emptyImage} 
          />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Button 
            title="Start Shopping" 
            onPress={() => (navigation as any).navigate('Home')} 
            style={styles.shopBtn}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Review Cart" />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.cartItems}>
          <Text style={styles.sectionTitle}>Items in Cart ({itemCount})</Text>
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.suggestions}>
          <Text style={styles.sectionTitle}>Tops suggestions for you</Text>
          <FlatList
            data={SUGGESTED_PRODUCTS}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionList}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <SafeAreaView style={styles.bottomBar}>
        <View style={styles.totalInfo}>
          <View>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{payableAmount}</Text>
          </View>
          <Button 
            title="Review Cart" 
            onPress={() => (navigation as any).navigate('ReviewCart')} 
            style={styles.proceedBtn}
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
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semiBold as any,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  cartItems: {
    marginBottom: SPACING.lg,
  },
  suggestions: {
    marginBottom: SPACING.xl,
  },
  suggestionList: {
    paddingBottom: SPACING.md,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    elevation: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
  },
  totalValue: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLORS.text,
  },
  proceedBtn: {
    minWidth: 160,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: SPACING.lg,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.lg,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  shopBtn: {
    width: '100%',
  },
});
