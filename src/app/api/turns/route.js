import RezervTurns from "@/models/rezervTurnModel";
import connectDB from "@/utils/db";

// @desc    Select Turns
// @route   GET /api/turns
// @access  Private

export async function GET(req) {
    const role = req.nextUrl.searchParams.get('role') || '';
    const teacherId = req.nextUrl.searchParams.get('teacherId') || '';

    let query = {}; // شرط پیش‌فرض برای نمایش تمامی نوبت‌ها
    if (role === 'teacher') {
        // اگر کاربر teacher باشد، فقط نوبت‌های مربوط به خودش را بیاورید
        query = { teacherId };
    }

    try {
         // Connect to mongodb database
         await connectDB();

         const allTurns = await RezervTurns.find(query).populate('teacherId').populate('userId');

         return Response.json({
            data: allTurns,
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
        }, {
            status: 500
        }) 
    }
}

