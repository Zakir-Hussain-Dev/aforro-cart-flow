import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Plus, Minus, ChevronDown } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../theme/constants';
import { Product, useCart } from '../context/CartContext';
import { DiscountBadge } from './DiscountBadge';

interface ProductCardProps {
  product: any;
  horizontal?: boolean;
  onPressOptions?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  horizontal = false,
  onPressOptions
}) => {
  const navigation = useNavigation();
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handlePress = () => {
    (navigation as any).navigate('ProductDetail', { productId: product.id });
  };

  return (
    <TouchableOpacity
      style={[styles.container, horizontal && styles.horizontalContainer]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={[styles.imageContainer, horizontal && styles.horizontalImageContainer]}>
        {(product.originalPrice && product.originalPrice > product.price) && (
          <DiscountBadge percentage={52} containerStyle={styles.badge} />
        )}
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
        {!product.inStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Out of stock</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.brand}>{product.brand || 'Aforro'}</Text>
          <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
          <Text style={styles.unit}>{product.unit}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            )}
          </View>

          <View style={styles.controls}>
            {product.variations ? (
              <TouchableOpacity
                style={styles.optionsButton}
                onPress={(e) => { e.stopPropagation(); onPressOptions?.(); }}
              >
                <Text style={styles.optionsButtonText}>2 options</Text>
                <ChevronDown size={14} color={COLORS.white} />
              </TouchableOpacity>
            ) : quantity > 0 ? (
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  onPress={(e) => { e.stopPropagation(); updateQuantity(product.id, quantity - 1); }}
                  style={styles.quantityBtn}
                >
                  <Minus size={14} color="#55913D" strokeWidth={3} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  onPress={(e) => { e.stopPropagation(); addToCart(product); }}
                  style={styles.quantityBtn}
                >
                  <Plus size={14} color="#55913D" strokeWidth={3} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={(e) => { e.stopPropagation(); addToCart(product); }}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    width: 160,
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  horizontalContainer: {
    flexDirection: 'row',
    width: '100%',
    marginRight: 0,
    marginBottom: SPACING.md,
  },
  imageContainer: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    position: 'relative',
  },
  horizontalImageContainer: {
    height: 80,
    width: 80,
    marginBottom: 0,
    marginRight: SPACING.md,
  },
  badge: {
    position: 'absolute',
    top: -10,
    left: -10,
    zIndex: 10,
  },
  image: {
    width: '90%',
    height: '90%',
  },
  outOfStockBadge: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.8)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: COLORS.error,
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginBottom: 2,
    fontWeight: '500',
  },
  name: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.text,
    height: 30,
    lineHeight: 15,
    marginBottom: 4,
  },
  unit: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginBottom: SPACING.sm,
  },
  footer: {
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 10,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
  },
  controls: {
    width: '100%',
  },
  addButton: {
    backgroundColor: '#55913D',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 12,
  },
  optionsButton: {
    backgroundColor: '#55913D',
    borderRadius: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  optionsButtonText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 11,
    marginRight: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#55913D',
    borderRadius: 8,
    backgroundColor: COLORS.white,
    paddingVertical: 4,
    justifyContent: 'center',
  },
  quantityBtn: {
    padding: 4,
  },
  quantityText: {
    paddingHorizontal: 12,
    color: '#55913D',
    fontWeight: '900',
    fontSize: 13,
    minWidth: 32,
    textAlign: 'center',
  },
});
