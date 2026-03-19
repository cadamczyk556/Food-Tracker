
function ChatBot() {
    return (
        
        <div className="background-white p-6 rounded-lg shadow-md border-2  m-4 justify-end fixed right-0 insert-y-0 shadow-2x1 ">
            <input type="text" placeholder="Ask me anything about food!" className="w-full p-4 border rounded-lg mb-4 m-2 " />
            <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">ChatBot response will appear here...</p>
            </div>


        </div>

    
    );
}

export default ChatBot;