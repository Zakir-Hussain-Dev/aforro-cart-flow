import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapPin, Plus, Check, ChevronRight } from 'lucide-react-native';
import { Header } from '../components/Header';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../theme/constants';
import { useAddress, Address } from '../context/AddressContext';

export const AddressSelectionScreen = () => {
  const navigation = useNavigation();
  const { addresses, selectedAddress, selectAddress } = useAddress();

  const handleSelectAddress = (id: string) => {
    selectAddress(id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Delivery Address" showBack={true} showCart={false} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Addresses</Text>
          
          {addresses.map((address) => {
            const isSelected = selectedAddress?.id === address.id;
            
            return (
              <TouchableOpacity
                key={address.id}
                style={[
                  styles.addressCard,
                  isSelected && styles.selectedCard
                ]}
                onPress={() => handleSelectAddress(address.id)}
              >
                <View style={styles.addressIconContainer}>
                  <MapPin 
                    size={20} 
                    color={isSelected ? COLORS.primary : COLORS.textSecondary} 
                  />
                </View>
                
                <View style={styles.addressInfo}>
                  <View style={styles.titleRow}>
                    <Text style={styles.addressType}>{address.type}</Text>
                    {address.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultText}>DEFAULT</Text>
                      </View>
                    )}
                  </View>
                  
                  <Text style={styles.addressText} numberOfLines={2}>
                    {address.houseNo}, {address.area}, {address.city}, {address.state} - {address.pincode}
                  </Text>
                </View>
                
                <View style={styles.actionIcon}>
                  {isSelected ? (
                    <View style={styles.checkCircle}>
                        <Check size={14} color={COLORS.white} strokeWidth={3} />
                    </View>
                  ) : (
                    <ChevronRight size={20} color={COLORS.textTertiary} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        
        <TouchableOpacity style={styles.addAddressBtn}>
          <View style={styles.addIconContainer}>
            <Plus size={20} color={COLORS.primary} strokeWidth={3} />
          </View>
          <Text style={styles.addAddressText}>Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <SafeAreaView style={styles.bottomPadding} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGreen + '30', // 30 is opacity
  },
  addressIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  addressInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressType: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginRight: SPACING.sm,
  },
  defaultBadge: {
    backgroundColor: COLORS.divider,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textTertiary,
  },
  addressText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  actionIcon: {
    marginLeft: SPACING.sm,
  },
  checkCircle: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
  },
  addAddressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.white,
  },
  addIconContainer: {
     marginRight: SPACING.sm,
  },
  addAddressText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  bottomPadding: {
    backgroundColor: COLORS.background,
  }
});
