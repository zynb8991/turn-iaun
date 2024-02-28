import User from "@/models/userModel";
import connectDB from "@/utils/db";;
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const {token} = await req.json();

    if(!token) {
        return Response.json({
            data: null,
            metaData: null,
            ok: -1,
            error: true,
            message: "Not authorized, no token"
        }, {
            status: 200
        })
    }

    try {
        // Connect to mongodb database
        await connectDB();
        
        const decoded = jwt.verify(token, process.env.KEY_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if(!user) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: "Not authorized"
            }, {
                status: 200
            })
        }
        return Response.json({
            data: user,
            metaData: null,
            ok: 1,
            error: false,
            message: "Aauthorized"
        }, {
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