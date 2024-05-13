import Info from "@/models/infoModel";
import connectDB from "@/utils/db";

// @desc    Add a Info
// @route   POST /api/infoes
// @access  Private
export async function POST(req) {

    try {
        // Connect to mongodb database
        await connectDB();
        const {title, type, code, infoId} = await req.json();

        const success = exsistInfo({title, type, code});

        if(!success[0]) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: success[1]
            })
        }
        const getInfo = await Info.findById(infoId);
        if(type !== "college" && infoId && !getInfo) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: "Not found this info"
            })
        }

        const info = await Info.create({
            title, 
            type, 
            code, 
            infoId
        })

        if(getInfo) {
            getInfo.infosId = [...getInfo.infosId, info._id];
            await Info.findByIdAndUpdate(infoId, getInfo);
        }

        if(info) {
            return Response.json({
                data: info,
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
        }) 
    }
    
} 

// @desc    Select Infos
// @route   GET /api/infoes
// @access  Private
export async function GET(req) {
    const url = new URL(req.url);
    const typeQuery = url.searchParams.get("type");

    const queries = typeQuery ? {type: "college"} : {}
    
    try {
         // Connect to mongodb database
         await connectDB();

         const infos = await Info.find(queries).populate('infoId').populate({
            path: 'infosId',
            model: 'Info',
            populate: {
                path: 'infosId'
            }
        });

         return Response.json({
            data: infos,
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

const exsistInfo = ({title, type, code}) => {
    if(!title || !type || !code) {
        return [false, "Please fill all the fields"];
    }

    return [true];
}