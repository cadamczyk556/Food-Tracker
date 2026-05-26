"use client";
import Image from "next/image";
import  React, {useState, useEffect, Suspense} from "react";
import ChatBot from "../components/ChatBot";
import FoodCard from "../components/FoodCard";
import { useSearchParams } from "next/navigation";

export interface GroceryItem {
  id: number;
  name: string;
  img: string;
  price: string;
  price_per_unit: string;
  vendor: string;
}


function GroceryList() {

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [foods, setFoods] = useState<GroceryItem[]>([]);
  const [Loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getFoods = async () => {
      setLoading(true);
      try {

        const response = await fetch(`http://localhost:8000/api/search?query=${searchQuery}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setFoods(data);

      } catch (error) {
        console.error("failed to get food data:", error);
      } finally {
        setLoading(false);
      }
    };

    getFoods();

    }, [searchQuery]);

    return (
    <div className="grid grid-cols-2 gap-4 p-4 h-[calc(100vh-64px)] overflow-y-auto">        
      {Loading ? (
        <div className="text-white text-xl col-span-2 text-center mt-10">
          Loading database...
        </div>
      ) : foods.length > 0 ? (
        foods.map((item) => (
          <FoodCard key={item.id} food={item} />
        ))
      ) : (
        <div className="text-white col-span-2 text-center mt-10">
          No results found for "{searchQuery}".
        </div>
      )}
    </div>
  );
}
  
  export default function Home() {
    return (    
      <main className="bg-gray-800 min-h-screen">
      
        <ChatBot />

        <Suspense fallback={<div className="text-white text-center mt-4">Loading...</div>}>
          <GroceryList />
        </Suspense>
      
      </main>

    );
  }
