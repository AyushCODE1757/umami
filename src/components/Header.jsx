import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "./UserProgressContext";

export default function Header(){
  const {items} = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0)

  function handleShowCart() {
    userProgressCtx.showCart();
  }
   return (
    <header className="bg-stone-900 border-b-2 border-teal-400 sticky top-0 z-50 px-[10%] py-5 shadow-lg">
      <div className="flex items-center justify-between">
        
        {/* Brand Group */}
        <div className="flex items-center gap-3">
          <img 
            src="./logo.png" 
            alt="Logo" 
            className="w-14 h-14 object-cover rounded-xl shadow-md border border-teal-400/20 transition-transform duration-300 hover:rotate-6"
            />
          <h1 className="uppercase text-3xl font-black tracking-wider text-teal-200 drop-shadow">
            Umami
          </h1>
        </div>
        
        {/* Navigation Action */}
        <nav>
          <button 
            className="group relative px-6 py-2.5 rounded-xl border border-transparent hover:border-teal-400/30 bg-transparent hover:bg-linear-to-r hover:from-stone-800 hover:to-stone-850 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            onClick={handleShowCart}
          >
            {/* The Text content shifts from simple white underline to dynamic glow teal */}
            <h2 className="text-white underline group-hover:text-teal-400 group-hover:no-underline transition-all duration-300 font-medium tracking-wide">
              Cart ({totalItems})
            </h2>
          </button>
        </nav>
        
      </div>
    </header>
  );
}