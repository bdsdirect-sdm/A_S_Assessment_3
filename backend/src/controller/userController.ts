import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const secret: string = "Anurag123#@!";
let token: string;
const app = express();

app.use(express.json());


// Get User
export const getUser = async (req: any, res: any): Promise<void> => {
    try {
        const id = req.user.user.id;

        // console.log("Request---",req);
        const user = await User.findByPk(id);

        if (user) {

            res.json(user);
        } else {
            res.status(404).send("User not Found");
        }
    } catch (err) {
        res.status(404).send(`${err} & User not Found......`);
    }
};

// Add New User
export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const email = req.body.email;
        const isexist = await User.findOne({where:{email}});
        if(isexist){
            res.status(400).send("Email already Exist.....");
        }
        else{
            const user = await User.create(req.body);
            res.json(user);
        }
        
    } catch (err: any) {
        console.log(err.message);
        res.status(404).send(`${err} & User can't be added`);
    }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log("is pass valid: ",isPasswordValid)
            if (isPasswordValid) {
                token = jwt.sign({user}, secret);
                res.json({user:user, token:token});
                console.log("User login successful");
            } else {
                res.status(401).send("Invalid Credentials");
            }
        } else {
            res.status(401).send("User doesn't exist");
        }
    } catch (err: any) {
        res.status(500).send(`Error logging in: ${err}`);
    }
};

// Update User
export const updatUser = async (req: any, res: any): Promise<void> => {
    try {
        const {firstname, lastname, email, DOB, gender, phone} = req.body;
        console.log("11111");
        const user = await User.findByPk(req.user.user.id);
        console.log("222222");
        console.log("User---------------",user);
        if (user?.email === email) {
            console.log("333333");
            await user?.update(req.body);
            res.json(user);``
        } else{

            const isexist = await User.findOne({where:{email}});
            
            if (isexist){
                
                res.status(404).send({message: "Email already exists...."});
            }
            else{
                await user?.update(req.body);
                res.json(user);
            }
        }
    } catch (err: any) {
        res.status(500).send(`${err} & Error updating the user`);
    }
};

