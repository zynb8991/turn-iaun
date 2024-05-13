import UserTurn from "@/models/userTurnModel";
import connectDB from "@/utils/db";

// @desc    Get userturn
// @route   GET /api/userturns/:id
// @access  Private
export async function GET(req, {params}) {
    try {
        // Connect to mongodb database
        await connectDB();

        //Check if item exists
        const userTurnExists = await UserTurn.find({userId: params.id});

        if(!userTurnExists) {
            return Response.json({
                data: null,
                metaData: null,
                status: 400,
                errore: true,
                message: "Not found this turn for user!"
            }, {
                status: 400
            })
        }

        return Response.json({
            data: userTurnExists,
            metaData: null,
            status: 200,
            errore: false,
            message: "Successfull."
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