const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const transporter = require('../utils/emailTransporter');
const randomatic = require('randomatic');
const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});

const userController = {
    // @desc    Register a new user
    // @route   POST /api/users
    // @access  Public
    registerUser: asyncHandler(async (req, res) => {
        const { username: name, email, password, role, phone, address, workshopName: businessName, servicesOffered, hoursOfOperation, daysOff, location } = req.body;
        
        console.log(servicesOffered);
        
        

        if (!name || !email || !password || !role) {
            return res.status(400).send('Enter all fields');
        }
    
        const userExists = await User.findOne({ email });
    
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        if (role === 'workshop' && !location) {
            return res.status(400).json({ message: 'Workshop must have a location' });
        }
    
        let userLocation;
    
        if (role === 'workshop' && location) {
            if (typeof location === 'string') { // Check if location is an address string
                try {
                    const geocodeResponse = await client.geocode({
                        params: {
                            address: location,
                            key: process.env.GOOGLE_MAPS_API_KEY,
                        },
                        timeout: 1000,
                    });
    
                    if (geocodeResponse.data.results && geocodeResponse.data.results.length > 0) {
                        const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
                        console.log(lat,lng);
                        
                        userLocation = {
                            type: 'Point',
                            coordinates: [lng, lat],
                        };
                    } else {
                        console.error('Geocoding failed: No results found.');
                        return res.status(400).json({ message: 'Geocoding failed: No results found.' });
                    }
                } catch (error) {
                    console.error('Geocoding error:', error);
                    return res.status(500).json({ message: 'Geocoding error.' });
                }
            } else if (typeof location === 'object' && location.latitude && location.longitude) { // Check if location is lat/lng object
                userLocation = {
                    type: 'Point',
                    coordinates: [location.longitude, location.latitude], // Convert to [lng, lat]
                };
            } else {
                return res.status(400).json({ message: 'Invalid location format' });
            }
        }
    
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            address,
            businessName,
            servicesOffered,
            hoursOfOperation,
            daysOff,
            location: userLocation,
        });
    
        const transferData = {
            name: user.name,
            email: user.email,
            role: user.role,
            profilePicture: user.profilePicture,
            id: user._id,
        };
    
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(transferData),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }),

    // @desc    Authenticate a user
    // @route   POST /api/users/login
    // @access  Public
    loginUser: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        console.log(user);

        const transferData = {
            name:user.name,
            email:user.email,
            role:user.role,
            profilePicture:user.profilePicture,
            id:user._id
        }
        

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePicture:user.profilePicture,
                token: generateToken(transferData),
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    }),

    // @desc    Get user profile
    // @route   GET /api/users/profile
    // @access  Private
    getUserProfile: asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                businessName: user.businessName,
                servicesOffered: user.servicesOffered,
                hoursOfOperation: user.hoursOfOperation,
                daysOff: user.daysOff,
                location: user.location,
                profilePicture: user.profilePicture,
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }),

    // @desc    Update user profile
    // @route   PUT /api/users/profile
    // @access  Private
    updateUserProfile: asyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);

        if (user) {
            
            if (req.body.email && req.body.email !== user.email) {
              const emailExists = await User.findOne({ email: req.body.email });
              if (emailExists) {
                  res.status(400);
                  throw new Error('Email already taken');
              }
              user.email = req.body.email;
          }
            user.name = req.body.name || user.name;
            user.phone = req.body.phone || user.phone;
            user.address = req.body.address || user.address;
            user.businessName = req.body.businessName || user.businessName;
            user.servicesOffered = req.body.servicesOffered || user.servicesOffered;
            user.hoursOfOperation = req.body.hoursOfOperation || user.hoursOfOperation;
            user.daysOff = req.body.daysOff || user.daysOff;
            
            if (req.file) {
              user.profilePicture = req.file.path; // Use the path from multer-storage-cloudinary
            }
            if (req.body.password) {
              if (!req.body.oldPassword) {
                  res.status(400);
                  throw new Error('Old password is required');
              }

              const passwordMatch = await bcrypt.compare(req.body.oldPassword, user.password);

              if (!passwordMatch) {
                  res.status(401);
                  throw new Error('Incorrect old password');
              }

              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(req.body.password, salt);
          }
            if (req.body.location) {
              try {
                  const geocodeResponse = await client.geocode({
                      params: {
                          address: req.body.location,
                          key: process.env.GOOGLE_MAPS_API_KEY,
                      },
                      timeout: 1000, // milliseconds
                  });

                  if (geocodeResponse.data.results && geocodeResponse.data.results.length > 0) {
                      const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
                      user.location = {
                          type: 'Point',
                          coordinates: [lng, lat], // [longitude, latitude]
                      };
                  } else {
                      console.error('Geocoding failed: No results found.');
                      // Optionally, handle the error (e.g., return a message to the client)
                  }
              } catch (error) {
                  console.error('Geocoding error:', error);
                  // Optionally, handle the error
              }
          }


            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                profilePicture:user.profilePicture,
                token: generateToken(updatedUser._id, updatedUser.role),
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }),
     // @desc    Forgot password - generate and send reset pin
    // @route   POST /api/users/forgotpassword
    // @access  Public
    forgotPassword: asyncHandler(async (req, res) => {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
          res.status(404);
          throw new Error('User not found');
      }

      const resetPin = randomatic('0',6)
      
      user.resetPin = resetPin;
      user.resetPinExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

      console.log(await user.save());
       

      const mailOptions = {
          from: process.env.EMAIL_USERNAME,
          to: user.email,
          subject: 'Password Reset Pin',
          text: `Your password reset pin is: ${resetPin}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error(error);
              res.status(500).json({ message: 'Failed to send email' });
          } else {
              console.log('Email sent: ' + info.response);
              res.json({ message: 'Reset pin sent to your email' });
          }
      });
  }),

  // @desc    Reset password using pin
  // @route   PUT /api/users/resetpassword
  // @access  Public
  resetPassword: asyncHandler(async (req, res) => {
      const { email, pin, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
          res.status(404);
          throw new Error('User not found');
      }

      if (user.resetPin !== pin || user.resetPinExpiry < Date.now()) {
          res.status(400);
          throw new Error('Invalid or expired reset pin');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;
      user.resetPin = undefined; // Clear reset pin
      user.resetPinExpiry = undefined;

      await user.save();

      res.json({ message: 'Password reset successfully' });
  }),

  // @desc    Get customer count by district
  // @route   GET /api/users/customers-by-district
  // @access  Private
  getCustomersByDistrict: asyncHandler(async (req, res) => {
    const customersByDistrict = await User.aggregate([
      { $match: { role: 'customer' } },
      { $group: { _id: '$address', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: customersByDistrict.map((item) => ({
        district: item._id || 'Unknown',
        count: item.count,
      })),
    });
  }),
  
};





module.exports = userController;