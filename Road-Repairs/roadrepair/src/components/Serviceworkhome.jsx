import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMyComplaintsAPI,
  acceptBreakdownAPI,
  rejectBreakdownAPI,
  updateBreakdownStatusAPI,
} from '../services/breakdownServices';
import {
  FaTimes,
  FaCheck,
  FaTimesCircle,
  FaComments,
} from 'react-icons/fa';
import { MdOutlineReportProblem } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

function Serviceworkhome() {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentWorkshop = useSelector((state) => state.auth.token);
  const currentWorkshopId = jwtDecode(currentWorkshop).id;

  const { data, isLoading } = useQuery({
    queryKey: ['my-workshop-complaints'],
    queryFn: getMyComplaintsAPI,
  });

  const assignedComplaints = data?.assigned || [];
  const requestedComplaints = data?.requested || [];

  const acceptMutation = useMutation({
    mutationFn: acceptBreakdownAPI,
    onSuccess: () => queryClient.invalidateQueries(['my-workshop-complaints']),
  });

  const rejectMutation = useMutation({
    mutationFn: rejectBreakdownAPI,
    onSuccess: () => queryClient.invalidateQueries(['my-workshop-complaints']),
  });

  const escalateMutation = useMutation({
    mutationFn: updateBreakdownStatusAPI,
    onSuccess: () => queryClient.invalidateQueries(['my-workshop-complaints']),
  });

  const handleAccept = async (complaint) => {
    if (complaint.status !== 'pending') {
      alert('This request is not pending or has already been accepted/rejected.');
      return;
    }
    try {
      await acceptMutation.mutateAsync(complaint._id);
      setSelectedComplaint(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleReject = async (complaint) => {
    await rejectMutation.mutateAsync(complaint._id);
    setSelectedComplaint(null);
  };

  const handleChat = (complaintId) => {
    navigate(`/chat/${complaintId}`);
  };

  const handleEscalate = async (complaint) => {
    try {
      await escalateMutation.mutateAsync({ id: complaint._id, amount: paymentAmount });
      setSelectedComplaint(null);
      setShowPayment(false);
      setPaymentAmount('');
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredComplaints = requestedComplaints?.filter(
    (complaint) =>
      complaint.assignedWorkshop?.toString() === currentWorkshopId ||
      complaint.requestedWorkshop?.includes(currentWorkshopId)
  );

  const pendingComplaints = filteredComplaints
    ?.filter((c) => c.status === 'pending')
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const sortedAssignedComplaints = assignedComplaints
    ?.slice()
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
      <header className="text-center py-12 bg-gradient-to-r from-indigo-700 to-purple-600 text-white shadow-lg">
        <h1 className="text-5xl font-extrabold flex items-center justify-center gap-3">
          <MdOutlineReportProblem className="text-yellow-400" />
          Customer Complaints
        </h1>
        <p className="mt-3 text-lg opacity-90">View and address vehicle complaints effectively.</p>
      </header>

      <nav className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white p-4 flex justify-center shadow-lg">
        <div className="flex space-x-6">
          <Link to="/workhome"><button className="text-white hover:text-gray-300">Home</button></Link>
          <Link to="/products"><button className="text-white hover:text-gray-300">Products</button></Link>
          <Link to="/workshopreview"><button className="text-white hover:text-gray-300">Review</button></Link>
          <Link to="/viewproducts"><button className="text-white hover:text-gray-300">View Products</button></Link>
          <Link to="/customercart"><button className="text-white hover:text-gray-300">View Booking</button></Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center py-12 gap-12">
        <section className="max-w-5xl w-full px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">📥 Latest Complaint Requests</h2>
          {isLoading ? (
            <p className="text-center text-gray-600">Loading complaints...</p>
          ) : pendingComplaints?.length === 0 ? (
            <p className="text-center text-gray-500">No new complaint requests.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {pendingComplaints.map((complaint) => (
                <div
                  key={complaint._id}
                  className="bg-white shadow-lg rounded-lg p-6 border-l-8 border-yellow-500 hover:shadow-xl transition-all cursor-pointer"
                >
                  <h3 className="text-xl font-bold text-yellow-600">{complaint.name}</h3>
                  <p className="text-gray-600">{complaint.address}</p>
                  <p className="text-gray-500 mt-2"><strong>Vehicle:</strong> {complaint.vehicle}</p>
                  <p className="text-gray-500"><strong>Description:</strong> {complaint.description}</p>
                  <div className="mt-4">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                      onClick={() => setSelectedComplaint(complaint)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="max-w-5xl w-full px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">✅ Accepted Requests</h2>
          {isLoading ? (
            <p className="text-center text-gray-600">Loading complaints...</p>
          ) : sortedAssignedComplaints?.length === 0 ? (
            <p className="text-center text-gray-500">No accepted complaints yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {sortedAssignedComplaints.map((complaint) => (
                <div
                  key={complaint._id}
                  className="bg-white shadow-lg rounded-lg p-6 border-l-8 border-green-600 hover:shadow-xl transition-all cursor-pointer"
                >
                  <h3 className="text-xl font-bold text-green-700">{complaint.name}</h3>
                  <p className="text-gray-600">{complaint.address}</p>
                  <p className="text-gray-500 mt-2"><strong>Vehicle:</strong> {complaint.vehicle}</p>
                  <p className="text-gray-500"><strong>Description:</strong> {complaint.description}</p>
                  <div className="mt-4 flex space-x-3">
                    <button
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                      onClick={() => {
                        setSelectedComplaint(complaint);
                        setShowPayment(false);
                        setPaymentAmount('');
                      }}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600 transition"
                      onClick={() => handleChat(complaint._id)}
                    >
                      <FaComments /> Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Complaint Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-[700px] relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
              onClick={() => setSelectedComplaint(null)}
            >
              <FaTimes size={24} />
            </button>
            <h3 className="text-3xl font-bold mb-6 text-center text-indigo-700">Complaint Details</h3>
            <div className="text-lg space-y-4">
              <p><strong>Name:</strong> {selectedComplaint.user.name}</p>
              <p><strong>Location:</strong> {selectedComplaint.address}</p>
              <p><strong>Phone:</strong> {selectedComplaint.user.phone}</p>
              <p><strong>Vehicle:</strong> {selectedComplaint.vehicle}</p>
              <p><strong>Description:</strong> {selectedComplaint.description}</p>
              <p><strong>Issue:</strong> {selectedComplaint.issueType}</p>
              {/* Add the date field here */}
              <p><strong>Date Submitted:</strong> {new Date(selectedComplaint.createdAt).toLocaleDateString()}</p>
              {selectedComplaint.breakdownPictures?.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {selectedComplaint.breakdownPictures.map((img, idx) => (
                    <img key={idx} src={img} alt="Breakdown" className="w-full h-28 object-cover rounded-md" />
                  ))}
                </div>
              )}
              {selectedComplaint.latitude && selectedComplaint.longitude && (
                <iframe
                  src={`http://maps.google.com/maps?q=${selectedComplaint.latitude},${selectedComplaint.longitude}&z=15&output=embed`}
                  className="w-full h-60 mt-4 rounded-lg"
                  loading="lazy"
                ></iframe>
              )}
            </div>

            <div className="flex flex-col gap-4 mt-8">
              {!selectedComplaint.assignedWorkshop ? (
                <div className="flex justify-between items-center">
                  <button
                    className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-600 transition"
                    onClick={() => handleAccept(selectedComplaint)}
                  >
                    <FaCheck /> Accept
                  </button>
                  <button
                    className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-red-600 transition"
                    onClick={() => handleReject(selectedComplaint)}
                  >
                    <FaTimesCircle /> Reject
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <button
                      className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-700 transition"
                      onClick={() => handleChat(selectedComplaint._id)}
                    >
                      <FaComments /> Open Chat
                    </button>
                    {selectedComplaint.paymentStatus === 'paid' ? (
                      <button
                        className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg text-lg cursor-not-allowed"
                        disabled
                      >
                        💰 Payment Successful
                      </button>
                    ) : (
                      <button
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-700 transition"
                        onClick={() => setShowPayment(!showPayment)}
                      >
                        💰 Complete Payment
                      </button>
                    )}
                  </div>

                  {showPayment && selectedComplaint.paymentStatus !== 'paid' && (
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50 space-y-4">
                      <div className="flex flex-col">
                        <label className="font-medium text-gray-700 mb-1">Amount</label>
                        <input
                          type="number"
                          className="border rounded px-3 py-2 w-full"
                          placeholder="Enter amount"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                        />
                      </div>
                      <button
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                        onClick={() => handleEscalate(selectedComplaint)}
                      >
                        🚨 Escalate
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Serviceworkhome;
