import { useContext, useActionState } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext.jsx";
import Input from "./Input.jsx";
import UserProgressContext from "./UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext); 
  const { progress, hideCheckout } = useContext(UserProgressContext);

  // Balanced hook state mapping using errorState from your custom code
  const { 
    data, 
    errorState, 
    sendRequest,
    clearData
  } = useHttp('http://localhost:8080/orders', requestConfig);

  const cartTotal = items.reduce(
    (total, item) => total + item.quantity * Number(item.price), 
    0
  );

  function handleClose() {
    hideCheckout();
  }

  function handleFinish() {
    hideCheckout();
    clearCart(); // Clears out your shopping items context
    clearData(); // Resets hook data back to null so the form is clean for next time
  }

  async function checkoutAction(prevState, formData) {
    const customerData = Object.fromEntries(formData.entries());

    const orderPayload = {
      name: customerData.name,
      email: customerData.email,
      street: customerData.street,
      "postal-code": customerData["postal-code"],
      city: customerData.city,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    await sendRequest(orderPayload);
  }

  const [formState, formAction, isSending] = useActionState(checkoutAction, null);

  // --- RENDERING STRATEGY CONTROLS ---

  // 1. Default Interactive Button Row Layout
  let actions = (
    <div className="border-t border-stone-800 pt-4 mt-6 flex justify-end gap-3 items-center">
      <button 
        type="button" 
        onClick={handleClose}
        className="px-5 py-2.5 rounded-xl text-stone-400 hover:text-stone-200 text-sm font-bold transition-all cursor-pointer"
      >
        Close
      </button>
      <button 
        type="submit"
        className="bg-teal-400 hover:bg-teal-300 text-stone-950 font-black text-sm uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-teal-400/10 cursor-pointer"
      >
        Submit Order
      </button>
    </div>
  );

  // 2. Loading Flight Status State
  if (isSending) {
    actions = (
      <div className="border-t border-stone-800 pt-4 mt-6 flex justify-end items-center py-2">
        <p className="text-teal-400 text-xs font-black uppercase tracking-widest animate-pulse">
          Transmitting Secure Order Request...
        </p>
      </div>
    );
  }

  // 3. Success Layout Modal View (Intercepts response map from Spring Boot)
  if (data && !errorState) {
    return (
      <Modal open={progress === 'checkout'} className="max-w-md" onClose={handleFinish}>
        <div className="text-center py-6 flex flex-col items-center">
          <div className="h-14 w-14 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex items-center justify-center text-2xl text-teal-400 mb-4 shadow-inner animate-bounce">
            ✓
          </div>
          <h2 className="text-2xl font-black uppercase tracking-wider text-teal-200">
            Order Confirmed!
          </h2>
          <p className="text-stone-400 text-sm font-medium px-4 mt-2 mb-1">
            Your delicious fusion feast has been recorded successfully.
          </p>
          <p className="text-xs text-stone-500 bg-stone-950/60 px-3 py-1.5 rounded-lg border border-stone-800 font-mono mt-2">
            ID: <span className="text-teal-400 font-bold">{data.orderId}</span>
          </p>
          
          <button 
            onClick={handleFinish}
            className="mt-8 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all w-full border border-stone-700/50 cursor-pointer"
          >
            Awesome, thank you!
          </button>
        </div>
      </Modal>
    );
  }

  // 4. Default Interactive Checkout Input Form Layout
  return (
    <Modal open={progress === 'checkout'} className="max-w-md" onClose={handleClose}>
      <form action={formAction} className="flex flex-col h-full">
        
        <div className="border-b border-stone-800 pb-3 mb-5">
          <h2 className="text-2xl font-black uppercase tracking-wider text-teal-200">
            Checkout
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Total Amount: <span className="text-teal-400 font-extrabold">${cartTotal.toFixed(2)}</span>
          </p>
        </div>

        <div className="space-y-1">
          <Input label="Full Name" id="name" type="text" placeholder="John Doe" />
          <Input label="E-mail Address" id="email" type="email" placeholder="john@example.com" />
          <Input label="Street Address" id="street" type="text" placeholder="123 Main St" />
          
          <div className="flex gap-4 w-full">
            <Input label="Postal Code" id="postal-code" type="text" placeholder="10001" />
            <Input label="City" id="city" type="text" placeholder="New York" />
          </div>
        </div>

        {/* Display custom network runtime errors dynamically right above controls */}
        {errorState && (
          <p className="text-xs text-red-400 font-bold bg-red-950/30 border border-red-900/40 px-3 py-2.5 rounded-xl mt-4 text-center">
            {errorState}
          </p>
        )}

        {actions}
      </form>
    </Modal>
  );
}