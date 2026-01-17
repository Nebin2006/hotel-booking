import React from 'react';

// We use 'destructuring' in the parameters { bookings, cancelBooking } 
// to take the data passed from App.jsx
function BookingList({ bookings, cancelBooking }) {
  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-inner border mt-12 mb-10">
      <h3 className="text-3xl font-black mb-8 text-gray-800">
        My Bookings ({bookings.length})
      </h3>
      
      {/* 1. Conditional Rendering: If the list is empty, show a message */}
      {bookings.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed">
          <p className="text-gray-400 italic">No bookings found. Start exploring!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {/* 2. Mapping: We loop through the bookings array passed as a prop */}
          {bookings.map((booked) => (
            <div 
              key={booked.bookingId} 
              className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border hover:border-blue-200 transition-colors"
            >
              <div className="flex items-center gap-6">
                <img 
                  src={booked.image} 
                  className="w-24 h-24 rounded-2xl object-cover shadow-sm" 
                  alt={booked.name} 
                />
                <div>
                  <h4 className="font-bold text-xl text-gray-800">{booked.name}</h4>
                  <p className="text-sm text-gray-500 font-medium mb-1">📍 {booked.location}</p>
                  <p className="text-blue-600 font-bold">₹{booked.price.toLocaleString()}</p>
                </div>
              </div>
              
              {/* 3. Event Handling: Clicking this calls the function in App.jsx */}
              <button 
                onClick={() => cancelBooking(booked.bookingId)}
                className="bg-red-50 text-red-500 font-bold px-6 py-3 rounded-xl hover:bg-red-100 transition-all active:scale-95"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingList;