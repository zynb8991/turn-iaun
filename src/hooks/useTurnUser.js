'use client'

import { useState } from "react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useTurnUser = () => {
    const [loading, setLoading] = useState(false);

    const editTurn = async (data) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/userturns", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });

            const fetchData = await res.json();
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

    return {loading, editTurn};
}

export default useTurnUser