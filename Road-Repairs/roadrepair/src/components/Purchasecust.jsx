import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAllProductAPI } from "../services/productServices";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PurchasePage = () => {
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductType, setSelectedProductType] = useState("All");
  const [sort, setSort] = useState("default");
  const productsPerPage = 9;

  const productTypes = [
    "All",
    "Engine Parts",
    "Accessories",
    "Tires",
    "Batteries",
    "Others",
  ];

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  const queryParams = {
    search: search || undefined,
    productType: selectedProductType === "All" ? undefined : selectedProductType,
    page: currentPage,
    limit: productsPerPage,
    sort: sort === "default" ? undefined : sort,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["all-products", queryParams],
    queryFn: () => getAllProductAPI(queryParams),
  });

  const products = data?.products || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const toggleProductSelection = (product) => {
    const alreadySelected = selectedItems.find(
      (item) => item._id === product._id
    );
    if (alreadySelected) {
      setSelectedItems((prev) =>
        prev.filter((item) => item._id !== product._id)
      );
    } else {
      setSelectedItems((prev) => [
        ...prev,
        { ...product, quantity: 1, totalPrice: product.productPrice },
      ]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setSelectedItems((prev) =>
      prev.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.productPrice * newQuantity,
            }
          : item
      )
    );
  };

  const isSelected = (productId) =>
    selectedItems.some((item) => item._id === productId);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-blue-950 text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-950 p-6 shadow-xl w-full">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-yellow-400 tracking-tight drop-shadow-md">
            Purchase Auto Parts
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-12 px-8 flex-grow">
        {/* Filter Bar */}
        <div className="max-w-7xl mx-auto mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by product name (e.g., Alloy Wheel)..."
            className="w-full max-w-2xl p-4 bg-gray-800/30 border border-yellow-400/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Filter Buttons */}
        <div className="max-w-7xl mx-auto mb-10">
          {/* Product Type Filter */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-yellow-400 mb-2">Product Type</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {productTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedProductType(type);
                    setCurrentPage(1);
                  }}
                  className={`py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    selectedProductType === type
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 shadow-md"
                      : "bg-gray-800/50 text-yellow-400 border border-yellow-400/20 hover:bg-gray-700/50 hover:border-yellow-400/50"
                  }`}
                  aria-label={`Filter by ${type}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Filter */}
          <div>
            <h2 className="text-lg font-semibold text-yellow-400 mb-2">Sort By</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSort(option.value);
                    setCurrentPage(1);
                  }}
                  className={`py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    sort === option.value
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 shadow-md"
                      : "bg-gray-800/50 text-yellow-400 border border-yellow-400/20 hover:bg-gray-700/50 hover:border-yellow-400/50"
                  }`}
                  aria-label={`Sort by ${option.label}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Section */}
        <section className="max-w-7xl mx-auto">
          {isLoading ? (
            <p className="text-center text-gray-400 text-lg font-medium animate-pulse">
              Loading products...
            </p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product) => {
                const selectedItem = selectedItems.find(
                  (item) => item._id === product._id
                );
                const displayPrice = selectedItem
                  ? (selectedItem.totalPrice || product.productPrice).toFixed(2)
                  : product.productPrice.toFixed(2);

                return (
                  <div
                    key={product._id}
                    className={`p-6 rounded-xl shadow-lg text-center transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                      isSelected(product._id)
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900"
                        : "bg-gray-900/30 backdrop-blur-md border border-yellow-400/20 hover:bg-gray-800/50"
                    }`}
                    onClick={() => toggleProductSelection(product)}
                  >
                    <img
                      src={product.image || "/images/placeholder.jpg"}
                      alt={product.productName}
                      className="w-full h-56 object-cover rounded-lg shadow-md mx-auto mb-4 transition-transform hover:scale-105"
                    />
                    <h3 className="text-xl font-semibold text-yellow-400">
                      {product.productName}
                    </h3>
                    <p className="mt-2 font-bold text-2xl">{displayPrice}</p>
                    <p className="text-sm mt-1 font-medium">
                      {isSelected(product._id) ? "Selected" : "Click to select"}
                    </p>

                    {/* Quantity Input for Selected Product */}
                    {isSelected(product._id) && (
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <label className="text-sm font-semibold text-yellow-400">
                          Quantity:
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={selectedItem.quantity}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateQuantity(product._id, parseInt(e.target.value) || 1);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-16 p-2 bg-white text-gray-900 rounded-lg border border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-lg font-medium">
              No products found
            </p>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 shadow-md transition transform hover:scale-110 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:from-yellow-600 hover:to-yellow-700"
                }`}
                aria-label="Previous page"
              >
                <FaArrowLeft size={20} />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageClick(index + 1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition ${
                      currentPage === index + 1
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 shadow-md"
                        : "bg-gray-800/50 text-yellow-400 hover:bg-gray-700/50"
                    }`}
                    aria-label={`Page ${index + 1}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 shadow-md transition transform hover:scale-110 ${
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:from-yellow-600 hover:to-yellow-700"
                }`}
                aria-label="Next page"
              >
                <FaArrowRight size={20} />
              </button>
            </div>
          )}

          {/* Place Order Button */}
          {selectedItems.length > 0 && (
            <div className="flex justify-center py-10">
              <Link to="/paynow" state={{ selectedItems }}>
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 text-lg font-bold rounded-xl shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition transform hover:scale-105 hover:shadow-xl">
                  Place Order
                </button>
              </Link>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 py-10 text-yellow-400 w-full text-center shadow-inner">
        <p className="text-lg font-medium">© 2025 Road Repairs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PurchasePage;