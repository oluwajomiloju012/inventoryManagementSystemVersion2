
const axios = require('axios');
const http = require('http');
const https = require('https');

const baseurl = 'https://fakestoreapi.com';

const apiclient = axios.create({
    baseURL: baseurl,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
    httpAgent: new http.Agent({ family: 4 }),
    httpsAgent: new https.Agent({ family: 4 })
});


// const apiclient = axios.create({
//     baseURL: baseurl,;
//     //timeout: 5000,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// get all products
const getproducts = async (req, res) =>{
    try {
        const response = await apiclient.get('/products');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//get product by id
const getproductbyid = async (req, res) => {
    try {
        const response = await apiclient.get(`/products/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//create product
const createproduct = async (req, res) => {
    try {
        const response = await apiclient.post('/products', req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getproducts,
    getproductbyid,
    createproduct,
};