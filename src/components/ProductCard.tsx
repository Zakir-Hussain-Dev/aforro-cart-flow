import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Plus, Minus } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../theme/constants';
import { Product, useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  horizontal?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  horizontal = false 
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
        {product.originalPrice && product.originalPrice > product.price && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>52% OFF</Text>
          </View>
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
        <Text style={styles.brand}>Cadbury</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.unit}>{product.unit}</Text>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price}</Text>
            {product.originalPrice && product.originalPrice > product.price && (
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            )}
          </View>

          {product.inStock && (
            <View style={styles.controls}>
              {quantity > 0 ? (
                <View style={styles.quantityControl}>
                  <TouchableOpacity 
                    onPress={(e) => { e.stopPropagation(); updateQuantity(product.id, quantity - 1); }}
                    style={styles.quantityBtn}
                  >
                    <Minus size={14} color={COLORS.primary} strokeWidth={3} />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity 
                    onPress={(e) => { e.stopPropagation(); addToCart(product); }}
                    style={styles.quantityBtn}
                  >
                    <Plus size={14} color={COLORS.primary} strokeWidth={3} />
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
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.sm,
    width: 156,
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
    overflow: 'hidden',
  },
  horizontalContainer: {
    flexDirection: 'row',
    width: '100%',
    marginRight: 0,
    marginBottom: SPACING.md,
  },
  imageContainer: {
    height: 120,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
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
    top: -SPACING.sm,
    left: -SPACING.sm,
    backgroundColor: COLORS.infoBlueText,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderBottomRightRadius: 8,
    zIndex: 1,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
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
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    height: 32,
    lineHeight: 16,
    marginBottom: 2,
  },
  unit: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginBottom: SPACING.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  originalPrice: {
    fontSize: 10,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
  },
  controls: {
    alignItems: 'flex-end',
  },
  addButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: COLORS.white,
  },
  addButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  quantityBtn: {
    padding: 2,
  },
  quantityText: {
    paddingHorizontal: 6,
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12,
    minWidth: 20,
    textAlign: 'center',
  },
});
