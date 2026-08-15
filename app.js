require('dotenv').config();
const express = require('express');
const {connection} = require('./configs/database');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute.js');

const fakeStoreRouter = require('./routes/fakeStoreRoute.js');

const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());
//app.use(express.urlencoded({ extended : true}))
//DB
connection();

// Routes
app.use('/api/products',productRouter);   
app.use('/api',userRouter); 
app.use('/api/fakestore', fakeStoreRouter);

app.get('/', (req, res) => {
    res.send("Welcome to server 8080");

});



app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});

