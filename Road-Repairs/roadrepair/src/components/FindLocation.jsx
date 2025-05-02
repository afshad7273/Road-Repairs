import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from '@tanstack/react-query';
import { createBreakdownAPI, findByLocationAPI, breakdownRequestAPI } from "../services/breakdownServices";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateBreakdownId } from "../redux/chatSlice";

const FindLocation = () => {
    const [vehicleModel, setVehicleModel] = useState("");
    const [complaint, setComplaint] = useState("Tire Repair");
    const [description, setDescription] = useState("");
    const [workshopNearBy, setWorkshopNearBy] = useState([]);
    const [filterDistance, setFilterDistance] = useState(2);
    const [location, setLocation] = useState(null);
    const [locationName, setLocationName] = useState("Fetching location...");
    const [popupMessage, setPopupMessage] = useState(null);
    const [breakdownCreated, setBreakdownCreated] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const breakdownId = useSelector((state)=>state.chat.breakdown)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });

                    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`)
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.status === "OK" && data.results.length > 0) {
                                setLocationName(data.results[0].formatted_address);
                            } else {
                                setLocationName("Location not found");
                            }
                        })
                        .catch(() => setLocationName("Error retrieving location"));
                },
                () => setLocationName("Unable to retrieve location")
            );
        }
    }, []);

    const { mutateAsync: createBreakdown, isPending } = useMutation({
        mutationFn: createBreakdownAPI,
        mutationKey: ['create-complaint'],
    });

    const handleComplaintSubmit = async (e) => {
        e.preventDefault();

        if (!location) {
            alert("Fetching your location. Please wait.");
            return;
        }

        const formData = new FormData();
        formData.append("description", description);
        formData.append("vehicleType", vehicleModel);
        formData.append("issueType", complaint);
        formData.append("latitude", location.latitude);
        formData.append("longitude", location.longitude);

        try {
            const createdBreakdown = await createBreakdown(formData);
            setBreakdownCreated(true);
            dispatch(updateBreakdownId(createdBreakdown._id))

        } catch (err) {
            console.error(err);
            alert("Failed to submit complaint. Please try again.");
        }
    };

    const {
        data: workshopNearByData,
        isLoading: loadingNearby,
    } = useQuery({
        queryKey: ['near-by-workshop', location, complaint, filterDistance],
        queryFn: () => findByLocationAPI({
            latitude: location.latitude,
            longitude: location.longitude,
            radius: filterDistance,
            issueType: complaint,
            userLat: location.latitude,
            userLon: location.longitude,
        }),
        enabled: breakdownCreated && !!location,
    });

    useEffect(() => {
        if (workshopNearByData) {
            setWorkshopNearBy(workshopNearByData);
        }
    }, [workshopNearByData]);

    const handleDistanceChange = (e) => {
        const value = e.target.value;
        if (value === "" || isNaN(value)) {
            setFilterDistance("");
            return;
        }
        setFilterDistance(Number(value));
    };

    const request = useMutation({
        mutationFn: breakdownRequestAPI,
        mutationKey: ['request-workshop']
    });

    const handleSelectWorkshop = async (workshop) => {
        if (!breakdownId) {
            alert("Please submit the complaint first.");
            return;
        }
        try {
            await request.mutateAsync({ workshopId: workshop._id, breakdownId });
            setPopupMessage(`Complaint has been sent to ${workshop.businessName}. Please wait for a reply.`);
            setTimeout(() => setPopupMessage(null), 3000);
        } catch (error) {
            console.error("Error sending request:", error);
            alert("Failed to send request. Please try again.");
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-900 to-blue-950 text-white min-h-screen w-full">
            <nav className="bg-gray-950 p-6 text-lg shadow-lg fixed top-0 left-0 right-0 w-full z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-yellow-400">Road Repairs</h1>
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => navigate(`/chat/${breakdownId}`)}
                            className="text-white hover:text-yellow-400 transition"
                        >
                            Chat
                        </button>
                        <button className="relative text-white hover:text-yellow-400 transition">
                            <Bell className="w-6 h-6" />
                            {/* Uncomment below for a notification count */}
                            {/* <span className="absolute -top-1 -right-2 bg-red-600 text-xs rounded-full px-1">3</span> */}
                        </button>
                    </div>
                </div>
            </nav>

            <section className="py-24 px-6 max-w-7xl mx-auto flex gap-12 mt-12">
                <div className="w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-yellow-400 text-center">File a Complaint</h2>
                    <form onSubmit={handleComplaintSubmit} className="mt-4 space-y-4">
                        <input
                            type="text"
                            placeholder="Vehicle Model"
                            value={vehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                            className="w-full p-3 rounded bg-gray-700 text-white"
                            required
                        />
                        <select
                            value={complaint}
                            onChange={(e) => setComplaint(e.target.value)}
                            className="w-full p-3 rounded bg-gray-700 text-white"
                        >
                            <option value="Tire Repair">Tyre</option>
                            <option value="Wheel">Wheel</option>
                            <option value="Alloy">Alloy</option>
                            <option value="AC Repair">AC Repair</option>
                            <option value="Breakdown">Breakdown</option>
                            <option value="Heat Issue">Heat Issue</option>
                        </select>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 rounded bg-gray-700 text-white"
                            required
                        />
                        <div className="text-white">Location: {locationName}</div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg text-lg transition disabled:opacity-50"
                            disabled={isPending}
                        >
                            {isPending ? "Submitting..." : "Submit Complaint"}
                        </button>
                    </form>
                </div>

                <div className="w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-yellow-400 text-center">Recommended Workshops</h2>
                    <div className="mt-4 mb-2">
                        <label className="text-white mr-2">Radius (km):</label>
                        <input
                            type="number"
                            min="1"
                            value={filterDistance}
                            onChange={handleDistanceChange}
                            placeholder="km"
                            className="p-2 w-24 bg-gray-700 text-white rounded"
                        />
                    </div>

                    {loadingNearby ? (
                        <p className="text-center mt-4">Loading nearby workshops...</p>
                    ) : workshopNearBy?.length > 0 ? (
                        <ul className="mt-4 text-lg text-gray-300 space-y-4">
                            {workshopNearBy.map((shop, index) => (
                                <li
                                    key={index}
                                    className="p-4 bg-gray-700 rounded-lg shadow-lg cursor-pointer hover:bg-gray-600 transition flex justify-between items-center"
                                    onClick={() => handleSelectWorkshop(shop)}
                                >
                                    <div>
                                        <span className="font-semibold">{shop.businessName}</span> - {(shop.distanceToUser / 1000).toFixed(1)} km
                                    </div>
                                    <span className="text-yellow-400 font-bold">{shop.averageRating?.toFixed(1) || 0}★</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center mt-4">No workshops found for selected radius.</p>
                    )}
                </div>
            </section>

            {popupMessage && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-4 rounded-lg shadow-lg">
                    {popupMessage}
                </div>
            )}
        </div>
    );
};

export default FindLocation;