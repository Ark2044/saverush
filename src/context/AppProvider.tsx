import React, {ReactNode} from 'react';
import {CartProvider} from './CartContext';
import {OrderProvider} from './OrderContext';
import {UserProvider} from './UserContext';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  return (
    <UserProvider>
      <CartProvider>
        <OrderProvider>{children}</OrderProvider>
      </CartProvider>
    </UserProvider>
  );
};
