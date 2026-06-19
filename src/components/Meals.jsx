import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
    const [loadedMealState, setLoadedMealState] = useState([]);
    useEffect(() => {
    async function getAllMeals(){
        const response = await fetch('http://localhost:8080/meals');
        if (!response.ok) {
            //.
        }
        const meals = await response.json();
        setLoadedMealState(meals);
    }
    getAllMeals();
    }, []);
    
    return( 
    <main className="max-w-7xl mx-auto px-[10%] py-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full items-stretch list-none p-0 m-0">
            {loadedMealState.map(mealItem => 
            <li key={mealItem.id}>
            <MealItem meal={mealItem}/>
            </li>)}
        </ul>
    </main>
    );
}