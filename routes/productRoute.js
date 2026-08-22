const express = require('express');
const {createProduct, getProducts, getProduct, updateProduct, deleteProduct, updateProductImage, createProductwithEmail} = require('../controllers/productController.js');
const productRouter = express.Router();
//const productController = require('../controllers/productController');

//bring in middleware
const {protect} = require('../middleware/authMiddleware.js');
const {authorizeRoles} = require('../middleware/roleMiddleware.js');
const upload = require('../middleware/cloudinary.js');

productRouter.use(protect);


//productRouter.post('/',  createProduct);
productRouter.get('/',getProducts);
productRouter.get('/:id', getProduct);
productRouter.put('/:id',authorizeRoles('admin','storekeeper'),updateProduct);
productRouter.delete('/:id',authorizeRoles('admin'), deleteProduct);
productRouter.patch('/upload/:id', upload.single('image'), updateProductImage);
productRouter.post('/createproductwithemail',authorizeRoles('admin','storekeeper'), createProductwithEmail);
module.exports =  productRouter;
