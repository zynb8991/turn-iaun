
import User from "@/models/userModel";
import connectDB from "@/utils/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

// @desc    Add a User
// @route   POST /api/register
// @access  Public
export async function POST(req) {

    try {
        // Connect to mongodb database
        await connectDB();

        const {fullName, email, password, role, personnelCode} = await req.json();

        const userExists = await User.findOne({email});
        if(userExists) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: "چنین کاربری وجود دارد."
            },{
                status: 400
            })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        console.log(hashPass);

        const user = await User.create({
            fullName,
            email,
            password: hashPass,
            role,
            personnelCode
        })
        if(user) {
            cookies().set({
                name: "turn-iaun-user",
                value: jwt.sign({
                    id: user._id
                },
                process.env.KEY_SECRET, {
                    expiresIn: "1d"
                }),
                maxAge: (60 * 60 * 24),
                httpOnly: true,
                secure: true
            })

            return Response.json({
                data: user,
                metaData: null,
                ok: 1,
                error: false,
                message: "اضافه کردن با موفقیت انجام شد."
            },
            {
                status: 201
            })
        }

        return Response.json({
            data: null,
            metaData: null,
            ok: -1,
            error: true,
            message: "هنگاه عملیات خطایی رخ داده است."
        })
    } catch (error) {
        return Response.json({
            data: null,
            metaData: null,
            ok: -1,
            error: true,
            message: error.message
        }, {
            status: 500
        }) 
    }
    
} 
