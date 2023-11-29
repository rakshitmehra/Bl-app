import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController
{
    static userRegistration = async (req, res) => {
        const { username, email, password } = req.body;
        try {
            if(username && email && password)
            {const isUser = await authModel.findOne({email: email});
            if(!isUser){
                // password hashing
                const genSalt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(password, genSalt);

                // save new user
                const newUser = new authModel({
                    username,
                    email,
                    password: hashedPassword,
                });

                const savedUser = await newUser.save();
                if(savedUser)
                {
                    return res.status(200).json({message: "User Registration Successfully"});
                }
            }
            else{
                return res.status(400).json({message: "Email Already Exists"});
            }
            }else
            {
                return res.status(400).json({message: "All fields are required"});
            }
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    };
    static userLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (email && password)
            {
                const isEmail = await authModel.findOne({email: email});
                if(isEmail)
                {
                    if(isEmail.email === email && (await bcryptjs.compare(password, isEmail.password)))
                    {
                        //Generate Token

                        const token = jwt.sign({ userID: isEmail._id }, "rakshitmehra", {
                            expiresIn: "2d",
                        });
                        return res.status(200).json({
                            message: "Login Successfully",
                            token,
                            name: isEmail.username,
                        });

                    }
                    else
                    {
                        return res.status(400).json({message: "Wrong Credentials"});
                    }
                }
                else
                {
                    return res.status(400).json({message: "Email ID Not Found"});
                }
            }
            else
            {
                return res.status(400).json({message: "All fields are required"});
            }
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    };
}

export default AuthController;