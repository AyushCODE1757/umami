export default function CartItem({key, name, price, quantity, onIncrease, onDecrease}){
    return(
        <li key={key} className="bg-stone-950/40 border border-stone-800/60 rounded-xl p-3.5 flex justify-between items-center group transition-colors hover:border-stone-800">
            <div className="flex flex-col pr-2">
                <span className="text-sm font-bold text-stone-100 group-hover:text-white transition-colors uppercase tracking-wide">
                    {name}
                </span>
                <span className="text-xs text-teal-400 font-semibold mt-0.5">
                    ${(Number(price) * quantity).toFixed(2)}
                </span>
            </div>
            <div className="flex items-center gap-2.5 bg-stone-900 border border-stone-800 px-2 py-1 rounded-xl">
                  <button 
                    className="text-stone-400 hover:text-teal-400 font-bold px-1.5 py-0.5 transition-colors text-sm cursor-pointer"
                    onClick={onDecrease}
                  >
                    −
                  </button>
                  <span className="text-xs font-black text-stone-200 min-w-3.5 text-center">
                    {quantity}
                  </span>
                  <button 
                    className="text-stone-400 hover:text-teal-400 font-bold px-1.5 py-0.5 transition-colors text-sm cursor-pointer"
                    onClick={onIncrease}>
                    +
                  </button>
            </div>
        </li>
    )
}