import React, { useState } from 'react';
// 1. Importing our modular component
import BookingList from './BookingList';

function App() {
  // --- STATE MANAGEMENT ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  
  // States for Category filter, success popup, and NEW: Sorting
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Default");
  const [showSuccess, setShowSuccess] = useState(false);

  // --- MOCK DATA ---
  const hotels = [
    { id: 1, name: "The Grand Vellore", price: 3500, location: "Near VIT Gate", rating: 4.8, category: "Luxury", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Palace Residency", price: 2200, location: "Katpadi", rating: 4.2, category: "Mid-Range", image: "https://images.unsplash.com/photo-1551882547-ff43c63efe5c?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Royal Stay", price: 4100, location: "Sathuvachari", rating: 4.9, category: "Luxury", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Budget Inn", price: 1200, location: "Old Town", rating: 3.8, category: "Budget", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Vellore Heritage Hotel", price: 2800, location: "Near Fort", rating: 4.5, category: "Boutique", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Green Valley Resort", price: 5500, location: "Yelagiri Hills", rating: 4.7, category: "Resort", image: "https://images.unsplash.com/photo-1571011299402-1d447757362a?auto=format&fit=crop&w=800&q=80" }
  ];

  // --- LOGIC FUNCTIONS ---
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setUser({ name: "Nebin" });
  };

  const addToBookings = (hotel) => {
    const newBooking = { ...hotel, bookingId: Date.now() };
    setBookings([...bookings, newBooking]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000); 
  };

  const cancelBooking = (id) => {
    setBookings(bookings.filter(b => b.bookingId !== id));
  };

  // UPDATED: Double filtering logic + NEW: Sorting Logic
  const filteredHotels = hotels
    .filter((hotel) => {
      const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || hotel.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "PriceLow") return a.price - b.price;
      if (sortBy === "PriceHigh") return b.price - a.price;
      if (sortBy === "Rating") return b.rating - a.rating;
      return 0; // Default
    });

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-900">
      
      {!isLoggedIn ? (
        // LOGIN SECTION
        <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-3xl shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-blue-600 mb-2">SwiftStay</h2>
            <p className="text-gray-400">Welcome back! Please login.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="email" placeholder="Email" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-400" required />
            <input type="password" placeholder="Password" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-400" required />
            <button type="submit" className="w-full bg-blue-600 text-white p-5 rounded-2xl font-bold hover:bg-blue-700 transition-all">Sign In</button>
          </form>
        </div>
      ) : (
        // MAIN DASHBOARD
        <div className="max-w-7xl mx-auto">
          
          <header className="mb-12 flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div>
              <h1 className="text-3xl font-black text-blue-600">SwiftStay</h1>
              <p className="text-gray-500 font-medium">Hello, {user.name}! Find your next stay.</p>
            </div>
            <button onClick={() => setIsLoggedIn(false)} className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold hover:bg-red-100">Logout</button>
          </header>

          {/* Search and Sort Section */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Search by hotel name or location..."
                className="w-full p-5 pl-8 rounded-2xl border shadow-xl focus:ring-4 focus:ring-blue-100 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* NEW: Sorting Dropdown */}
            <select 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto p-5 rounded-2xl border bg-white shadow-xl font-bold text-gray-600 outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer"
            >
              <option value="Default">Sort By: Recommended</option>
              <option value="PriceLow">Price: Low to High</option>
              <option value="PriceHigh">Price: High to Low</option>
              <option value="Rating">Top Rated</option>
            </select>
          </div>

          {/* Category Filters */}
          <div className="flex gap-4 justify-center mb-12 overflow-x-auto pb-2">
            {["All", "Luxury", "Mid-Range", "Budget", "Resort"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "bg-white text-gray-500 hover:bg-gray-100 shadow-sm border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Hotel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-blue-600 uppercase tracking-widest shadow-sm">
                    {hotel.category}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-2xl font-bold text-gray-800">{hotel.name}</h2>
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-xl">
                      <span className="text-yellow-600 font-black text-sm">★ {hotel.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 font-medium flex items-center mb-8">📍 {hotel.location}</p>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Per Night</p>
                      <p className="text-3xl font-black text-blue-600">₹{hotel.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => addToBookings(hotel)}
                      className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredHotels.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[3rem] shadow-inner border-2 border-dashed mt-10">
              <span className="text-6xl block mb-6">🏨</span>
              <p className="text-2xl font-bold text-gray-800">No hotels found</p>
              <p className="text-gray-400 mb-8 mt-2">Try clearing your filters or changing your search.</p>
              <button 
                onClick={() => {setSearchTerm(""); setSelectedCategory("All"); setSortBy("Default");}}
                className="text-blue-600 font-black hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Modular Booking List */}
          <BookingList bookings={bookings} cancelBooking={cancelBooking} />
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-10 py-5 rounded-2xl shadow-2xl font-bold z-50 flex items-center gap-3 animate-bounce border-4 border-white">
          <span>✅</span> Room Booked Successfully!
        </div>
      )}

    </div>
  );
}

export default App;