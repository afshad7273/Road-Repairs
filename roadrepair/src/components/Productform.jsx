import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddProductPage() {
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [productCount, setProductCount] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    // Handle image upload
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
        setImagePreview(URL.createObjectURL(file)); // Show preview
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Product Added Successfully!");
        setProductName("");
        setProductType("");
        setProductImage(null);
        setProductCount("");
        setImagePreview(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white p-5 flex flex-col items-center shadow-lg">
                <h1 className="text-3xl font-extrabold mb-2">Product Management</h1>
                <div className="flex space-x-4">
                    <Link to="/workhome"><button className="text-white px-4 py-2 hover:text-gray-300 transition">Home</button></Link>
                    <Link to="/servicework"><button className="text-white px-4 py-2 hover:text-gray-300 transition">Services</button></Link>
                    <Link to="/products"><button className="text-white px-4 py-2 hover:text-gray-300 transition">Products</button></Link>
                    <Link to="/view products"><button className="text-white px-4 py-2 hover:text-gray-300 transition">View Products</button></Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="text-center py-14 bg-gradient-to-r from-purple-700 to-indigo-600 text-white">
                <h2 className="text-4xl font-extrabold">Add a New Product</h2>
                <p className="mt-2 text-lg">Fill in the details to add a product to the inventory.</p>
            </header>

            {/* Form Section */}
            <div className="flex justify-center py-10">
                <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-gray-200 transition-transform transform hover:-translate-y-2">
                    <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">Product Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Product Name */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none transition"
                                placeholder="Enter product name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Product Type */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Product Type</label>
                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none transition"
                                value={productType}
                                onChange={(e) => setProductType(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a type</option>
                                <option value="Engine Parts">Engine Parts</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Tires">Tires</option>
                                <option value="Batteries">Batteries</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        {/* Product Image Upload */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Upload Product Image</label>
                            <div className="flex flex-col items-center border border-gray-300 p-3 rounded-lg hover:border-indigo-500 transition">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full"
                                    onChange={handleImageChange}
                                    required
                                />
                                {/* Image Preview */}
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="mt-3 w-full h-40 object-cover rounded-lg border border-gray-300" />
                                )}
                            </div>
                        </div>

                        {/* Product Count */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Product Count</label>
                            <input
                                type="number"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none transition"
                                placeholder="Enter product count"
                                value={productCount}
                                onChange={(e) => setProductCount(e.target.value)}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-700 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 transition"
                        >
                            Add Product
                        </button>
                    </form>
                </div>
            </div>

            {/* Call to Action */}
            <section className="text-center py-14 bg-gradient-to-r from-purple-800 to-indigo-700 text-white">
                <h2 className="text-3xl font-extrabold">Manage Your Inventory</h2>
                <p className="mt-3">Easily add, update, and track your products.</p>
                <Link to="/view products">
                    <button className="mt-4 bg-white text-purple-700 px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
                        View Products
                    </button>
                </Link>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white text-center p-5 mt-auto">
                <p>&copy; 2025 AutoAssist. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AddProductPage;
