const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const geolib = require('geolib');

const locationController = {
    // @desc    Find nearby workshops
    // @route   GET /api/locations/workshops/nearby
    // @access  Public
    findNearbyWorkshopsWithDistance: asyncHandler(async (req, res) => {
        const { latitude, longitude, radius, issueType, userLat, userLon } = req.query;

        if (!latitude || !longitude || !radius || !issueType || !userLat || !userLon) {
            res.status(400);
            throw new Error('Latitude, longitude, radius, issueType, userLat, and userLon are required');
        }
        console.log(latitude, longitude, radius, issueType, userLat, userLon);
        

        const workshops = await User.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)],
                    },
                    distanceField: 'distance',
                    maxDistance: parseFloat(radius) * 1000,
                    spherical: true,
                    query: {
                        role: 'workshop',
                        isVerified:true,
                        servicesOffered: { $regex: issueType, $options: 'i' },
                    },
                },
            },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'workshop',
                    as: 'reviews',
                },
            },
            {
                $project: {
                    _id: 1,
                    businessName: 1,
                    servicesOffered: 1,
                    distance: 1,
                    averageRating: { $avg: '$reviews.rating' },
                    location: 1,
                },
            },
            { $sort: { averageRating: -1 } },
            { $limit: 10 },
        ]);

        console.log(workshops);
        
        
        

        const workshopsWithDistance = workshops.map(workshop => {
            const userLocation = { latitude: parseFloat(userLat), longitude: parseFloat(userLon) };
            console.log(userLocation);
            
            const workshopLocation = { latitude: workshop.location.coordinates[1], longitude: workshop.location.coordinates[0] };
            console.log(workshopLocation);
            const distanceToUser = geolib.getDistance(userLocation, workshopLocation);
            console.log(distanceToUser);
            return { ...workshop, distanceToUser };
        });
        console.log(workshopsWithDistance);
        

        res.json(workshopsWithDistance);
    }),
};

module.exports = locationController;