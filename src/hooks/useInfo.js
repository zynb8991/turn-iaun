'use client'

import { useState } from "react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useInfos = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const addInfo = async ({title, type, code, infoId}) => {
        const valid = validation({title, type, code});
        if(!valid) return;

        let newData = {
            title,
            type,
            code
        }
        if(type !== "college" && infoId) newData.infoId = infoId;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/infos", {
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

    const editInfo = async ({title, type, code, infoId, id}) => {
        const valid = validation({title, type, code});
        if(!valid) return;

        let newData = {
            title,
            type,
            code
        }
        if(type !== "college" && infoId) newData.infoId = infoId;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/infos/" + id, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newData)
            });
            const data = await res.json();
            if(data.error) {
                throw new Error(data.message);
            }
            
            toast.success("ویرایش اطلاعات با موفقیت انجام شد.");
            return true;

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, addInfo, editInfo};
}

const validation = ({title, type, code}) => {
    if(!title) {
        toast.error("وارد کردن عنوان اجباری است! ");
        return false;
    }
    
    if(!code) {
        toast.error("وارد کردن کد اجباری است! ");
        return false;
    }

    if(isNaN(code)) {
        toast.error("نوع کد وارد شده اشتباه است!");
        return false;
    }
    
    if(!type) {
        toast.error("وارد کردن نوع فیلد اجباری است! ");
        return false;
    }

    return true;
}

export default useInfos