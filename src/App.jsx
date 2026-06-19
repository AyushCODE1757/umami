import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
export default function App() {
  return (
    <CartContextProvider>
      <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 text-stone-100">
        <Header />
        <main className="max-w-7xl mx-auto px-[10%] py-10">
          <Meals/>
        </main>
      </div>
    </CartContextProvider>
    
  );
}