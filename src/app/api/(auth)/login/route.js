import User from "@/models/userModel";
import connectDB from "@/utils/db";
import bcrypt from "bcryptjs";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// @desc    Login a User
// @route   POST /api/login
// @access  Public
export async function POST(req) {
    const {email, password} = await req.json();
    if(!email || !password) {
        return Response.json({
            data: null,
            metaData: null,
            ok: -1,
            error: true,
            message: "Please fill all fields"
        }, {
            status: 200
        })
    }
    
    try {
        // Connect to mongodb database
        await connectDB();

        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: "اطلاعات وارد شده اشتباه است."
            },{
                status: 400
            })
        }
        if(user.active == 0){
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: "حساب کاربری این کاربر غیرفعال است."
            },{
                status: 400
            })
        }

        cookies().set({
            name: "turn-iaun-user",
            value: jwt.sign({
                id: user._id
            },
            process.env.KEY_SECRET, {
                expiresIn: "1d"
            }),
            maxAge: (60 * 60 * 24),
            httpOnly: false,
            secure: false
        })


        return Response.json({
            data: user,
            metaData: null,
            ok: 1,
            error: false,
            message: "successfully"
        },{
            status: 200
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