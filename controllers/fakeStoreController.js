const {getproducts, getproductbyid,  createproduct } = require("../configs/fakeStoreAdapter.js");

//get all products
const getProducts = async (req, res) => {
    try {
        await getproducts(req, res);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//get product by id
const getProduct = async (req, res) => {
    try {
        await getproductbyid(req, res);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//create product
const createProduct = async (req, res) => {
    try {
        
       await createproduct( req, res);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
};