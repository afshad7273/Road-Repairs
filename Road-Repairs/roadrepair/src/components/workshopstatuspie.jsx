import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllWorkshopsAPI } from "../services/adminServices";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const COLORS = ["#4CAF50", "#F44336"]; // Green for Accepted, Red for Not Accepted

const WorkshopStatuspie = () => {
  const [statusStats, setStatusStats] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    accepted: 0,
    notAccepted: 0,
  });

  // Fetch all workshops
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["workshops"],
    queryFn: getAllWorkshopsAPI,
  });

  // Aggregate status data for the pie chart
  useEffect(() => {
    if (data?.length > 0) {
      const counts = data.reduce(
        (acc, workshop) => {
          if (workshop.isVerified) {
            acc.accepted += 1;
          } else {
            acc.notAccepted += 1;
          }
          return acc;
        },
        { accepted: 0, notAccepted: 0 }
      );

      setStatusCounts(counts);

      const chartData = [
        { name: "Accepted", value: counts.accepted },
        { name: "Not Accepted", value: counts.notAccepted },
      ].filter((entry) => entry.value > 0); // Remove zero-value entries

      setStatusStats(chartData);
    }
  }, [data]);

  // Generate and download PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // Title
    doc.setFontSize(18);
    doc.text("Workshop Status Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${date}`, 14, 30);

    // Summary
    doc.setFontSize(14);
    doc.text("Summary", 14, 45);
    doc.setFontSize(12);
    doc.text(`Total Workshops: ${data?.length || 0}`, 14, 55);
    doc.text(`Accepted: ${statusCounts.accepted}`, 14, 65);
    doc.text(`Not Accepted: ${statusCounts.notAccepted}`, 14, 75);

    // Table of status data
    doc.autoTable({
      startY: 85,
      head: [["Status", "Count", "Percentage"]],
      body: statusStats.map((entry) => [
        entry.name,
        entry.value,
        `${((entry.value / (data?.length || 1)) * 100).toFixed(1)}%`,
      ]),
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [51, 51, 51], textColor: [255, 255, 255] },
    });

    doc.save(`Workshop_Status_Report_${date}.pdf`);
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 text-white p-6 space-y-5 fixed h-screen">
        <h1 className="text-2xl font-bold text-center text-yellow-500">
          <span className="text-red-600">Admin</span> Panel
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
            <Link to="/workshopview">
              <li className="p-4 hover:bg-gray-700 rounded cursor-pointer">
                Workshop View
              </li>
            </Link>
            <Link to="/workshopviewpie">
              <li className="p-4 hover:bg-gray-700 rounded cursor-pointer">
                District Analytics
              </li>
            </Link>
            <Link to="/workshopstatuspie">
              <li className="p-4 hover:bg-gray-700 rounded cursor-pointer">
                Status Analytics
              </li>
            </Link>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 ml-72 overflow-y-auto">
        {/* Summary Section */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-6">
          <h2 className="text-2xl font-bold text-center">Workshop Status Report</h2>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">Total Workshops</p>
              <p className="text-xl font-bold text-gray-900">{data?.length || 0}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">Accepted</p>
              <p className="text-xl font-bold text-green-600">{statusCounts.accepted}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">Not Accepted</p>
              <p className="text-xl font-bold text-red-600">{statusCounts.notAccepted}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            {/* <button
              onClick={generatePDF}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Download PDF
            </button> */}
          </div>
        </div>

        {/* Pie Chart */}
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-gray-500">Loading report...</p>
          </div>
        )}
        {isError && (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-red-500">Error: {error?.message}</p>
          </div>
        )}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6 text-center text-gray-800">
            Workshop Verification Status
          </h3>
          {statusStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={statusStats}
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
                  {statusStats.map((entry, index) => (
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
                  height={36}
                  iconSize={16}
                  wrapperStyle={{ fontSize: "16px", paddingTop: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-lg text-center text-gray-500 py-10">
              No status data available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopStatuspie;