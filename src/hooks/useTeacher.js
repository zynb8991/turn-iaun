'use client'

import { useState } from "react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useTeacher = () => {
    const [loading, setLoading] = useState(false);

    const addTeacher = async ({fullName, email, role, personnelCode, password, sections}) => {
        const valid = validation({action: "add", fullName, email, role, personnelCode, password});
        if(!valid) return;

        let newData = {
            fullName, 
            email, 
            role: "teacher", 
            personnelCode, 
            password,
            sections
        }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newData)
            });

            const data = await res.json();
            if(data.error) {
                throw new Error(data.message);
            }
            toast.success("افزودن اطلاعات با موفقیت انجام شد.");
            return true;

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const editTeacher = async ({fullName, email, role, personnelCode, password, sections, teacherId}) => {
        const valid = validation({action: "edit", fullName, email, role, personnelCode, password});
        if(!valid) return;

        let newData = {
            fullName, 
            email, 
            role: "teacher",
            personnelCode, 
            password,
            sections
        }
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/users/" + teacherId, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newData)
            });

            const data = await res.json();
            // if(data.error) {
            //     throw new Error(data.message);
            // }
            toast.success("ویرایش اطلاعات با موفقیت انجام شد.");
            return true;

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, addTeacher, editTeacher};
}

const validation = ({action, fullName, email, role, personnelCode, password}) => {
    if(!fullName) {
        toast.error("وارد کردن نام و نام خانوادگی اجباری است! ");
        return false;
    }
    
    if(!email) {
        toast.error("وارد کردن ایمیل اجباری است! ");
        return false;
    }
    
    if(role !== "teacher") {
        toast.error("خطای سرور رخ داده است!");
        return false;
    }

    if(!/^[a-zA-Z]+([\.]?[a-zA-Z0-9]+)*@[a-zA-Z]+([\.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,3})+$/.test(email)) {
        toast.error("لطفا ایمیل را صحیح وارد کنید!");
        return false;
    }
    
    if(!personnelCode) {
        toast.error("وارد کردن کد پرسنلی اجباری است! ");
        return false;
    }
    
    if(action == "add" && !password) {
        toast.error("وارد کردن رمز ورود اجباری است! ");
        return false;
    }

    return true;
}

export default useTeacher