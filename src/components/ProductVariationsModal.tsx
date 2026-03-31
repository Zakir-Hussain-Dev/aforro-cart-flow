import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Pressable
} from 'react-native';
import { Plus, Minus, X } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/constants';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';


const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Variation {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  count: number;
}

interface ProductVariationsModalProps {
  visible: boolean;
  onClose: () => void;
  productName: string;
  variations: Variation[];
}

export const ProductVariationsModal: React.FC<ProductVariationsModalProps> = ({
  visible,
  onClose,
  productName,
  variations
}) => {
  const { items, updateQuantity, addToCart } = useCart();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.content} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>
              {productName}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scroll}>
            {variations.map((variant) => {
              const cartItem = items.find(item => item.id === variant.id);
              const quantity = cartItem?.quantity || 0;

              return (
                <View key={variant.id} style={styles.variantCard}>
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: variant.image }} style={styles.image} resizeMode="contain" />
                    <View style={styles.countBadge}>
                      <Text style={styles.countBadgeText}>{variant.count}</Text>
                    </View>
                  </View>

                  <View style={styles.variantInfo}>
                    <Text style={styles.variantName}>{variant.name}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>₹{variant.price}</Text>
                      {variant.originalPrice && (
                        <Text style={styles.originalPrice}>₹{variant.originalPrice}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.controls}>
                    {quantity > 0 ? (
                      <View style={styles.quantityControl}>
                        <TouchableOpacity
                          onPress={() => updateQuantity(variant.id, quantity - 1)}
                          style={styles.quantityBtn}
                        >
                          <Minus size={18} color="#55913D" strokeWidth={3} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity
                          onPress={() => updateQuantity(variant.id, quantity + 1)}
                          style={styles.quantityBtn}
                        >
                          <Plus size={18} color="#55913D" strokeWidth={3} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <Button
                        title="Add"
                        onPress={() => addToCart({ ...variant, inStock: true } as any)}
                      />
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>

          <Button
            title="Confirm"
            onPress={onClose}
            style={styles.confirmBtn}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.8,
    padding: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
    lineHeight: 22,
    paddingRight: SPACING.md,
  },
  closeBtn: {
    padding: 4,
  },
  scroll: {
    marginBottom: SPACING.xl,
  },
  variantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  imageWrapper: {
    width: 60,
    height: 60,
    position: 'relative',
    marginRight: SPACING.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  countBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF8844',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  countBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
  variantInfo: {
    flex: 1,
  },
  variantName: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginBottom: 4,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
  },
  controls: {
    minWidth: 80,
    alignItems: 'flex-end',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#55913D',
    borderRadius: 8,
  },
  quantityBtn: {
    padding: 4,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    paddingHorizontal: 8,
  },
  confirmBtn: {
    alignItems: 'center',
  },
  confirmBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
