import Info from "@/models/infoModel";
import Section from "@/models/sectionModel";
import User from "@/models/userModel";
import connectDB from "@/utils/db";
import bcrypt from "bcryptjs";

// @desc    Add a Teacher
// @route   POST /api/teacher
// @access  Private
export async function POST(req) {

    try {
        // Connect to mongodb database
        await connectDB();
        const {fullName, email, role, personnelCode, password, sections} = await req.json();
        const success = exsistTeacher({fullName, email, role, personnelCode, password});

        if(!success[0]) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: success[1]
            })
        }

        const findTeacher = await User.findOne({email});
        if(findTeacher) {
            return Response.json({
                data: null,
                metaData: null,
                ok: -1,
                error: true,
                message: "چنین کاربری با این ایمیل یافت شد."
            })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const teacher = await User.create({
            fullName,
            email,
            role: "teacher",
            personnelCode, 
            password: hashPass
        });
        if(sections) {
            sections.map( async (section) => {
                const findInfo = await Info.findById(section.section);
                const findSection = await Section.findOne({infoId: section.section, userId: teacher._id});

                // سکشن با شه خالی نباشه و مدیرگروهی با این سکشن نباشه
                if(section.section !== "" && findInfo && !findSection) {

                    // سکشن ذخیره میشه و ایدی ریخته میشه داخلش
                    const newSec = await Section.create({infoId: section.section, userId: teacher._id});

                    // یافتن کاربر با استفاده از شناسه  teacher._id
                    let user = await User.findById( teacher._id);
                                
                    if (user) {
                        // اضافه کردن شناسه سکشن جدید به آرایه sectionsId کاربر
                        user.sectionsId.push(newSec._id);

                        // ذخیره کاربر
                        await user.save();
                    }

                }
            })
        }

        if(teacher) {
            const newDataTeacher = await User.findById(teacher._id);
            return Response.json({
                data: newDataTeacher,
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

// @desc    Select Teachers
// @route   GET /api/users
// @access  Private
export async function GET(req) {
    
    try {
        // Connect to mongodb database
        await connectDB();

        let teachers = await User.find({role: "teacher"}).populate({
            path: 'sectionsId',
            model: 'Section',
            populate: {
                path: 'infoId',
                model: 'Info',
                populate: {
                    path: 'infoId'
                }
            }
        });
        
         return Response.json({
            data: teachers,
            metaData: null,
            status: 200,
            errore: false,
            message: "Successfull."
        }, {
            status: 200
        });

        
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

const exsistTeacher = ({fullName, email, role, personnelCode, password}) => {
    if(!fullName || !email || !role || !personnelCode || !password) {
        return [false, "Please fill all the fields"];
    }

    return [true];
}