'use client'

import { useState } from "react"
import toast from "react-hot-toast";

const useGetInfos = () => {
    const [loading, setLoading] = useState(false);

    const getInfos = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/infos?type=college");

            const data = await res.json();
            if(data.error) {
                toast.error(data.message);
                return false;
            }
            return data.data;

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, getInfos};
}

export default useGetInfos