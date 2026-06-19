import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "./UserProgressContext";
import CartItem from "./CartItem";

export default function Cart(){
    const {items, addItem, removeItem} = useContext(CartContext);
    const {progress, hideCart, showCheckout} = useContext(UserProgressContext);
    const cartTotal = items.reduce((total, item) => total + item.quantity * Number(item.price), 0);
    function handleCloseCart(){
        hideCart();
    }
    function handleShowCheckout(){
        showCheckout();
    }
    return (
    <Modal className="max-w-md" open={progress === 'cart'} onClose={handleCloseCart}>
        <div className="border-b border-stone-800 pb-4 mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-black uppercase tracking-wider text-teal-200">Your Cart</h2>
            <span className="bg-stone-800 text-teal-400 border border-teal-500/20 text-xs font-bold px-2.5 py-1 rounded-md">
                {items.reduce((total, item) => total + item.quantity, 0)}
            </span>
        </div>
        {items.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center">
            <span className="text-4xl mb-3">🛒</span>
            <p className="text-stone-400 text-sm font-medium">Your cart is empty.</p>
            <p className="text-stone-500 text-xs mt-1">Add some delicious meals to get started!</p>
          </div>
        ) :
        (
            <ul>
                {items.map((item) => (
                    <CartItem 
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    onIncrease={() => addItem(item)}
                    onDecrease={() => removeItem(item.id)}
                    />
                ))}
            </ul>
        )}
        <div className="border-t border-stone-800 pt-4 mt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-bold tracking-wide uppercase text-stone-400">Total Amount:</span>
            <span className="text-2xl font-black text-teal-400 tracking-tight">
              ${cartTotal.toFixed(2)}
            </span>
          </div>

          {/* Action Navigation Row */}
          <div className="flex justify-end gap-3">
            <button 
                onClick={handleCloseCart}
                 className="px-5 py-2.5 rounded-xl text-stone-400 hover:text-stone-200 text-sm font-bold transition-all cursor-pointer"
            >
              Close
            </button>
            {items.length > 0 && (
              <button 
                className="bg-teal-400 hover:bg-teal-300 text-stone-950 font-black text-sm uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-teal-400/10 cursor-pointer"
                onClick={handleShowCheckout}
              >
                Go to Checkout
              </button>
            )}
          </div>
        </div>

    </Modal>
    );
}