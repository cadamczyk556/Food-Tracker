import Image from "next/image";

type FoodProps = {
  food: {
    id: number;
  name: string;
  img: string;
  price: string;
  price_per_unit: string;
  vendor: string;
  };
}




//food as input 
function FoodCard({ food }: FoodProps) {
  const displayPrice = food.price ? `$${food.price}` : "N/A";
  return (
    
    <div className="flex p-5 flex-col bg-gray-600 border border-white/20 rounded-xl shadow-xl overflow-hidden min-h-[160px] hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-1 hover:bg-gray-500">

      <div className="flex justify-start mb-3">
        <div className="z-10 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
          {food.vendor}
          </div>
        </div>
      
      <div className="grow mb-4">
        {/* line-clamp-2 forces long names to safely wrap and truncate with ... */}
        <h5 className="text-lg font-semibold text-white line-clamp-3 leading-snug">
          {food.name}
        </h5>
        </div>

        <div className="pt-3 border-t border-gray-500">
          <div className="flex items-baseline gap-2">
            <h5 className="text-2xl font-extrabold text-green-400">{displayPrice}</h5>
            <p className="text-gray-300 font-medium text-sm">{food.price_per_unit}</p>
        </div>
        </div>

    </div>
  )

}


export default FoodCard;