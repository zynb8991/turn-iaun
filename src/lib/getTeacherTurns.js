import toast from "react-hot-toast";

const getTeacherTurns = async ({role, teacherId}) => {
    try {
        const res = await fetch(`http://localhost:3000/api/turns?role=${role}&teacherId=${teacherId}`, {
            method: 'GET',
            cache: 'no-store'
          });

        const data = await res.json();

        if(data.error) {
            toast.error(data.message);
            return false;
        }
        return data.data;

    } catch (error) {
        toast.error(error.message);
        return false;
    } 
}

export default getTeacherTurns