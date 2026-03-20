type FoodProps = {
  food: {
    id: number;
    img: string;
    name: string;
    price: number;
  };
}



function FoodCard({ food }: FoodProps) {
  return (
    
    <div className="flex flex-col bg-gray-600 border border-white/20 rounded-xl shadow-xl overflow-hidden h-full hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-1 hover:bg-gray-500">
      <div className="p-6 grow flex justify-center items-center flex-col">
        <img src={food.img} alt={food.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
        <h5 className="text-xl font-bold mb-2">{food.name}</h5>
        <p className="text-gray-600 mt-auto">${food.price.toFixed(2)}</p>
      </div>
    </div>
  )

}


export default FoodCard;