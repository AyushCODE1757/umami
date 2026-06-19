export default function Input({ label, id, ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full mb-4 group">
      <label 
        htmlFor={id} 
        className="text-xs font-bold uppercase tracking-wider text-stone-400 group-focus-within:text-teal-400 transition-colors duration-200"
      >
        {label}
      </label>
      <input 
        id={id} 
        name={id} // Links both ID and Name to keep data structures clean
        required 
        {...props}
        className="w-full bg-stone-950 border border-stone-800 focus:border-teal-400 rounded-xl px-4 py-3 text-stone-100 text-sm outline-none transition-all duration-200 placeholder-stone-600 shadow-inner"
      />
    </div>
  );
}