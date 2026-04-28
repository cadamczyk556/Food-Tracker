"use client";

import React, { useState } from 'react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Fixed positioning anchors it to the viewport, z-50 keeps it on top
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* EXPANDED STATE: The Chat Square */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Chat Support</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              {/* Close Icon (X) */}
              <svg className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
            <p className="text-sm text-gray-600">Hi there! How can I help you today?</p>
          </div>
          
          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      )}

      {/* COLLAPSED STATE: The Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg focus:outline-none transition-transform hover:scale-105"
        >
          {/* Chat Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
}