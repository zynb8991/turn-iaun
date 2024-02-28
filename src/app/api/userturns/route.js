import UserTurn from "@/models/userTurnModel";
import connectDB from "@/utils/db";

// @desc    Add a Turn for student
// @route   POST /api/userturns
// @access  Private
export async function POST(req) {
    try {
        // Connect to mongodb database
        await connectDB();

        const {userId, startHour, endHour, day, date, state, period} = await req.json();

        const userRezervTurn = await UserTurn.findOne({userId, startHour, endHour, day, date, state, period});
        if(userRezervTurn) {
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
        const newUserRezervTurn = await UserTurn.create({
            userId, 
            startHour, 
            endHour, 
            day, 
            date, 
            state, 
            period
        })

        if(newUserRezervTurn) {
            return Response.json({
                data: newUserRezervTurn,
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