import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, ShoppingCart } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/constants';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showCart?: boolean;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  showCart = true,
  rightElement,
}) => {
  const navigation = useNavigation();
  const { itemCount } = useCart();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ChevronLeft color={COLORS.text} size={24} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title} numberOfLines={1}>{title}</Text>

        <View style={styles.right}>
          {rightElement ? (
            rightElement
          ) : (
            showCart && (
              <TouchableOpacity 
                onPress={() => (navigation as any).navigate('Cart')}
                style={styles.cartButton}
              >
                <ShoppingCart color={COLORS.text} size={24} />
                {itemCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{itemCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
  },
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  left: {
    width: 40,
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.semiBold as any,
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
  },
  cartButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
