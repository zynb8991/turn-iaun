import RezervTurn from "@/models/rezervTurnModel";
import connectDB from "@/utils/db";

// @desc    Get a UserTurn
// @route   GET /api/rezervturns
// @access  Private
export async function GET(req, { params }) {
    try {
        // Connect to mongodb database
        await connectDB();

        // Extract userId from query
        const userId = params.id;

        if (!userId) {
            throw new Error('userId is missing');
        }

        
        const userTurns = await RezervTurn.find({userId}).populate('userId').populate('teacherId');

        return Response.json({
            data: userTurns,
            metaData: null,
            status: 200,
            error: false,
            message: "Successfull."
        }, {
            status: 200
        });

    } catch (error) {
        return Response.json({
            data: null,
            metaData: null,
            ok: -1,
            error: true,
            message: error.message
        });
    }
}
