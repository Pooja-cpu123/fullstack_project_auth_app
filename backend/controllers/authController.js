const {generateToken} = require("../utils/jwt");
const bcrypt = require("bcrypt");
const authRepository = require("../repository/authRepository");


//REGISTER API
exports.registerUser = async(req, res) =>{
    try{
        const { name, email, password, phone } = req.body;

        //Validate input
        if(!name||!email||!password||!phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        //Check if user already exists
        const existingUser = await authRepository.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        //hashing password
        const hashedPassword = await bcrypt.hash(password,10);
        //Create User
        const user = await authRepository.createUser({
            name,
            email,
            password: hashedPassword,
            phone
        });

        return res.status(201).json({
            message: "User Registered Successfully",
            user
        });
        // //Create new user
        // const newUser = new User({
        //     name,
        //     email,
        //     password: hashedPassword,
        //     phone
        // });

        // return res.status(201).json({
        //     message:"User Registered Successfully",
        //     user
        // });
    }
    catch(error){
        res.status(500).json({
            message: "Server Error"
        });
    }
};

//LOGIN API

exports.loginUser = async(req,res) => {
    try{
        const { email,password} = req.body;

        //Step 1: Validate request
        if(!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        //Step 2: Check user exists
        const user = await authRepository.findUserByEmail(email);
        if(!user){
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        //Step 3: Compare password
        const isMatch = await  bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        //token payload
        const payload = {
            userId: user._id,
            email: user.email,
            name: user.name
        };

        //generate token
        const token = generateToken(payload);

        return res.status(200).json({
            message: "Login Successful",
            user
        });
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};