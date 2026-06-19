import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext.jsx";
import Input from "./Input.jsx";
import UserProgressContext from "./UserProgressContext.jsx";

export default function Checkout() {
  const { items } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  // Formatted monetary price aggregation
  const cartTotal = items.reduce(
    (total, item) => total + item.quantity * Number(item.price), 
    0
  );

  function handleClose() {
    hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());
    
    console.log("Submitting Customer Order Data:", customerData);
    // Ready to be wired up to your Spring Boot POST endpoint next!
  }

  return (
    <Modal open={progress === 'checkout'} className="max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        
        {/* Form Title Header */}
        <div className="border-b border-stone-800 pb-3 mb-5">
          <h2 className="text-2xl font-black uppercase tracking-wider text-teal-200">
            Checkout
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Total Amount: <span className="text-teal-400 font-extrabold">${cartTotal.toFixed(2)}</span>
          </p>
        </div>

        {/* Form Fields Elements Container */}
        <div className="space-y-1">
          <Input label="Full Name" id="name" type="text" placeholder="John Doe" />
          <Input label="E-mail Address" id="email" type="email" placeholder="john@example.com" />
          <Input label="Street Address" id="street" type="text" placeholder="123 Main St" />
          
          {/* Horizontally aligned split column row for Postal Code and City */}
          <div className="flex gap-4 w-full">
            <Input label="Postal Code" id="postal-code" type="text" placeholder="10001" />
            <Input label="City" id="city" type="text" placeholder="New York" />
          </div>
        </div>

        {/* Bottom Actions Row Container */}
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

      </form>
    </Modal>
  );
}