import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getWorkshopProductsAPI, deleteProductAPI, updateProductCountAPI } from "../services/productServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products() {
  const queryClient = useQueryClient();
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ["product-view"],
    queryFn: getWorkshopProductsAPI,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedCount, setEditedCount] = useState(0);

  const filteredProducts = products?.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteProductMutation = useMutation({
    mutationFn: (productId) => {
      const token = JSON.parse(sessionStorage.getItem('user'))?.token;
      return deleteProductAPI(productId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['product-view']);
      toast.success('Product deleted successfully!');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete product.');
    },
  });

  const updateCountMutation = useMutation({
    mutationFn: updateProductCountAPI,
    mutationKey:['product-count-update'],
    onSuccess: () => {
      queryClient.invalidateQueries(['product-view']);
      toast.success('Product count updated successfully!');
      setEditingProductId(null);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update product count.');
    },
  });

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      deleteProductMutation.mutate(productId);
    }
  };

  const handleEditClick = (productId, currentCount) => {
    setEditingProductId(productId);
    setEditedCount(currentCount);
  };

  const handleUpdateCount = async () => {
    await updateCountMutation.mutateAsync({ productId: editingProductId, productCount: editedCount });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      <ToastContainer />

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white p-5 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">Road Repairs</h1>
          <div className="space-x-6">
            <Link to="/workhome" className="hover:text-gray-300 transition">Home</Link>
            <Link to="/servicework" className="hover:text-gray-300 transition">Service</Link>
            <Link to="/products" className="hover:text-gray-300 transition">Products</Link>
            {/* <Link to="/view products" className="hover:text-gray-300 transition">View Products</Link> */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 py-16">
        <section className="container mx-auto text-center relative">
          <h2 className="text-4xl font-bold text-indigo-800">Our Products</h2>

          {/* Top Right Product Count */}
          <div className="absolute right-0 top-0 mr-4 mt-2 text-indigo-700 font-bold text-lg">
            Total Products: {filteredProducts?.length || 0}
          </div>

          {/* Search Bar */}
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Search by product name..."
              className="px-3 py-2 border border-gray-300 rounded-md w-full max-w-sm text-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {filteredProducts?.map((product) => (
              <div
                key={product._id}
                className="shadow-lg hover:shadow-xl transition-all bg-white rounded-2xl overflow-hidden transform hover:scale-105 duration-300 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-60 object-cover"
                />
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-semibold text-gray-800">{product.productName}</h3>
                  <p className="text-gray-600 mt-2">{product.productType}</p>
                  <p className="text-gray-600 mt-2">Unique ID: {product.uniqueId}</p>
                  <p className="text-gray-600 mt-2">Product Stock: {product.productCount}</p>
                  <p className="text-gray-600 mt-2">Product Cost Per Piece : {product.productPrice}</p>
                </div>
                <div className="flex justify-around items-center gap-4 p-4 border-t">
                  {editingProductId === product._id ? (
                    <div>
                      <input
                        type="number"
                        value={editedCount}
                        onChange={(e) => setEditedCount(Number(e.target.value))}
                        className="p-2 border rounded-md"
                      />
                      <button onClick={handleUpdateCount} className="ml-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition">
                        Update
                      </button>
                    </div>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(product._id, product.productCount)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition">
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white text-center p-5">
        <p>&copy; 2025 AutoAssist. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Products;
