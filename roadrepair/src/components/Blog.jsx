import React from "react";

const Blog = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="bg-blue-500 py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            <a href="/" className="flex items-center space-x-2">
              <img src="/car.png" alt="Logo" className="w-10 h-10" />
              <span>AUTO <span className="text-yellow-300">CARS</span></span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-white">(880)123 2500</p>
            <div className="relative">
              <input
                type="text"
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navbar Section */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <ul className="flex space-x-6">
            <li><a href="/" className="text-gray-800 hover:text-blue-500">Home</a></li>
            <li><a href="/about" className="text-gray-800 hover:text-blue-500">About</a></li>
            <li><a href="/services" className="text-gray-800 hover:text-blue-500">Services</a></li>
            <li><a href="/blog" className="text-gray-800 hover:text-blue-500">Blog</a></li>
            <li><a href="/gallery" className="text-gray-800 hover:text-blue-500">Gallery</a></li>
            <li><a href="/contact" className="text-gray-800 hover:text-blue-500">Contact Us</a></li>
          </ul>
        </div>
      </nav>

      {/* Breadcrumb Section */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-6">
          <ol className="list-decimal pl-6 text-gray-700">
            <li><a href="/" className="text-blue-500 hover:underline">Home</a></li>
            <li className="inline-block ml-2">/</li>
            <li className="inline-block ml-2">Typography</li>
          </ol>
        </div>
      </div>

      {/* Typography Section */}
      <div className="container mx-auto px-6 mt-6">
        <h3 className="text-2xl font-bold mb-4">Typography</h3>

        {/* Headings */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Headings</h3>
          <table className="table-auto w-full mt-4">
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <tr key={i}>
                  <td className="border p-2">
                    <h1 className={`text-${i === 1 ? "4xl" : i === 2 ? "3xl" : i === 3 ? "2xl" : "xl"} font-semibold`}>
                      h{i}. Bootstrap heading
                    </h1>
                  </td>
                  <td className="border p-2">Semibold {i === 1 ? "36px" : i === 2 ? "30px" : i === 3 ? "24px" : "18px"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Buttons</h3>
          <div className="space-x-4 mt-4">
            <button className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Default</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Primary</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Success</button>
            <button className="px-4 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-400">Info</button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Warning</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Danger</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
