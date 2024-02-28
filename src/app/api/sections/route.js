import Section from "@/models/sectionModel";
import connectDB from "@/utils/db";

// @desc    Add a Section
// @route   POST /api/sections
// @access  Private
export async function POST(req) {
    try {
        // Connect to mongodb database
        await connectDB();

        const {userId, infoId} = await req.json();

        const section = await Section.findOne({userId, infoId});
        if(section) {
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
        const newSection = await Section.create({
            userId,
            infoId
        })

        if(newSection) {
            return Response.json({
                data: newSection,
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