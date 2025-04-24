import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllWorkshopsAPI,
  verifyWorkshopAPI,
  suspendWorkshopAPI,
} from "../services/adminServices";
import { getAddressFromCoordinates } from "../services/locationServices";

const Workshoplist = () => {
  const queryClient = useQueryClient();

  // Fetch all workshops
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["workshops"],
    queryFn: getAllWorkshopsAPI,
  });

  // Mutation to verify (accept) workshop
  const verifyWorkshop = useMutation({
    mutationFn: (workshopId) => verifyWorkshopAPI(workshopId),
    mutationKey: ["accept-workshop"],
    onSuccess: () => queryClient.invalidateQueries(["workshops"]),
  });

  // Mutation to suspend (reject) workshop
  const suspendWorkshop = useMutation({
    mutationFn: (workshopId) => suspendWorkshopAPI(workshopId),
    mutationKey: ["suspend-workshop"],
    onSuccess: () => queryClient.invalidateQueries(["workshops"]),
  });

  // Handle status change for accepting/rejecting
  const handleStatusChange = async (id, action) => {
    if (action === "accept") {
      await verifyWorkshop.mutateAsync(id);
    } else {
      await suspendWorkshop.mutateAsync(id);
    }
  };

  const [locationData, setLocationData] = useState({});

  // Fetch addresses from coordinates if available
  useEffect(() => {
    if (data?.length > 0) {
      const fetchAddresses = async () => {
        const addresses = await Promise.all(
          data.map(async (workshop) => {
            if (workshop.location && workshop.location.coordinates) {
              const [lon, lat] = workshop.location.coordinates;
              try {
                const address = await getAddressFromCoordinates(lat, lon);
                return address || "Location not available";
              } catch (error) {
                console.error("Error fetching address:", error);
                return "Location not available";
              }
            } else {
              return workshop.location?.address || "Location not available";
            }
          })
        );

        // Map addresses to workshop IDs
        const addressMap = {};
        data.forEach((workshop, index) => {
          addressMap[workshop._id] = addresses[index];
        });
        setLocationData(addressMap);
      };

      fetchAddresses();
    }
  }, [data]);

  return (
    <div className="flex h-screen w-full bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 text-white p-6 space-y-5 fixed h-screen">
        <h1 className="text-2xl font-bold text-center text-yellow-500">
          <span className="text-red-600">Admin</span> <span>Panel</span>
        </h1>
        <nav className="flex-1">
          <ul className="space-y-4 text-lg">
            <Link to="/admindashboard">
              <li className="p-4 hover:bg-gray-700 rounded cursor-pointer">
                Dashboard
              </li>
            </Link>
            <Link to="/workshopview">
              <li className="p-4 hover:bg-gray-700 rounded cursor-pointer">
                Workshop View
              </li>
            </Link>
            {/* <li className="p-4 hover:bg-red-600 rounded cursor-pointer">
              Logout
            </li> */}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 ml-72 overflow-y-auto">
        <div className="bg-white p-6 shadow-md flex justify-between items-center rounded-lg">
          <h2 className="text-2xl font-bold">Workshop Approvals</h2>
          <div className="text-xl bg-gray-900 text-white px-4 py-2 rounded-lg">
            Total Workshops: {data?.length || 0}
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

        {/* Workshop List */}
        <div className="mt-6 bg-white shadow-xl rounded-xl p-6">
          <div className="grid grid-cols-6 text-lg font-semibold bg-gray-900 text-white py-3 px-6 rounded-t-xl">
            <div>SL No</div>
            <div>Workshop Name</div>
            <div>Location</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          <div className="space-y-4 mt-4">
            {data?.map((workshop, index) => (
              <div
                key={workshop._id}
                className="grid grid-cols-6 items-center p-5 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300"
              >
                <div className="text-lg font-medium">{index + 1}</div>
                <div className="text-lg font-semibold text-gray-700">
                  {workshop.businessName || "Name not available"}
                </div>
                <div className="text-lg text-gray-600">
                  {locationData[workshop._id] || "N/A"}
                </div>
                {/* Smaller Status Bar */}
                <div
                  className={`px-2 py-1 text-sm rounded ${
                    workshop.isVerified
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {workshop.isVerified ? "Accepted" : "Pending"}
                </div>
                <div className="flex gap-2">
                  {!workshop.isVerified ? (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handleStatusChange(workshop._id, "accept")}
                    >
                      Accept
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleStatusChange(workshop._id, "reject")}
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            ))}
            {data?.length === 0 && (
              <p className="text-lg text-center text-gray-500">
                No workshops available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshoplist;
