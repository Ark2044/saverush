import React, {createContext, useContext, useReducer, ReactNode} from 'react';

interface UserAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: UserAddress[];
  defaultAddressId?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

type UserAction =
  | {type: 'LOGIN'; payload: User}
  | {type: 'LOGOUT'}
  | {type: 'UPDATE_PROFILE'; payload: Partial<User>}
  | {type: 'ADD_ADDRESS'; payload: UserAddress}
  | {type: 'UPDATE_ADDRESS'; payload: UserAddress}
  | {type: 'REMOVE_ADDRESS'; payload: string}
  | {type: 'SET_DEFAULT_ADDRESS'; payload: string}
  | {type: 'SET_LOADING'; payload: boolean};

const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
} | null>(null);

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? {...state.user, ...action.payload} : null,
      };
    case 'ADD_ADDRESS':
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              addresses: [...state.user.addresses, action.payload],
            }
          : null,
      };
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              addresses: state.user.addresses.map(addr =>
                addr.id === action.payload.id ? action.payload : addr,
              ),
            }
          : null,
      };
    case 'REMOVE_ADDRESS':
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              addresses: state.user.addresses.filter(
                addr => addr.id !== action.payload,
              ),
            }
          : null,
      };
    case 'SET_DEFAULT_ADDRESS':
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              defaultAddressId: action.payload,
              addresses: state.user.addresses.map(addr => ({
                ...addr,
                isDefault: addr.id === action.payload,
              })),
            }
          : null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    isAuthenticated: false,
    loading: false,
  });

  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
