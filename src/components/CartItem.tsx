import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../theme/constants';
import { CartItem as CartItemType, useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <View style={styles.infoArea}>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.unit}>{item.unit}</Text>
        </View>

        <View style={styles.rightArea}>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
              style={styles.quantityBtn}
            >
              <Minus size={14} color={COLORS.primary} strokeWidth={3} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              style={styles.quantityBtn}
            >
              <Plus size={14} color={COLORS.primary} strokeWidth={3} />
            </TouchableOpacity>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{item.price}</Text>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    alignItems: 'center',
  },
  imageContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 8,
    padding: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoArea: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 18,
  },
  unit: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 2,
    fontWeight: '600',
  },
  rightArea: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4E8C2F', // Greenish from Figma
    borderRadius: 6,
    paddingHorizontal: 2,
    paddingVertical: 2,
    backgroundColor: COLORS.white,
    marginBottom: 8,
  },
  quantityBtn: {
    padding: 4,
  },
  quantityText: {
    paddingHorizontal: 8,
    color: '#4E8C2F',
    fontWeight: '800',
    fontSize: 12,
    minWidth: 24,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },
  originalPrice: {
    fontSize: 11,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
});
