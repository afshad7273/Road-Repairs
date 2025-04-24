import React from 'react';

const images = [
  { src: 'images/1.jpg', title: 'Mauris accumsan' },
  { src: 'images/2.jpg', title: 'Vivamus mauris' },
  { src: 'images/3.jpg', title: 'Aliquam fringilla' },
  { src: 'images/4.jpg', title: 'Nam lacinia' },
  { src: 'images/5.jpg', title: 'Integer laoreet' },
  { src: 'images/6.jpg', title: 'Quisque feugiat' },
  { src: 'images/7.jpg', title: 'Aliquam eget' },
  { src: 'images/8.jpg', title: 'Nullam ligula' },
];

function Gallerymain() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Our Gallery</h2>
          <nav className="mt-2 text-gray-600">
            <a href="index.html" className="text-blue-500 hover:underline">Home</a> / <span>Gallery</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-white text-lg font-semibold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallerymain;