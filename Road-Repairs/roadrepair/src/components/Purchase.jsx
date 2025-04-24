// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Settings } from 'lucide-react';

// function Purchase() {
    
//     const navigate = useNavigate();
//     const [searchTerm, setSearchTerm] = useState(""); 
//     const [quantities, setQuantities] = useState([1, 1, 1, 1, 1]); 

//     const products = [
//         { id: 1, name: "Roadside Assistance Package", img: "/images/pic2.jpg" },
//         { id: 2, name: "Car Repair Package", img: "/images/audi.jpg" },
//         { id: 3, name: "Maintenance Package", img: "/images/pic6.jpg" },
//         { id: 4, name: "Premium Wash Package", img: "/images/wash.jpg" },
//         { id: 5, name: "Oil Change Package", img: "/images/oil.jpg" }
//     ];

//     const filteredProducts = products.filter((product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const increaseQuantity = (index) => {
//         setQuantities(quantities.map((q, i) => (i === index ? q + 1 : q)));
//     };

//     const decreaseQuantity = (index) => {
//         setQuantities(quantities.map((q, i) => (i === index && q > 1 ? q - 1 : q)));
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             {/* Navbar */}
//             <nav className="bg-indigo-900 text-white p-4 flex justify-between items-center shadow-md">
//                 <div className="flex items-center space-x-3">
//                     <img src="/images/service-2.png" alt="Repair Icon" className="w-8 h-8" /> 
//                     <h1 className="text-xl font-bold">Road Repairs</h1>
//                 </div>

//                 <div className="hidden md:flex space-x-5 text-base">
//                     <button className="hover:text-gray-300" onClick={() => navigate("/")}>Home</button>
//                     <Link to="/workhome"> <button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Home</button></Link>
//           <Link to="/workhome"><button className="text-white px-4 py-2 hover:text-gray-300 transition-all">About</button></Link>
//           <Link to="/workhome"><button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Gallery</button></Link>
//           <Link to="/workhome"> <button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Blog</button></Link>
//           <Link to="/servicework"> <button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Service</button></Link>
//           <Link to="/workhome"><button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Contact</button></Link>
//           <Link to="/workhome"><button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Feedback</button></Link>
//           <Link to="/workhome"> <button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Service History</button></Link>
//           <Link to="/purchase"> <button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Purchase</button></Link>
//                 </div>

//                 <Settings className="w-6 h-6 cursor-pointer hover:text-gray-300" />
//             </nav>

//             {/* Search & Filter Section */}
//             <div className="flex justify-center items-center mt-6 space-x-4">
//                 <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-80 px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button className="bg-blue-700 text-white text-base px-5 py-2 rounded-lg hover:bg-blue-800 transition-all">
//                     Filter
//                 </button>
//             </div>

//             {/* Product List - Two Containers Per Row */}
//             <section className="py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {filteredProducts.length > 0 ? (
//                     filteredProducts.map((product, index) => (
//                         <div 
//                             key={product.id} 
//                             className="shadow-md bg-white rounded-lg p-4 flex items-center justify-between"
//                         >
//                             {/* Image */}
//                             <div className="w-16 h-16 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${product.img})` }}></div>
                            
//                             {/* Product Name */}
//                             <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>

//                             {/* Quantity Controls */}
//                             <div className="flex items-center space-x-3">
//                                 <button 
//                                     className="bg-gray-200 text-black px-3 py-1 rounded-full hover:bg-gray-300"
//                                     onClick={() => decreaseQuantity(index)}
//                                 >-</button>
//                                 <input 
//                                     type="text" 
//                                     className="w-10 text-center border rounded-md py-1 text-sm"
//                                     value={quantities[index]}
//                                     readOnly
//                                 />
//                                 <button 
//                                     className="bg-gray-200 text-black px-3 py-1 rounded-full hover:bg-gray-300"
//                                     onClick={() => increaseQuantity(index)}
//                                 >+</button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-center text-lg text-gray-600 col-span-2">No products found.</p>
//                 )}
//             </section>

//             {/* Purchase & Cancel Buttons */}
//             <div className="flex justify-center space-x-6 mt-8">
//                 <button 
//                     className="bg-blue-700 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-800 transition-all shadow-md"
//                 >
//                     Purchase
//                 </button>
//                 <button 
//                     className="bg-red-500 text-white text-lg px-6 py-3 rounded-lg hover:bg-red-600 transition-all shadow-md"
//                 >
//                     Cancel
//                 </button>
//             </div>

//             {/* Call to Action */}
//             <section className="text-center py-10 bg-gradient-to-r from-purple-800 to-indigo-700 text-white mt-8">
//                 <h2 className="text-2xl font-bold">Looking for the Best Deals?</h2>
//                 <p className="mt-3 text-lg">Get exclusive discounts on car services.</p>
//                 <button className="mt-4 bg-white text-purple-700 px-6 py-3 font-semibold text-lg rounded-lg shadow-lg hover:bg-gray-200 transition-all">
//                     Explore Now
//                 </button>
//             </section>

//             {/* Footer */}
//             <footer className="bg-indigo-900 text-white text-center p-4 mt-8">
//                 <p className="text-sm">&copy; 2025 AutoAssist. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// }

// export default Purchase;
