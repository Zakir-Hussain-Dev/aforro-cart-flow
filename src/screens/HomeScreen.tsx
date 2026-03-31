import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/constants';
import { Product } from '../context/CartContext';

const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Dairy Milk Silk Bubbly Chocolate Bar',
    description: 'Enjoy the smooth and creamy taste of Cadbury Dairy Milk Silk with a unique bubbly center.',
    price: 80,
    originalPrice: 90,
    unit: '50g',
    image: 'https://rukminim2.flixcart.com/image/2880/2880/xif0q/chocolate/o/z/0/-original-imah2yr8tysp2bwm.jpeg?q=90',
    inStock: true,
    category: 'Chocolates',
  },
  {
    id: '2',
    name: 'Cadbury Celebrations Gift Pack',
    description: 'Perfect gift for your loved ones containing assorted chocolates.',
    price: 150,
    originalPrice: 175,
    unit: '118g',
    image: 'https://m.media-amazon.com/images/I/71uK5S6lH6L._SL1500_.jpg',
    inStock: true,
    category: 'Chocolates',
  },
  {
    id: '3',
    name: 'Oreo Vanilla Creme Biscuit',
    description: 'Crunchy cocoa cookies with smooth vanilla cream filling.',
    price: 30,
    originalPrice: 35,
    unit: '120g',
    image: 'https://m.media-amazon.com/images/I/61XG0f-N3+L._SL1000_.jpg',
    inStock: true,
    category: 'Biscuits',
  },
  {
    id: '4',
    name: 'Amul Taaza Homogenised Milk',
    description: 'Fresh and nutritious milk from Amul.',
    price: 68,
    originalPrice: 70,
    unit: '1L',
    image: 'https://m.media-amazon.com/images/I/61X-p1m+3XL._SL1500_.jpg',
    inStock: false,
    category: 'Dairy',
  },
  {
    id: '5',
    name: 'Kellogg\'s Corn Flakes',
    description: 'Start your day with the original Kellogg\'s Corn Flakes.',
    price: 195,
    originalPrice: 210,
    unit: '475g',
    image: 'https://m.media-amazon.com/images/I/71X9qOn9L+L._SL1500_.jpg',
    inStock: true,
    category: 'Breakfast',
  },
];

export const HomeScreen = () => {
  const renderCategory = (title: string, products: Product[]) => (
    <View style={styles.categorySection}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Aforro Cart" showBack={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Freshness delivered to your doorstep</Text>
        </View>

        {renderCategory('Chocolates & Sweets', DUMMY_PRODUCTS.filter(p => p.category === 'Chocolates'))}
        {renderCategory('Biscuits & Snacks', DUMMY_PRODUCTS.filter(p => p.category === 'Biscuits'))}
        {renderCategory('Dairy & Essentials', DUMMY_PRODUCTS.filter(p => p.category === 'Dairy' || p.category === 'Breakfast'))}

        <View style={{ height: SPACING.xxl }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  hero: {
    padding: SPACING.lg,
    backgroundColor: COLORS.primary,
    marginBottom: SPACING.md,
  },
  heroTitle: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLORS.white,
    textAlign: 'center',
  },
  categorySection: {
    marginBottom: SPACING.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  categoryTitle: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLORS.text,
  },
  seeAll: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weight.semiBold as any,
  },
  productList: {
    paddingLeft: SPACING.md,
  },
});
