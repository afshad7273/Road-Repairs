import React from 'react'
    const services = [
        {
          title: "Live Support",
          img: "images/service-6.png",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        },
        {
          title: "Repair Services",
          img: "images/service-2.png",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        },
        {
          title: "Complete Care",
          img: "images/service-3.png",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        },
        {
          title: "Spare Parts",
          img: "images/service-4.png",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        },
        {
          title: "Sales Services",
          img: "images/service-5.png",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        },
        {
          title: "Tyre Services",
          img: "images/service-1.png",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        },
      ];
      
      const Servicesmain = () => {
        return (
          <div className="bg-gray-100 py-10">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Services</h2>
              <nav className="flex justify-center mb-6">
                <ol className="flex space-x-2 text-gray-600">
                  <li>
                    <a href="/" className="hover:text-gray-900">Home</a>
                  </li>
                  <li>/</li>
                  <li className="text-gray-900 font-semibold">Services</li>
                </ol>
              </nav>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex bg-white shadow-md rounded-lg overflow-hidden p-4"
                  >
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  )
}

export default Servicesmain