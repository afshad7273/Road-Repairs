const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const productController = {
    addProduct: asyncHandler(async (req, res) => {
        console.log(req.body);
        
        const { productName, productType, productCount, uniqueId, productPrice,tags } = req.body;

        if(!productName || !productType || !productCount || !uniqueId || !productPrice){
            res.status(404).send("Enter required fields")
        }
        console.log(req.file);
        
        
        if(!req.file.path){
            res.status(404).send("Image needed")
        }
        const product = await Product.create({
            workshop: req.user._id,
            productName,
            productType,
            image:req.file.path,
            productCount,
            uniqueId,
            productPrice,
            tags
        });

        res.status(201).json(product);
    }),

    getWorkshopProducts: asyncHandler(async (req, res) => {
        const products = await Product.find({ workshop: req.user._id });
        res.json(products);
    }),

    updateProduct: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { productName, productType, image  } = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            { productName, productType, image  },
            { new: true }
        );

        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        res.json(product);
    }),

    updateProductCount: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { productCount } = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            { productCount },
            { new: true }
        );

        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        res.json(product);
    }),

    deleteProduct: asyncHandler(async (req, res) => {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        res.json({ message: 'Product deleted successfully' });
    }),

     getAllProducts : asyncHandler(async (req, res) => {
        const { search, productType, page = 1, limit = 9, sort } = req.query;
      
        // Build query object
        const query = {};
      
        // Search productName only
        if (search) {
          query.productName = { $regex: search, $options: 'i' };
        }
      
        // Filter by productType
        if (productType && productType !== 'All') {
          query.productType = productType;
        }
      
        // Sorting
        const sortOptions = {};
        if (sort === 'price-asc') {
          sortOptions.productPrice = 1;
        } else if (sort === 'price-desc') {
          sortOptions.productPrice = -1;
        }
      
        // Pagination
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 9;
        const skip = (pageNumber - 1) * pageSize;
      
        try {
          // Get total count
          const totalProducts = await Product.countDocuments(query);
      
          // Fetch paginated and sorted products
          const products = await Product.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize)
            .lean();
      
          // Response
          res.status(200).json({
            products,
            pagination: {
              currentPage: pageNumber,
              totalPages: Math.ceil(totalProducts / pageSize),
              totalProducts,
              pageSize,
            },
          });
        } catch (error) {
          console.error('Error fetching products:', error);
          res.status(500).json({ message: 'Server error' });
        }
      }),
      
    

    purchaseProduct: asyncHandler(async (req, res) => {
        const { productId, quantity, token, amount } = req.body; // Include token and amount

        const product = await Product.findById(productId);

        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        if (product.productCount < quantity) {
            res.status(400);
            throw new Error('Insufficient product count');
        }

        try {
            const charge = await stripe.charges.create({
                amount: amount * 100, // Amount in cents
                currency: 'usd', // Change as needed
                source: token,
                description: `Purchase of ${quantity} ${product.productName}`,
            });

            product.productCount -= quantity;
            await product.save();

            const order = await Order.create({
                user: req.user._id,
                product: productId,
                quantity,
                amount,
                chargeId: charge.id,
            });

            res.json({ message: 'Payment successful', order });
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }),
    
    getCustomerOrders: asyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id }).populate('product');
        res.json(orders);
    }),
};

module.exports = productController;