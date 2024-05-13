import toast from "react-hot-toast";

const getInfos = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/infos`, {
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

export default getInfos