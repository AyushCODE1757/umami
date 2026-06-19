import Cart from "./components/Cart.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { UserProgressContextProvider } from "./components/UserProgressContext.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
export default function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <div className="min-h-screen bg-linear-to-b from-stone-900 via-stone-950 to-stone-900 text-stone-100">
          <Header />
          <main className="max-w-7xl mx-auto px-[10%] py-10">
            <Meals/>
          </main>
          <Cart/>
        </div>
      </CartContextProvider>
    </UserProgressContextProvider>
    
    
  );
}