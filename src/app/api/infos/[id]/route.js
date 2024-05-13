import Info from "@/models/infoModel";
import connectDB from "@/utils/db";

// @desc    Delete Info
// @route   DELETE /api/infoes/:id
// @access  Private
export async function DELETE(req, {params}) {
    try {
         // Connect to mongodb database
         await connectDB();

        //Check if label exists
        const infoExists = await Info.findById(params.id);
        if(!infoExists) {
            return Response.json({
                data: null,
                metaData: null,
                status: 400,
                errore: true,
                message: "Not Exists info!"
            }, {
                status: 400
            })
        }

        await Info.findByIdAndDelete(params.id);
    
        return Response.json({
            data: null,
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

// @desc    Edit a info
// @route   PUT /api/infos/:id
// @access  Private
export async function PUT(req, {params}) {
    try {
        const {title, type, code, infoId} = await req.json();

        // Connect to database
        await connectDB();

        // Check the required of field
        if(!title && !type && !code) {
            return Response.json({
                data: null,
                metaData: null,
                status: 400,
                error: true,
                message: "Please Fill All Fields."
            }, {
                status: 400
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
            }, {
                status: 400
            })
        }

        // Update section
        const newInfo = await Info.findByIdAndUpdate(params.id, {
            title, 
            type, 
            code,
            infoId
        }, {
            new: true
        })

        if(getInfo) {
            getInfo.infosId = [...getInfo.infosId, newInfo._id];
            await Info.findByIdAndUpdate(infoId, getInfo);
        }

        return Response.json({
            data: newInfo,
            metaData: null,
            status: 200,
            errore: false,
            message: "ویرایش اطلاعات با موفقیت انجام شد.."
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
        }) 
    }
}

// @desc    Get info
// @route   GET /api/infos/:id
// @access  Private
export async function GET(req, {params}) {
    try {
        // Connect to mongodb database
        await connectDB();

        //Check if info exists
        const infoExists = await Info.findById(params.id);

        if(!infoExists) {
            return Response.json({
                data: null,
                metaData: null,
                status: 400,
                errore: true,
                message: "Not found this info!"
            }, {
                status: 400
            })
        }

        return Response.json({
            data: infoExists,
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
        }) 
    }
}