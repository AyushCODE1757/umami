import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

function cartReducer(state, action) {
  if (action.type === 'ADD') {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    
    const updatedItems = [...state.items]; 
    
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === 'REM') {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    
    if (existingCartItemIndex === -1) return state;

    const existingItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  if(action.type === 'CLEAR'){
    return {...state, items: []};
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, cartDispatcher] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    cartDispatcher({
      type: 'ADD',
      item
    });
  }

  function removeItem(id) {
    cartDispatcher({
      type: 'REM',
      id
    });
  }
  function clearCart(){
    cartDispatcher({
      type: 'CLEAR'
    })
  }

  const cartContextValue = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;