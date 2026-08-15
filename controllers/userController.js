// userController.js

const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const sendEmail = require('../utils/sendEmail.js'); // uncomment once you have this utility set up

// create
const createUser = async (req, res) => {
  try {
    const { name, password, email, role, phone } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({ message: "required fields missing" });
    }

    // check existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user with email already exists" });
    }

    // check existing phone
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "user with phoneNumber already exists" });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      password: passwordHash,
      email,
      role,
      phone
    });

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "error creating user", error: error.message });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Email alert - disabled until sendEmail utility is imported
    // const subject = "New Login Alert";
    // const message = `
    //   <h3>Hey ${user.name} 🚀</h3>
    //   <p>We just noticed a login into your account:</p>
    //   <ul>
    //     <li><strong>Location:</strong> Ikeja Lagos</li>
    //     <li><strong>Device:</strong> Chrome 8.5</li>
    //   </ul>
    //   <p>Thank you for banking with us</p>
    // `;
    // await sendEmail(user.email, subject, message);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  login
};