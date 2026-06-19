import { useContext } from "react";
import CartContext from "../store/CartContext";

export default function MealItem({ meal }) {
  const { addItem } = useContext(CartContext);
  function handleAddToCart(){
    addItem(meal);
  }
  const imageSrc = `http://localhost:8080/${meal.image}`;
  return (
    <li className="flex list-none">
      <article className="w-full min-h-120 bg-linear-to-br from-teal-900 via-stone-900 to-stone-950 border-2 border-teal-500/20 hover:border-teal-400 rounded-3xl p-5 flex flex-col justify-between shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-teal-400/10 group">
        
        {/* Top Section: Structured Image Frame inside the Teal card */}
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 mb-4">
          <img 
            src={imageSrc} 
            alt={meal.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Absolute Floated Price Badge */}
          <span className="absolute bottom-3 right-3 bg-teal-400 text-stone-950 font-black px-3 py-1 rounded-xl text-xs shadow-md uppercase tracking-wider">
            ${meal.price}
          </span>
        </div>

        {/* Middle Section: Identity & Info */}
        <div className="flex flex-col grow">
          <h3 className="text-xl font-black text-white group-hover:text-teal-300 transition-colors duration-200 uppercase tracking-wide mb-2 line-clamp-1">
            {meal.name}
          </h3>
          
          {/* Translucent description shield to make text pop against the background gradient */}
          <div className="bg-stone-950/40 backdrop-blur-xs border border-stone-800/50 rounded-xl p-3 grow mb-4 flex items-center">
            <p className="text-stone-400 text-xs leading-relaxed line-clamp-3">
              {meal.description}
            </p>
          </div>
        </div>
        
        {/* Bottom Section: Solid Action Button matching the design */}
        <div className="mt-auto">
          <button
            className="w-full bg-teal-400 hover:bg-teal-300 text-stone-950 font-black tracking-wider uppercase py-3 px-4 rounded-xl transition-all duration-200 active:scale-95 text-center text-sm shadow-md hover:shadow-teal-400/20 cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>

      </article>
    </li>
  );
}