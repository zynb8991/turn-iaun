import RezervTurn from "@/models/rezervTurnModel";
import connectDB from "@/utils/db";

// @desc    Get a Turn
// @route   GET /api/rezervturns
// @access  Private
export async function GET(req, { params }) {
    try {
        // Connect to mongodb database
        await connectDB();

        // Extract teacherId, startDate, and endDate from query
        const teacherId = params.id;
        const startDate = req.nextUrl.searchParams.get('startDate') || '';
        const endDate = req.nextUrl.searchParams.get('endDate') || '';

        if (!teacherId || !startDate || !endDate) {
            throw new Error('teacherId, startDate, or endDate is missing');
        }

        
        const rezervTurns = await RezervTurn.find({
            teacherId,
            dateTurn: {
                $gte: startDate,
                $lte: endDate
            }
        });

        return Response.json({
            data: rezervTurns,
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
