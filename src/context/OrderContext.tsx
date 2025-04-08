import React, {createContext, useContext, useReducer, ReactNode} from 'react';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  estimatedDeliveryTime?: string;
  deliveryAddress: string;
  paymentMethod: 'card' | 'cash';
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
}

type OrderAction =
  | {type: 'CREATE_ORDER'; payload: Order}
  | {
      type: 'UPDATE_ORDER_STATUS';
      payload: {orderId: string; status: OrderStatus};
    }
  | {type: 'SET_CURRENT_ORDER'; payload: Order | null}
  | {type: 'CLEAR_ORDERS'};

const OrderContext = createContext<{
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
} | null>(null);

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'CREATE_ORDER': {
      return {
        ...state,
        orders: [...state.orders, action.payload],
        currentOrder: action.payload,
      };
    }
    case 'UPDATE_ORDER_STATUS': {
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? {...order, status: action.payload.status}
            : order,
        ),
        currentOrder:
          state.currentOrder?.id === action.payload.orderId
            ? {...state.currentOrder, status: action.payload.status}
            : state.currentOrder,
      };
    }
    case 'SET_CURRENT_ORDER':
      return {
        ...state,
        currentOrder: action.payload,
      };
    case 'CLEAR_ORDERS':
      return {
        orders: [],
        currentOrder: null,
      };
    default:
      return state;
  }
};

export const OrderProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(orderReducer, {
    orders: [],
    currentOrder: null,
  });

  return (
    <OrderContext.Provider value={{state, dispatch}}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
