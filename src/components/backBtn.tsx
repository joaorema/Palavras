import { Navigate, useNavigate } from "react-router-dom"
import '../css/Buttons.css'

function BackBtn (){
    const navigate = useNavigate()
    const backBtnClick = () =>{
        navigate("/home")
    }

    return(
            <button className="backbtn" onClick={backBtnClick}>
                Back
            </button>
    )
}

export default BackBtn