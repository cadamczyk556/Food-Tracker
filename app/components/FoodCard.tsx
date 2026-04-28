import Image from "next/image";

type FoodProps = {
  food: {
    id: number;
    img: string;
    name: string;
    price: number;
  };
}




//food as input 
function FoodCard({ food }: FoodProps) {
  return (
    
    <div className="flex flex-col bg-gray-600 border border-white/20 rounded-xl shadow-xl overflow-hidden h-full hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-1 hover:bg-gray-500">
      <div className="w-full h-48 relative">
        <Image 
          src={food.img} 
          alt={food.name}
          fill 
          className="w-full h-48 object-cover mb-4 rounded-lg" 
          />
        </div>

        <div className="p-6 grow flex-col justify-center items-center text-center gap-3">
          <h5 className="text-xl font-bold leading-none ">{food.name}</h5>
          <p className="text-gray-600 font-bold text-lg">${food.price.toFixed(2)}</p>
        </div>

    </div>
  )

}


export default FoodCard;