import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem.jsx";

// Declared outside the component to keep the reference stable across updates
const requestConfig = { method: 'GET' }; 

export default function Meals() {
  // Destructured errorState exactly as it is returned by your custom useHttp hook
  const { 
    data: loadedMealState, 
    isLoading, 
    errorState 
  } = useHttp('http://localhost:8080/meals', requestConfig, []);

  // 1. Loading UI State Overlay
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-400 mb-4"></div>
        <p className="text-stone-400 font-medium text-sm animate-pulse tracking-wide uppercase">
          Curating Fresh Fusion Menus...
        </p>
      </div>
    );
  }

  // 2. Error Fallback UI State Overlay (Displays your custom backend message if it crashes)
  if (errorState) {
    return (
      <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-8 max-w-lg mx-auto text-center my-12">
        <span className="text-3xl">⚠️</span>
        <h3 className="text-red-400 font-black uppercase tracking-wider text-sm mt-3 mb-1">
          Connection Issue
        </h3>
        <p className="text-stone-400 text-sm font-medium">{errorState}</p>
      </div>
    );
  }

  // 3. Main Operational Menu Grid Layout
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full items-stretch list-none p-0 m-0">
      {loadedMealState.map((mealItem) => (
        <li 
          key={mealItem.id}
          className="flex h-full transform transition-all duration-300 hover:-translate-y-1"
        >
          <MealItem meal={mealItem} />
        </li>
      ))}
    </ul>
  );
}