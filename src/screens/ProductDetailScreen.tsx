import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Minus, Plus } from 'lucide-react-native';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../theme/constants';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useCart, Product } from '../context/CartContext';

// For simplicity, we define the product lookup here or reuse the dummy data
const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Dairy Milk Silk Bubbly Chocolate Bar',
    description: 'Enjoy the smooth and creamy taste of Cadbury Dairy Milk Silk with a unique bubbly center. Every bite of this silk chocolate is designed to melt in your mouth, giving you a smooth and velvety texture. It\'s the perfect treat for chocolate lovers who crave something extra special.',
    price: 80,
    originalPrice: 90,
    unit: '50g',
    image: 'https://m.media-amazon.com/images/I/61mI0N+5eGL._SL1000_.jpg',
    inStock: true,
    category: 'Chocolates',
  },
  {
    id: '2',
    name: 'Cadbury Celebrations Gift Pack',
    description: 'Cadbury Celebrations Gift Pack is a premium collection of assorted chocolates, making it an ideal gift for festivals and special occasions. This pack contains a variety of classic Cadbury flavors that will delight any chocolate enthusiast.',
    price: 150,
    originalPrice: 175,
    unit: '118g',
    image: 'https://m.media-amazon.com/images/I/71uK5S6lH6L._SL1500_.jpg',
    inStock: true,
    category: 'Chocolates',
  },
];

export const ProductDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const navigation = useNavigation();
  const { productId } = route.params;
  const { items, addToCart, updateQuantity } = useCart();

  const product = DUMMY_PRODUCTS.find(p => p.id === productId) || DUMMY_PRODUCTS[0];
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <View style={styles.container}>
      <Header title="Product Details" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>52% OFF</Text>
          </View>
          <Image 
            source={{ uri: product.image }} 
            style={styles.image} 
            resizeMode="contain" 
          />
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.brand}>Cadbury</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.unit}>{product.unit}</Text>

          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{product.price}</Text>
              {product.originalPrice && (
                <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
              )}
            </View>
            {product.originalPrice && (
               <View style={styles.discountBadge}>
                  <Text style={styles.discountBadgeText}>52% OFF</Text>
               </View>
            )}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Product Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.benefits}>
            <BenefitItem text="100% Genuine product" />
            <BenefitItem text="Express delivery in 30 mins" />
            <BenefitItem text="Easy replacement policy" />
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <SafeAreaView style={styles.bottomBar}>
        {quantity > 0 ? (
          <View style={styles.bottomContent}>
            <View style={styles.quantityControl}>
              <TouchableOpacity 
                onPress={() => updateQuantity(product.id, quantity - 1)}
                style={styles.quantityBtn}
              >
                <Minus size={20} color={COLORS.primary} strokeWidth={3} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                onPress={() => addToCart(product)}
                style={styles.quantityBtn}
              >
                <Plus size={20} color={COLORS.primary} strokeWidth={3} />
              </TouchableOpacity>
            </View>
            <Button 
               title="View Cart" 
               onPress={() => (navigation as any).navigate('ReviewCart')} 
               style={styles.viewCartBtn}
            />
          </View>
        ) : (
          <Button 
            title={product.inStock ? "Add to Cart" : "Out of Stock"} 
            onPress={() => addToCart(product)} 
            disabled={!product.inStock}
            style={styles.addBtn}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const BenefitItem = ({ text }: { text: string }) => (
  <View style={styles.benefitRow}>
    <View style={styles.benefitDot} />
    <Text style={styles.benefitText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    backgroundColor: COLORS.infoBlueText,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: SPACING.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.divider,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 12,
  },
  content: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  brand: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  unit: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  originalPrice: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  discountBadge: {
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountBadgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  benefits: {
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: 8,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  benefitDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: SPACING.sm,
  },
  benefitText: {
    fontSize: 14,
    color: COLORS.textSecondary,
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
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    borderRadius: 8,
    padding: 2,
  },
  quantityBtn: {
    padding: 8,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: SPACING.md,
    color: COLORS.primary,
  },
  viewCartBtn: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  addBtn: {
    width: '100%',
  },
});
