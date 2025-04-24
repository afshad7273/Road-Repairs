const asyncHandler = require('express-async-handler');
const Breakdown = require('../models/breakdownModel');
const User = require('../models/userModel');
const notificationController = require('./notificationController');
const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});
const axios = require('axios')
const breakdownController = {
    // @desc    Create a new breakdown request
    // @route   POST /api/breakdowns
    // @access  Private (Customer only)
    createBreakdown: asyncHandler(async (req, res) => {
        const { description, vehicleType, issueType, latitude, longitude } = req.body;
    
        try {
            const uploadedImages = req.files ? req.files.map((file) => file.path) : [];
    
            // Reverse geocoding using Google Maps API
            let locationName = null;
            try {
                const geocodeResponse = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
                );
    
                if (geocodeResponse.data.status === 'OK' && geocodeResponse.data.results.length > 0) {
                    locationName = geocodeResponse.data.results[0].formatted_address;
                } else {
                    console.error('Reverse geocoding failed:', geocodeResponse.data.status);
                }
            } catch (geocodeError) {
                console.error('Reverse geocoding error:', geocodeError);
            }
            
            const breakdown = await Breakdown.create({
                user: req.user._id,
                description,
                vehicle:vehicleType,
                issueType,
                photos: uploadedImages,
                location: {
                    type: 'Point',
                    coordinates: [parseFloat(longitude), parseFloat(latitude)],
                },
                address: locationName, // Add the location name
            });
    
            if (breakdown) {
                res.status(201).json(breakdown);
            } else {
                res.status(400);
                throw new Error('Invalid breakdown data');
            }
        } catch (error) {
            console.error('Error creating breakdown:', error);
            res.status(500).json({ message: 'Failed to create breakdown', error: error.message });
        }
    }),
    // @desc    Get all breakdowns for the authenticated user
    // @route   GET /api/breakdowns/my
    // @access  Private
    getMyBreakdowns: asyncHandler(async (req, res) => {
        const breakdowns = await Breakdown.find({ user: req.user._id }).populate('assignedWorkshop');
        res.json(breakdowns);
    }),

    // @desc    Get a specific breakdown by ID
    // @route   GET /api/breakdowns/:id
    // @access  Private
    getBreakdownById: asyncHandler(async (req, res) => {


        const breakdown = await Breakdown.findById(req.params.id).populate('user').populate('assignedWorkshop');
        

        if (breakdown) {
            res.json(breakdown);
        } else {
            res.status(404);
            throw new Error('Breakdown not found');
        }
    }),

    // @desc    Assign a breakdown to a workshop
    // @route   PUT /api/breakdowns/:id/assign
    // @access  Private (Workshop or Admin)
    acceptBreakdown : asyncHandler(async (req, res) => {
        const breakdown = await Breakdown.findById(req.params.id);
    
        if (!breakdown) {
            res.status(404);
            throw new Error('Breakdown not found');
        }
    
        if (breakdown.status !== 'pending') {
            res.status(400);
            throw new Error('Breakdown is not pending or has already been accepted/rejected.');
        }
    
        const workshopId = req.user._id; // Assuming req.user is set by your protect middleware
        const workshop = await User.findById(workshopId);
    
        if (!workshop || workshop.role !== 'workshop') {
            res.status(400);
            throw new Error('Invalid workshop user.');
        }
        breakdown.requestedWorkshop = breakdown.requestedWorkshop.filter(
            (workshopId) => workshopId.toString() !== req.user._id.toString()
        );
        breakdown.assignedWorkshop = workshopId;
        breakdown.status = 'accepted';
        await breakdown.save();
    
        // Automatically create a notification for the customer
        await notificationController.createNotification({
            body: {
                userId: breakdown.user,
                message: `Your breakdown has been accepted by ${workshop.businessName || workshop.name}.`,
                relatedObjectId: breakdown._id,
                type: 'breakdown_accepted',
            },
        }, { status: () => ({ json: () => { } }) }); // Mock response object
    
        res.json({ message: 'Breakdown accepted successfully' });
    }),
    rejectBreakdown :asyncHandler(async (req, res) => {
        const breakdown = await Breakdown.findById(req.params.id);
    
        if (!breakdown) {
            res.status(404);
            throw new Error('Breakdown not found');
        }
    
        if (breakdown.status !== 'pending') {
            res.status(400);
            throw new Error('Breakdown is not pending or has already been accepted/rejected.');
        }
        
        breakdown.requestedWorkshop = breakdown.requestedWorkshop.filter(
            (workshopId) => workshopId.toString() !== req.user._id.toString()
        );
        await breakdown.save();
        // Automatically create a notification for the customer
        await notificationController.createNotification({
            body: {
                userId: breakdown.user,
                message: `Your breakdown has been rejected.`,
                relatedObjectId: breakdown._id,
                type: 'breakdown_rejected',
            },
        }, { status: () => ({ json: () => { } }) }); // Mock response object
    
        res.json({ message: 'Breakdown rejected successfully' });
    }),

    cancelBreakdown : asyncHandler(async (req, res) => {
        const breakdown = await Breakdown.findById(req.params.id);
    
        if (!breakdown) {
            res.status(404);
            throw new Error('Breakdown not found');
        }
    
        if (breakdown.status === 'completed' || breakdown.status === 'cancelled') {
            res.status(400);
            throw new Error('Breakdown is already completed or cancelled.');
        }
    
        breakdown.status = 'cancelled';
        await breakdown.save();
    
        // Automatically create a notification for the customer (optional, but good practice)
        await notificationController.createNotification({
            body: {
                userId: breakdown.user,
                message: `Your breakdown has been cancelled.`,
                relatedObjectId: breakdown._id,
                type: 'breakdown_cancelled',
            },
        }, { status: () => ({ json: () => { } }) });
    
        res.json({ message: 'Breakdown cancelled successfully' });
    }),

    // @desc    Update breakdown status
    // @route   PUT /api/breakdowns/:id/status
    // @access  Private (Workshop or Admin)
    updateBreakdownStatus: asyncHandler(async (req, res) => {
        const breakdown = await Breakdown.findById(req.params.id);
        const { status } = req.body;

        if (!breakdown) {
            res.status(404);
            throw new Error('Breakdown not found');
        }

        breakdown.status = status;
        await breakdown.save();

        res.json({ message: 'Breakdown status updated successfully' });
    }),

    // @desc    Delete a breakdown request
    // @route   DELETE /api/breakdowns/:id
    // @access  Private (Customer or Admin)
    deleteBreakdown: asyncHandler(async (req, res) => {
        const breakdown = await Breakdown.findByIdAndDelete(req.params.id);

        if (!breakdown) {
            res.status(404);
            throw new Error('Breakdown not found');
        }
        res.json({ message: 'Breakdown deleted successfully' });
    }),


    getWorkshopComplaints: asyncHandler(async (req, res) => {
        const workshopId = req.user.id;
    
        try {
            // Assigned breakdowns (already accepted by this workshop)
            const assignedBreakdowns = await Breakdown.find({ assignedWorkshop: workshopId })
                .populate('user', 'name email phone profilePicture')
                .populate('assignedWorkshop', 'businessName');
    
            // Requested breakdowns (customer requested this workshop, but not yet accepted)
            const requestedBreakdowns = await Breakdown.find({ requestedWorkshop: workshopId, assignedWorkshop: null })
                .populate('user', 'name email phone profilePicture')
                .populate('vehicle');
    
            res.status(200).json({
                assigned: assignedBreakdowns,
                requested: requestedBreakdowns,
            });
        } catch (error) {
            console.error('Error fetching complaints:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    completeBreakdown: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const {amount} = req.body
        const workshopId = req.user._id;
        console.log(amount);
        

        const breakdown = await Breakdown.findById(id);

        if (!breakdown) {
            res.status(404);
            throw new Error('Breakdown not found');
        }

        if (breakdown.assignedWorkshop.toString() !== workshopId.toString()) {
            res.status(403);
            throw new Error('Breakdown not assigned to this workshop');
        }
        breakdown.amount=amount
        breakdown.status = "completed";
        breakdown.paymentStatus = "pending"
        await breakdown.save();

        res.json({ message: 'Breakdown completed successfully' });
    }),

    createRequest:asyncHandler(async(req,res)=>{
        const {workshopId,breakdownId} = req.body
        
        if(!workshopId ||!breakdownId ){
            res.status(404).send("ID not found")
        }
        try {
            const updatedRequest = await Breakdown.findByIdAndUpdate(breakdownId,
                {$push:{requestedWorkshop:workshopId}},
            {
                runValidators:true,
                new:true
            })
            if(!updatedRequest){
                res.status(400).send("Request not updated")
            }
            res.status(200).send(updatedRequest)
            
        } catch (error) {
            console.log("Resquest Found Error",error);
            res.status(500).send("Internal server error")
            
        }
    }),
};

// Helper function to find nearby workshops and send notifications
async function notifyNearbyWorkshops(breakdown) {
    const workshops = await User.find({ role: 'workshop', isVerified: true });

    for (const workshop of workshops) {
        // Create notification
        await notificationController.createNotification({
            body: {
                userId: workshop._id,
                message: `New breakdown request near you: ${breakdown.description}`,
                relatedObjectId: breakdown._id,
                type: 'breakdown_request',
            },
        }, { status: () => ({ json: () => { } }) });

    }
}

module.exports = breakdownController;