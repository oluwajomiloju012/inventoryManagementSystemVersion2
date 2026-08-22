 const Product = require("../models/productModel.js");
 const cloudinary = require('../middleware/cloudinary.js');

 const User = require("../models/userModel.js");
const sendEmail = require("../middleware/emailsender.js");

const createProductwithEmail = async (req, res) => {
  try {
    const { product, price, quantity } = req.body;

    const productemail = new Product({ product, price, quantity });
    await productemail.save();

    // 🔥 Get all admins
    const admins = await User.find({ role: "admin" });
    const adminEmails = admins.map(a => a.email);

    // 📧 Send email — isolated so a failure here doesn't affect the response
    if (adminEmails.length > 0) {
      const subject = "New Product Created";
      const message = `
        <h3>New Product Alert </h3>
        <p>A new product has been created:</p>
        <ul>
          <li><strong>Name:</strong> ${productemail.product}</li>
          <li><strong>Price:</strong> ${productemail.price}</li>
          <li><strong>Quantity:</strong> ${productemail.quantity}</li>
        </ul>
      `;

      try {
        await sendEmail(adminEmails, subject, message);
      } catch (emailError) {
        console.error("Failed to send admin notification email:", emailError.message);
        // don't throw — product was already saved successfully
      }
    }

    return res.status(201).json({
      message: "Product created successfully",
      productemail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


 // update product image
 const updateProductImage = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.imageurl) {
      const publicId = product.imageurl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }
     //save new image
    product.imageurl = req.file.path;

    await product.save();

    res.status(200).json({
      message: "Image updated successfully",
      product,
      
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create
 const createProduct = async (req, res) => {

    try {
       const product = await Product.create(req.body);
     res.status(201).json(product);
    } catch (error) {
      res.status(500).json({message: "error creating product", error: error.message});
    }
    


    };

 // get all
 const getProducts = async (req, res) => {
  const products = await Product.find();
   

  res.json(products);
};

// Get one
 const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product){
    return res.status(404).json({message: 'product not found'});
  }

  res.json(product);
};

// update
 const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
     res.json(product);
};

// Delete
 const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'product deleted'});
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  updateProductImage,
  createProductwithEmail
}