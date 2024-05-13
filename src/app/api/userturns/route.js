import UserTurn from "@/models/userTurnModel";
import connectDB from "@/utils/db";

// @desc    Add a Turn for student
// @route   POST /api/userturns
// @access  Private
export async function POST(req) {
    try {
        // Connect to mongodb database
        await connectDB();

        const {userId, turns} = await req.json();

        // برای این استاد با این روز نوبتی هست یانه اگه بود مقادیر رو اپدیت کن درغیر اینصورت اضافه کن
        var turnId = [];
        for (const turn of turns) {
            let turnTeacher = await UserTurn.findOne({ userId: userId, day: turn.day });
            if (turnTeacher) {
                turnTeacher.startHour = turn.startHour;
                turnTeacher.endHour = turn.endHour;
                await turnTeacher.save();
                turnId.push(turnTeacher._id);
            } else {
                const newTurnTeacher = await UserTurn.create({
                    userId,
                    day: turn.day,
                    startHour: turn.startHour,
                    endHour: turn.endHour
                });
                turnId.push(newTurnTeacher._id);
            }
        }

        // Delete documents from UserTurn collection
        await UserTurn.deleteMany({
            userId: userId,
            _id: {
                $nin: turnId
            }
        });

        const newTurnTeacher = await UserTurn.find({userId: userId});
        if(newTurnTeacher) {
            return Response.json({
                data: newTurnTeacher,
                metaData: null,
                ok: 1,
                error: false,
                message: "عملیات با موفقیت انجام شد."
            },
            {
                status: 201
            })
        }
     
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