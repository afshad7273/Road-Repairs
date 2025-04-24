import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllWorkshopsAPI } from "../services/adminServices"; // Adjust path as needed
import { getAddressFromCoordinates } from "../services/locationServices"; // Adjust path as needed

const Workshopview = () => {
  const [locationData, setLocationData] = useState({});

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["workshops"],
    queryFn: getAllWorkshopsAPI,
  });

  useEffect(() => {
    if (data?.length > 0) {
      const fetchAddresses = async () => {
        const addresses = await Promise.all(
          data.map(async (workshop) => {
            if (workshop.location && workshop.location.coordinates) {
              const [lon, lat] = workshop.location.coordinates;
              return await getAddressFromCoordinates(lat, lon);
            } else {
              return "Location not available";
            }
          })
        );
        setLocationData(addresses);
      };

      fetchAddresses();
    }
  }, [data]);

  return (
    <div className="flex h-screen w-full bg-gray-100 text-gray-800">
      <div className="w-72 bg-gray-900 text-white p-6 space-y-5 flex flex-col fixed h-screen">
        <h1 className="text-2xl font-bold text-center text-yellow-500">
          <span className="text-red-600">Admin</span>{" "}
          <span className="text-yellow-500">Panel</span>
        </h1>
        <nav className="flex-1">
          <ul className="space-y-4 text-lg">
            <Link to="/admindashboard">
              <li className="p-4 hover:bg-gray-700 rounded cursor-pointer">
                Dashboard
              </li>
            </Link>
            <Link to="/workshoplist">
              <li className="p-4 hover:bg-gray-700 rounded cursor-pointer">
                Workshop List
              </li>
            </Link>
            {/* <li className="p-4 hover:bg-red-600 rounded cursor-pointer">
              Logout
            </li> */}
          </ul>
        </nav>
      </div>

      <div className="flex-1 flex flex-col p-6 ml-72 overflow-y-auto">
        <div className="bg-white p-6 shadow-md flex justify-between items-center rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800">
            Registered Workshops
          </h2>
          <div className="flex gap-6">
            <span className="text-2xl font-bold bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg">
              Workshops Registered: {data?.length}
            </span>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-gray-500">Loading workshops...</p>
          </div>
        )}
        {isError && (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-red-500">Error: {error?.message}</p>
          </div>
        )}

        <div className="mt-6 bg-white shadow-xl rounded-xl p-6">
          <div className="grid grid-cols-3 text-lg font-semibold bg-gray-900 text-white py-3 px-6 rounded-t-xl">
            <div>SL No</div>
            <div>Workshop Name</div>
            <div>Location</div>
          </div>
          <div className="space-y-4 mt-4">
            {data?.map((workshop, index) => (
              <div
                key={workshop._id}
                className="grid grid-cols-3 items-center p-5 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300"
              >
                <div className="text-lg font-medium">{index + 1}</div>
                <div className="text-lg font-semibold text-gray-700">
                  {workshop.businessName || workshop.name || "Name not available"}
                </div>
                <div className="text-lg text-gray-600">
                  {locationData[index] || "N/A"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshopview;