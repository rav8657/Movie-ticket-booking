
import adminModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';



//#region registerAdmin
export const registerAdmin = async (req, res) => {
    try {
        const admin = await adminModel.create(req.body);
        res.status(201).send(admin);
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};
//#endregion





//#region AdminLogin
export const adminLogin = async (req, res) => {
    try {
        const admin = await adminModel.findOne({
            email: req.body.email,
            password: req.body.password
        });
        if (!admin) {
            return res.status(401).send({ message: 'Invalid email or password' });
        } else {
            const token = jwt.sign({
                email: admin.email, _id: admin._id
            }, process.env.SECRET_KEY, {
                expiresIn: '1h'
            });
            return res.status(200).send({ message: 'Login successful', token: token });
        }
    } catch (err) {
        return res.status(500).send({ status: err.message })
    }
};
//#endregion