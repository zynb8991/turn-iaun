import RezervTurns from "@/models/rezervTurnModel";
import connectDB from "@/utils/db";

// @desc     Change status of turns
// @route    PUT /api/turns/:id
// @access   Private

export async function PUT(req, {params}) {
    try {
        // Connect to mongodb database
        await connectDB();

        const {status} = await req.json();

        const turn = await RezervTurns.findById(params.id);
        if(!turn) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: "Not found this turn"
            }, {
                status: 400
            })
        }

        turn.status = status;
        turn.save();
        
        return Response.json({
            data: turn,
            metaData: null,
            status: 200,
            errore: false,
            message: "ویرایش نوبت با موفقیت انجام شد.."
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