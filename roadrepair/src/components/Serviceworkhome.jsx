import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Serviceworkhome() {
    const navigate = useNavigate(); // Hook for navigation

    // Function to navigate on click
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white p-4 flex justify-center shadow-lg">
                <div className="flex space-x-6">
                    <Link to="/workhome"><button className="text-white hover:text-gray-300">Home</button></Link>
                    {/* <Link to="/workhome"><button className="text-white hover:text-gray-300">About</button></Link> */}
                    {/* <Link to="/workhome"><button className="text-white hover:text-gray-300">Gallery</button></Link> */}
                    {/* <Link to="/workhome"><button className="text-white hover:text-gray-300">Blog</button></Link> */}
                    <Link to="/workhome"><button className="text-white hover:text-gray-300">Service</button></Link>
                    <Link to="/workhome"><button className="text-white hover:text-gray-300">Feedback</button></Link>
                    <Link to="/products"><button className="text-white hover:text-gray-300"> Products</button></Link>
                    <Link to="/view products"><button className="text-white hover:text-gray-300">view Products</button></Link>
                </div>
            </nav>

            {/* Page Heading */}
            <header className="text-center py-10 bg-gradient-to-r from-indigo-700 to-purple-600 text-white">
                <h1 className="text-4xl font-extrabold">Our Services</h1>
                <p className="mt-2 text-lg">Explore the best services for your vehicle needs.</p>
            </header>

            {/* Service List with Controlled Width */}
            <div className="flex-1 flex justify-center">
                <section className="py-12 px-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* First Service */}
                    <div 
                        className="shadow-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 p-8 text-center bg-white rounded-lg cursor-pointer"
                        onClick={() => handleNavigation('/roadside-assistance')}
                    >
                        <div className="w-full h-64 bg-cover bg-center rounded-lg mb-4" style={{ backgroundImage: "url('/images/pic2.jpg')" }}></div>
                        <h3 className="text-2xl font-bold text-gray-800">Roadside Assistance</h3>
                        <p className="mt-2 text-gray-600">Get help anywhere, anytime.</p>
                    </div>

                    {/* Second Service */}
                    <div 
                        className="shadow-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 p-8 text-center bg-white rounded-lg cursor-pointer"
                        onClick={() => handleNavigation('/car-repair')}
                    >
                        <div className="w-full h-64 bg-cover bg-center rounded-lg mb-4" style={{ backgroundImage: "url('/images/audi.jpg')" }}></div>
                        <h3 className="text-2xl font-bold text-gray-800">Car Repair</h3>
                        <p className="mt-2 text-gray-600">Quality repairs from trusted professionals.</p>
                    </div>

                    {/* Third Service */}
                    <div 
                        className="shadow-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 p-8 text-center bg-white rounded-lg cursor-pointer"
                        onClick={() => handleNavigation('/maintenance-services')}
                    >
                        <div className="w-full h-64 bg-cover bg-center rounded-lg mb-4" style={{ backgroundImage: "url('/images/pic6.jpg')" }}></div>
                        <h3 className="text-2xl font-bold text-gray-800">Maintenance Services</h3>
                        <p className="mt-2 text-gray-600">Keep your car in top condition.</p>
                    </div>
                </section>
            </div>

            {/* Call to Action */}
            <section className="text-center py-12 bg-gradient-to-r from-purple-800 to-indigo-700 text-white">
                <h2 className="text-3xl font-extrabold">Need Our Services?</h2>
                <p className="mt-2 text-lg">Contact us now for immediate assistance.</p>
                <button className="mt-4 bg-white text-purple-700 px-6 py-3 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-all">Get Assistance</button>
            </section>

            {/* Footer at Bottom */}
            <footer className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white text-center p-5">
                <p className="text-lg">&copy; 2025 AutoAssist. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Serviceworkhome;
