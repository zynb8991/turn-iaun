import RezervTurn from "@/models/rezervTurnModel";
import connectDB from "@/utils/db";

// @desc    Add a Turn
// @route   POST /api/rezervturns
// @access  Private
export async function POST(req) {
    try {
        // Connect to mongodb database
        await connectDB();

        const {userId, teacherId, dateTurn, status} = await req.json();

        if(!userId && !teacherId && !dateTurn) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: "Please fill all the fields."
            },
            {
                status: 400
            })
        }

        const rezervTurn = await RezervTurn.findOne({userId, teacherId, dateTurn});
        if(rezervTurn) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: "این نوبت قبلا برای شما ثبت شده است."
            },
            {
                status: 400
            })
        }
        const newRezervTurn = await RezervTurn.create({
            userId, 
            teacherId, 
            dateTurn, 
            status
        });

        if(newRezervTurn) {
            return Response.json({
                data: newRezervTurn,
                metaData: null,
                ok: 1,
                error: false,
                message: "ثبت نوبت با موفقیت انجام شد."
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
            message: "هنگام عملیات خطایی رخ داده است."
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
