import Image from "next/image";
import ChatBot from "./components/ChatBot";
import FoodCard from "./components/FoodCard";
import { food } from "./data";

export default function Home() {
  return (
    <main className="bg-gray-800 min-h-screen">
    
      <ChatBot />
      <div className="grid grid-cols-2 gap-4 p-4 h-[calc(100vh-64px)] overflow-y-auto">        
        {food.map((item) => (
          <FoodCard key={item.id} food={item} />
        ))}
      </div>
    
    
    
    </main>

  );
}
