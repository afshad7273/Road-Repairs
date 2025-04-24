import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { addProductAPI } from '../services/productServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
  uniqueId: Yup.string().required('Product ID is required'),
  productName: Yup.string().required('Product Name is required'),
  productType: Yup.string().required('Product Type is required'),
  productPrice: Yup.number().required('Price is required').positive('Price must be positive'),
  productCount: Yup.number().required('Product Count is required').positive('Count must be positive'),
  image: Yup.mixed().required('Image is required'),
  tags: Yup.array()
    .of(Yup.string().trim().min(1, 'Tag cannot be empty'))
    .min(1, 'At least one tag is required')
    .required('Tags are required'),
});

const ProductForm = () => {
  const [formData, setFormData] = useState({
    uniqueId: '',
    productName: '',
    productType: '',
    productPrice: '',
    productCount: '',
    image: null,
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [touched, setTouched] = useState({});

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: addProductAPI,
    mutationKey: ['addProduct'],
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === 'tags') {
      setTagInput(value);
      const tagsArray = value
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      setFormData((prevData) => ({
        ...prevData,
        tags: tagsArray,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'file' ? files[0] : value,
      }));
    }
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    if (type === 'file' && files[0]) {
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append('uniqueId', formData.uniqueId);
      formDataToSend.append('productName', formData.productName);
      formDataToSend.append('productType', formData.productType);
      formDataToSend.append('productPrice', formData.productPrice);
      formDataToSend.append('productCount', formData.productCount);
      formData.tags.forEach((tag) => {
        formDataToSend.append('tags[]', tag);
      });
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      try {
        await mutateAsync(formDataToSend);
        toast.success('Product added successfully!');
        setFormData({
          uniqueId: '',
          productName: '',
          productType: '',
          productPrice: '',
          productCount: '',
          image: null,
          tags: [],
        });
        setTagInput('');
        setImagePreview(null);
        setTouched({});
      } catch (error) {
        console.error('Error adding product:', error);
        toast.error('Failed to add product.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col">
      <ToastContainer />
      <nav className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white p-5 flex flex-col items-center shadow-lg">
        <h1 className="text-3xl font-extrabold mb-2">Add a New Product</h1>
        <div className="flex space-x-4">
          {['/workhome', '/servicework', '/products', '/viewproducts'].map((path, i) => (
            <Link to={path} key={i}>
              <button className="text-white px-4 py-2 hover:text-gray-300 transition">
                {path.replace('/', '').replace(/^\w/, (c) => c.toUpperCase())}
              </button>
            </Link>
          ))}
        </div>
      </nav>

      <div className="flex justify-center py-10">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-gray-200 transition-transform transform hover:-translate-y-2">
          <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">Product Details</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Product ID</label>
              <input
                type="text"
                name="uniqueId"
                value={formData.uniqueId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter product ID"
              />
              {touched.uniqueId && errors.uniqueId && (
                <div className="text-red-500 text-sm">{errors.uniqueId}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter product name"
              />
              {touched.productName && errors.productName && (
                <div className="text-red-500 text-sm">{errors.productName}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Product Type</label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="" disabled>
                  Select a type
                </option>
                <option value="Engine Parts">Engine Parts</option>
                <option value="Accessories">Accessories</option>
                <option value="Tires">Tires</option>
                <option value="Batteries">Batteries</option>
                <option value="Others">Others</option>
              </select>
              {touched.productType && errors.productType && (
                <div className="text-red-500 text-sm">{errors.productType}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={tagInput}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter tags, e.g., alloy, wheel, tyre"
              />
              {touched.tags && errors.tags && (
                <div className="text-red-500 text-sm">{errors.tags}</div>
              )}
              {formData.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Product Price</label>
              <input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter product price"
              />
              {touched.productPrice && errors.productPrice && (
                <div className="text-red-500 text-sm">{errors.productPrice}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Product Count</label>
              <input
                type="number"
                name="productCount"
                value={formData.productCount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter product count"
              />
              {touched.productCount && errors.productCount && (
                <div className="text-red-500 text-sm">{errors.productCount}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Upload Product Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full"
              />
              {touched.image && errors.image && (
                <div className="text-red-500 text-sm">{errors.image}</div>
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-3 w-full h-40 object-cover rounded-lg border"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-700 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 transition"
            >
              {isLoading ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>

      <section className="text-center py-14 bg-gradient-to-r from-purple-800 to-indigo-700 text-white">
        <h2 className="text-3xl font-extrabold">Manage Your Inventory</h2>
        <p className="mt-3">Easily add, update, and track your products.</p>
        <Link to="/viewproducts">
          <button className="mt-4 bg-white text-purple-700 px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
            View Products
          </button>
        </Link>
      </section>

      <footer className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white text-center p-5 mt-auto">
        <p>© 2025 AutoAssist. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProductForm;