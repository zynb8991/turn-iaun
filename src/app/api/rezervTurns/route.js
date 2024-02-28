import RezervTurn from "@/models/rezervTurnModel";
import connectDB from "@/utils/db";

// @desc    Add a Turn
// @route   POST /api/rezerTurns
// @access  Private
export async function POST(req) {
    try {
        // Connect to mongodb database
        await connectDB();

        const {userId, teacherId, hourTurn, dayTurn, status, date} = await req.json();

        const rezervTurn = await RezervTurn.findOne({userId, teacherId, hourTurn, dayTurn, status, date});
        if(rezervTurn) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: "چنین اطلاعاتی وجود دارد."
            },
            {
                status: 400
            })
        }
        const newRezervTurn = await RezervTurn.create({
            userId, 
            teacherId, 
            hourTurn, 
            dayTurn, 
            status, 
            date
        })

        if(newRezervTurn) {
            return Response.json({
                data: newRezervTurn,
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