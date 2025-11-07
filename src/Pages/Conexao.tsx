import '../css/Home.css'
import { Navigate, useNavigate } from 'react-router-dom'

function ConexaoPage() {
    const navigate = useNavigate()
    const backBtnClick = () =>{
        navigate("/games")
    }
    return(
        <div className="home-container">
            <h1>Conexão Game</h1>
            <button className="btn1" onClick={backBtnClick}>Back</button>
        </div>
    )
}

export default ConexaoPage