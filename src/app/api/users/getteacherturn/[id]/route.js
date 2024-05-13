import Section from "@/models/sectionModel";
import Userturn from "@/models/userTurnModel";
import connectDB from "@/utils/db";

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private
export async function GET(req, {params}) {
    try {
        // Connect to mongodb database
        await connectDB();

        const section = await Section.findOne({infoId: params.id});
        if(!section) {
            return Response.json({
                data: [],
                metaData: null,
                ok: -1,
                error: true,
                message: "Not Exists this section!"
            },{
                status: 400
            })
        }
        const userTurns = await Userturn.find({userId: section.userId}).populate('userId');
        return Response.json({
            data: userTurns,
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