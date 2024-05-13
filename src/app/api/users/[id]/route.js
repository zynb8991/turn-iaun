import Info from "@/models/infoModel";
import Section from "@/models/sectionModel";
import User from "@/models/userModel";
import connectDB from "@/utils/db";
import bcrypt from "bcryptjs";

// @desc    Update Teachers
// @route   PUT /api/users
// @access  Private
export async function PUT(req, {params}) {
    try {
        // Connect to mongodb database
        await connectDB();

        const {fullName, email, role, personnelCode, password, sections} = await req.json();
        const success = exsistTeacher({fullName, email, role, personnelCode});

        if(!success[0]) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: success[1]
            })
        }

        // Check if user exists
        const teacherExists = await User.findById(params.id);

        if(!teacherExists) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: "Not Exists User!"
            },{
                status: 400
            })
        }

        let hashPass;
        if(password) {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            hashPass = await bcrypt.hash(password, salt);

        } else {
            hashPass = teacherExists.password;
        }
        
        // Update teacher
        await User.findByIdAndUpdate(params.id, {
            fullName,
            email,
            role: "teacher",
            personnelCode, 
            password: hashPass,
            sectionsId: []
        }, {
            new: true
        });

        // Delete all sections that exists before
        const doneDelete = await Section.deleteMany({userId: params.id});

        // if all sections deleted(acknowledged)
        if(sections && doneDelete.acknowledged) {
            sections.map(async (section) => {
                const findInfo = await Info.findById(section.section);
                const findSection = await Section.findOne({ infoId: section.section, userId: params.id });
            
                // بررسی می‌کنیم که بخش خالی نباشد و اطلاعات مربوط به بخش وجود داشته باشد و بخش قبلاً برای این کاربر ایجاد نشده باشد
                if (section.section !== "" && findInfo && !findSection) {
                    // ایجاد یک سکشن جدید و ذخیره شناسه آن
                    const newSec = await Section.create({ infoId: section.section, userId: params.id });
            
                    // یافتن کاربر با استفاده از شناسه params.id
                    let user = await User.findById(params.id);
            
                    if (user) {
                        // اضافه کردن شناسه سکشن جدید به آرایه sectionsId کاربر
                        user.sectionsId.push(newSec._id);
            
                        // ذخیره کاربر
                        await user.save();
                    }
                }
            })

        }
        
        const newDataTeacher = await User.findById(params.id);
        return Response.json({
            data: newDataTeacher,
            metaData: null,
            ok: 1,
            error: false,
            message: "successful."
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

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private
export async function GET(req, {params}) {
    try {
        // Connect to mongodb database
        await connectDB();

        //Check if user exists
        const userExists = await User.findById(params.id).populate({
            path: 'sectionsId',
            model: 'Section',
            populate: {
                path: 'infoId',
                model: 'Info',
                populate: {
                    path: 'infoId',
                    model: 'Info',
                    populate: {
                        path: 'infoId'
                    }
                }
            }
        }).populate({
            path: 'sectionsId',
            model: 'Section',
            populate: {
                path: 'infoId',
                model: 'Info',
                populate: {
                    path: 'infoId',
                    model: 'Info',
                    populate: {
                        path: 'infosId'
                    }
                }
            }
        });
        

        if(!userExists) {
            return Response.json({
                data: null,
                metaData: null,
                status: 400,
                errore: true,
                message: "Not Exists User!"
            }, {
                status: 400
            })
        }

        return Response.json({
            data: userExists,
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


const exsistTeacher = ({fullName, email, role, personnelCode}) => {
    if(!fullName || !email || !role || !personnelCode ) {
        return [false, "Please fill all the fields"];
    }

    return [true];
}

// @desc    Delete Teacher
// @route   DELETE /api/users/:id
// @access  Private
export async function DELETE(req, {params}) {
    try {
         // Connect to mongodb database
         await connectDB();

        //Check if label exists
        const teacherExists = await User.findById(params.id);
        if(!teacherExists) {
            return Response.json({
                data: null,
                metaData: null,
                status: 400,
                errore: true,
                message: "Not Exists teacher!"
            }, {
                status: 400
            })
        }

        await User.findByIdAndDelete(params.id);
    
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