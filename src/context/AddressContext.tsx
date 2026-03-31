import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  addressLine1: string;
  addressLine2?: string;
  houseNo?: string;
  area?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface AddressContextType {
  addresses: Address[];
  selectedAddress: Address | null;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

const mockAddresses: Address[] = [
  {
    id: '1',
    type: 'Home',
    addressLine1: 'Street 4, Vaishali Nagar',
    houseNo: 'H.No. 123',
    area: 'Vaishali Nagar',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302021',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Work',
    addressLine1: 'Sector 5, Mansarovar',
    houseNo: 'Plot No. 45',
    area: 'Mansarovar',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302020',
    isDefault: false,
  },
];

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(mockAddresses[0]);

  const addAddress = (address: Address) => {
    setAddresses(prev => [...prev, address]);
  };

  const removeAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    if (selectedAddress?.id === id) {
      setSelectedAddress(addresses.find(addr => addr.id !== id) || null);
    }
  };

  const selectAddress = (id: string) => {
    const addr = addresses.find(a => a.id === id);
    if (addr) setSelectedAddress(addr);
  };

  return (
    <AddressContext.Provider value={{ addresses, selectedAddress, addAddress, removeAddress, selectAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};
