import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../theme/constants';
import { CartItem as CartItemType, useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleArea}>
            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.unit}>{item.unit}</Text>
          </View>
          <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
            <Trash2 size={18} color={COLORS.error} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{item.price}</Text>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
            )}
          </View>

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
  },
  imageContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 8,
  },
  image: {
    width: '90%',
    height: '90%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleArea: {
    flex: 1,
  },
  name: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.semiBold as any,
    color: COLORS.text,
    lineHeight: 18,
  },
  unit: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  removeBtn: {
    padding: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLORS.text,
  },
  originalPrice: {
    fontSize: 11,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    paddingHorizontal: 2,
    paddingVertical: 2,
    backgroundColor: COLORS.white,
  },
  quantityBtn: {
    padding: 4,
  },
  quantityText: {
    paddingHorizontal: 8,
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12,
    minWidth: 24,
    textAlign: 'center',
  },
});
