import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { AddressProvider } from './AddressContext';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <AddressProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AddressProvider>
    </AuthProvider>
  );
};
