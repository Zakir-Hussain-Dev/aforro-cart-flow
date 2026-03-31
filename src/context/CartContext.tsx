import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  unit: string;
  inStock: boolean;
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  deliveryFee: number;
  platformFee: number;
  discount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  itemCount: 0,
  totalAmount: 0,
  deliveryFee: 40,
  platformFee: 2,
  discount: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      let newItems;
      if (existingItemIndex > -1) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += 1;
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return { ...state, items: newItems };
    }
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return { ...state, items: newItems };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter(item => item.id !== id) };
      }
      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      return { ...state, items: newItems };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalSavings: number;
  payableAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const stats = useMemo(() => {
    const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalSavings = state.items.reduce((acc, item) => {
      if (item.originalPrice) {
        return acc + ((item.originalPrice - item.price) * item.quantity);
      }
      return acc;
    }, 0);
    
    // Simple logic: if total > 500, delivery is free
    const deliveryFee = totalAmount > 500 ? 0 : 40;
    const platformFee = 2;
    const discount = state.discount;
    const payableAmount = totalAmount + deliveryFee + platformFee - discount;

    return { itemCount, totalAmount, totalSavings, deliveryFee, platformFee, discount, payableAmount };
  }, [state.items, state.discount]);

  const addToCart = (product: Product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (id: string) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const updateQuantity = (id: string, quantity: number) => 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider 
      value={{ 
        ...state, 
        ...stats,
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
