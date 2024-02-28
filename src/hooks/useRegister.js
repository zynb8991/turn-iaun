'use client'

import { useState } from "react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useRegister = () => {
    const router = useRouter();
  const [loading, setLoading] = useState(false);

  const register = async ({name, family, email, password}) => {
    const valid = validation({name, family, email, password});
    if(!valid) return;

    setLoading(true);
    try {
        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({fullName:`${name} ${family}`, email, password, role:"student"})
        });

        const data = await res.json();
        if(data.error) {
            throw new Error(data.message);
        }
        
        router.push("/");

    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  }
  return {loading, register};
}

const validation = ({name, family, email, password}) => {
    if(!name) {
        toast.error("وارد کردن نام اجباری است! ");
        return false;
    }
    if(!/^[\u0600-\u06FF\s]+$/.test(name)) {
        toast.error("لطفا نام را صحیح وارد کنید!");
        return false;
    }
    if(!family) {
        toast.error("وارد کردن نام خانوادگی اجباری است! ");
        return false;
    }
    if(!/^[\u0600-\u06FF\s]+$/.test(family)) {
        toast.error("لطفا نام خانوادگی را صحیح وارد کنید!");
        return false;
    }
    if(!email) {
        toast.error("وارد کردن ایمیل اجباری است! ");
        return false;
    }
    if(!/^[a-zA-Z]+([\.]?[a-zA-Z0-9]+)*@[a-zA-Z]+([\.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,3})+$/.test(email)) {
        toast.error("لطفا ایمیل را صحیح وارد کنید!");
        return false;
    }
    if(!password) {
        toast.error("وارد کردن رمزعبور اجباری است! ");
        return false;
    }
    if(password.length < 6) {
        toast.error("طول رمزعبور باید حداقل شش کاراکتر باشد!");
        return false;
    }

    return true;
}

export default useRegister