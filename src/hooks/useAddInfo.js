'use client'

import { useState } from "react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useGetInfos = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const getInfos = async ({title, type, code, infoId}) => {
        const valid = validation({title, type, code, infoId});
        if(!valid) return;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/infoes", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({title, type, code, infoId})
            });

            const data = await res.json();
            if(data.error) {
                throw new Error(data.message);
            }
            
            router.push("/info/add");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, getInfos};
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
    
    // if(!type) {
    //     toast.error("وارد کردن نوع فیلد اجباری است! ");
    //     return false;
    // }

    return true;
}

export default useGetInfos