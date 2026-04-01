import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Share
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { ChevronLeft, Share2, ChevronDown, ShoppingCart } from 'lucide-react-native';
import { ProductCard } from '../components/ProductCard';
import { ProductVariationsModal } from '../components/ProductVariationsModal';
import { Button } from '../components/Button';
import { DiscountBadge } from '../components/DiscountBadge';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/constants';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useCart, Product } from '../context/CartContext';
export const DUMMY_PRODUCTS: (Product & { brand?: string; relatedIds?: string[]; variations?: any[] })[] = [
  {
    id: '1',
    brand: 'Cadbury',
    name: 'Dairy milk Silk Chocolate Bar',
    description: 'Smooth and creamy milk chocolate bar, perfect for sharing. (100% veg).',
    price: 444,
    originalPrice: 444,
    unit: '64 g',
    image: 'https://rukminim2.flixcart.com/image/2880/2880/xif0q/chocolate/o/z/0/-original-imah2yr8tysp2bwm.jpeg?q=90',
    inStock: true,
    category: 'Chocolates',
    relatedIds: ['101', '102', '103'],
    variations: [
      { id: 'v1', name: '3 x 1kg', price: 444, originalPrice: 2444, image: 'https://rukminim2.flixcart.com/image/2880/2880/xif0q/chocolate/o/z/0/-original-imah2yr8tysp2bwm.jpeg?q=90', count: 3 },
      { id: 'v2', name: '1 x 1kg', price: 150, originalPrice: 800, image: 'https://rukminim2.flixcart.com/image/2880/2880/xif0q/chocolate/o/z/0/-original-imah2yr8tysp2bwm.jpeg?q=90', count: 1 },
    ]
  },
  {
    id: '101',
    brand: 'Tata Tea',
    name: 'Gold Premium\nAssam Tea Rich...',
    price: 444,
    originalPrice: 2444,
    unit: '1kg',
    image: 'https://rukminim2.flixcart.com/image/2880/2880/xif0q/chocolate/o/z/0/-original-imah2yr8tysp2bwm.jpeg?q=90',
    inStock: true,
    category: 'Tea',
  },
  {
    id: '102',
    brand: 'Tata Tea',
    name: 'Gold Premium\nAssam Tea Rich...',
    price: 444,
    originalPrice: 2444,
    unit: '1kg',
    image: 'https://rukminim2.flixcart.com/image/2880/2880/xif0q/chocolate/o/z/0/-original-imah2yr8tysp2bwm.jpeg?q=90',
    inStock: true,
    category: 'Tea',
  },
  {
    id: '103',
    brand: 'Tata Tea',
    name: 'Organic apple',
    price: 444,
    originalPrice: 2444,
    unit: '1kg',
    image: 'https://rukminim2.flixcart.com/image/2880/2880/xif0q/chocolate/o/z/0/-original-imah2yr8tysp2bwm.jpeg?q=90',
    inStock: true,
    category: 'Fruit',
  },
];

export const ProductDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const navigation = useNavigation();
  const { productId } = route.params;
  // console.log("mounted product route:", productId);
  
  const { items, addToCart, itemCount, payableAmount } = useCart();
  
  const [modalVisible, setModalVisible] = useState(false);

  const product = DUMMY_PRODUCTS.find(p => p.id === productId) || DUMMY_PRODUCTS[0];
  const relatedProducts = DUMMY_PRODUCTS.filter(p => product.relatedIds?.includes(p.id));

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${product.name} on Aforro!`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* header component */}
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <ChevronLeft size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{product.name}</Text>
          <TouchableOpacity onPress={handleShare} style={styles.headerBtn}>
            <Share2 size={24} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => (navigation as any).navigate('ReviewCart')} 
            style={styles.headerBtn}
          >
            <View style={styles.cartIconWrapper}>
              <ShoppingCart size={24} color={COLORS.text} />
              {itemCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{itemCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.card}>
          <View style={styles.heroImageContainer}>
            <DiscountBadge percentage={52} containerStyle={styles.heroBadge} />
            <Image source={{ uri: product.image }} style={styles.heroImage} resizeMode="contain" />
            <View style={styles.pagination}>
              <View style={[styles.dot, { backgroundColor: '#FF8844', width: 12 }]} />
              {[1, 2, 3, 4].map(i => <View key={i} style={styles.dot} />)}
            </View>
          </View>
          
          <View style={styles.heroInfo}>
            <Text style={styles.brand}>{product.brand || 'Cadbury'}</Text>
            <Text style={styles.name}>{product.name}</Text>
            
            <View style={styles.priceRow}>
              <View>
                <Text style={styles.unit}>{product.unit}</Text>
                <View style={[styles.flexRow, { alignItems: 'center' }]}>
                   <Text style={styles.price}>₹{product.price}</Text>
                   <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.optionsButton} 
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.optionsButtonText}>2 options</Text>
                <ChevronDown size={14} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* TODO: fetch related products from backend */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Similar product</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {relatedProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onPressOptions={() => setModalVisible(true)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Customers also bought</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {relatedProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onPressOptions={() => setModalVisible(true)}
              />
            ))}
          </ScrollView>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>

      <ProductVariationsModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        productName={product.name}
        variations={product.variations || []}
      />

      {/* Bottom info bar when cart has items */}
      {itemCount > 0 && (
        <SafeAreaView style={styles.floatingCartBar}>
          <TouchableOpacity 
            style={styles.cartBarContent}
            onPress={() => (navigation as any).navigate('ReviewCart')}
          >
            <View>
              <Text style={styles.cartBarCount}>{itemCount} ITEM{itemCount > 1 ? 'S' : ''}</Text>
              <Text style={styles.cartBarTotal}>₹{payableAmount} plus taxes</Text>
            </View>
            <View style={styles.viewCartAction}>
              <Text style={styles.viewCartText}>View Cart</Text>
              <ShoppingCart size={20} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  headerBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: SPACING.md,
  },
  scrollContent: {
    paddingVertical: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
  },
  heroImageContainer: {
    height: 280,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    position: 'relative',
  },
  heroImage: {
    width: '85%',
    height: '85%',
  },
  heroBadge: {
    position: 'absolute',
    top: -SPACING.md,
    left: -SPACING.md,
    zIndex: 10,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  heroInfo: {
    marginTop: SPACING.md,
  },
  brand: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginBottom: 4,
    fontWeight: '500',
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 24,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  flexRow: {
    flexDirection: 'row',
  },
  unit: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginBottom: 4,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
  },
  optionsButton: {
    backgroundColor: '#55913D',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsButtonText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 14,
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  horizontalScroll: {
    paddingBottom: 4,
  },
  description: {
    fontSize: 13,
    color: COLORS.textTertiary,
    lineHeight: 18,
  },
  cartIconWrapper: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#55913D',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  cartBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '900',
  },
  floatingCartBar: {
    position: 'absolute',
    bottom: SPACING.lg,
    left: SPACING.md,
    right: SPACING.md,
    backgroundColor: '#55913D',
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cartBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  cartBarCount: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    opacity: 0.9,
  },
  cartBarTotal: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
  },
  viewCartAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCartText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
    marginRight: 8,
  },
});
