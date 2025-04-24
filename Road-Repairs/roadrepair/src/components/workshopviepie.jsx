import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllWorkshopsAPI } from "../services/adminServices";
import { getAddressFromCoordinates } from "../services/locationServices";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#FF5733",
  "#C70039",
  "#900C3F",
  "#00FF7F",
];

const Workshopviewpie = () => {
  const [districtStats, setDistrictStats] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["workshops"],
    queryFn: getAllWorkshopsAPI,
  });

  useEffect(() => {
    if (data?.length > 0) {
      const fetchDistrictStats = async () => {
        const addresses = await Promise.all(
          data.map(async (workshop) => {
            if (workshop.location?.coordinates) {
              const [lon, lat] = workshop.location.coordinates;
              const address = await getAddressFromCoordinates(lat, lon);
              return address || "Unknown Location";
            }
            return "Unknown Location";
          })
        );

        const districtCounts = {};
        addresses.forEach((addr) => {
          const district = extractDistrict(addr);
          if (district) {
            districtCounts[district] = (districtCounts[district] || 0) + 1;
          }
        });

        const chartData = Object.entries(districtCounts).map(([name, value]) => ({
          name,
          value,
        }));

        setDistrictStats(chartData);
      };

      fetchDistrictStats();
    }
  }, [data]);

  const extractDistrict = (address) => {
    if (!address) return null;
    const parts = address.split(",");
    const trimmedParts = parts.map((p) => p.trim());
    return trimmedParts.length >= 2 ? trimmedParts[1] : trimmedParts[0];
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 text-white p-6 space-y-5 flex flex-col fixed h-screen">
        <h1 className="text-3xl font-bold text-center text-yellow-500">
          <span className="text-red-600">Admin</span> Panel
        </h1>
        <nav className="flex-1">
          <ul className="space-y-4 text-xl">
            <Link to="/admindashboard">
              <li className="p-4 hover:bg-gray-700 rounded cursor-pointer transition-colors duration-200">
                Dashboard
              </li>
            </Link>
            <Link to="/workshoplist">
              <li className="p-4 hover:bg-gray-700 rounded cursor-pointer transition-colors duration-200">
                Workshop List
              </li>
            </Link>
            <Link to="/workshopview">
              <li className="p-4 hover:bg-gray-700 rounded cursor-pointer transition-colors duration-200">
                Workshop View
              </li>
            </Link>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 ml-72">
        <div className="bg-white p-8 shadow-lg flex justify-between items-center rounded-xl mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Workshop District Analytics</h2>
          <div className="flex gap-6">
            <span className="text-2xl font-bold bg-gray-900 text-white px-8 py-4 rounded-xl shadow-md">
              Total Workshops: {data?.length || 0}
            </span>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-96">
            <p className="text-2xl text-gray-500 animate-pulse">Loading analytics...</p>
          </div>
        )}

        {isError && (
          <div className="flex justify-center items-center h-96">
            <p className="text-2xl text-red-500">Error: {error?.message}</p>
          </div>
        )}

        <div className="p-8 bg-white shadow-2xl rounded-2xl">
          <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Workshop Distribution by District
          </h3>
          {districtStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={districtStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={180}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(1)}%)`
                  }
                  labelLine={true}
                >
                  {districtStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} workshops`, name]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "16px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={50}
                  iconSize={16}
                  wrapperStyle={{ fontSize: "16px", paddingTop: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-xl text-center text-gray-500 py-20">
              No district data available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workshopviewpie;