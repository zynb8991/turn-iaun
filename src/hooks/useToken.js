'use client'

import { useState } from "react"
import toast from "react-hot-toast";

const useToken = () => {
  const [loading, setLoading] = useState(false);

  const getUserByToken = async ({token}) => {

    setLoading(true);
    try {
        const res = await fetch("http://localhost:3000/api/token", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token})
        });

        const data = await res.json();
        if(data.error) {
            throw new Error(data.message);
        }
        
        return data.data;

    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  }
  return {loading, getUserByToken};
}

export default useToken