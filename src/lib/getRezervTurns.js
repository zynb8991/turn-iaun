import toast from "react-hot-toast";

const getRezervTurns = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/rezervturns/userturns/${id}`, {
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

export default getRezervTurns