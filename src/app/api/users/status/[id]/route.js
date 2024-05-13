import connectDB from "@/utils/db";
import User from "@/models/userModel";

// @desc    Update Teachers
// @route   PUT /api/users
// @access  Private
export async function PUT(req, {params}) {
    try {
        // Connect to mongodb database
        await connectDB();

        const { active } = await req.json();

        let user = await User.findById(params.id);
        if(!user) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: "Not Exists User!"
            },{
                status: 400
            })
        }

        user.active = active;
        const newUser = await user.save();

        return Response.json({
            data: newUser,
            metaData: null,
            ok: 1,
            error: false,
            message: "successful."
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
        }) 
    }

}