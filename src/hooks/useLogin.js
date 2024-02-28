'use client'

import { useState } from "react"
import toast from "react-hot-toast";
import {useRouter} from 'next/navigation'

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async ({email, password}) => {
    const valid = validation({email, password});
    if(!valid) return;

    setLoading(true);
    try {
        const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
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

  return {loading, login};
}

const validation = ({email, password}) => {
    if(!email) {
        toast.error("وارد کردن ایمیل اجباری است! ");
        return false;
    }
    if(!password) {
        toast.error("وارد کردن رمزعبور اجباری است! ");
        return false;
    }
    // if(/^[a-zA-Z]+([\.]?[a-zA-Z0-9]+)*@[a-zA-Z]+([\.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,3})+$/.test(email)) {
    //     toast.error("لطفا ایمیل را صحیح وارد کنید!");
    //     return false;
    // }

    return true;
}

export default useLogin