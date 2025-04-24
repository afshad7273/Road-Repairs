const express = require('express');
const locationRouter = express.Router();
const locationController = require('../controllers/locationController');

locationRouter.get('/workshops/nearby', locationController.findNearbyWorkshopsWithDistance);

module.exports = locationRouter;