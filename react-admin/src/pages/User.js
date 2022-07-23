import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const User = () => {

    let params = useParams()

    return (
        <>
            <Navbar />
            <div>
                {params.id}
            </div>
        </>
    );
}
 
export default User;