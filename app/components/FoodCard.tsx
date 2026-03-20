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
    
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-full">
      <div className="p-6 grow flex justify-center items-center flex-col">
        <img src={food.img} alt={food.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
        <h5 className="text-xl font-bold mb-2">{food.name}</h5>
        <p className="text-gray-600 mt-auto">${food.price.toFixed(2)}</p>
      </div>
    </div>
  )

}


export default FoodCard;