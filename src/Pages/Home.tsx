import '../css/Home.css'
import { Navigate, useNavigate } from "react-router-dom"

function Home (){
    const navigate = useNavigate()
    const btn1Click = ()=> {
        navigate("/games")
    }

    return(
        <div className="top-div">
            <h1>Jogos</h1>
            <button className="btn1" onClick={btn1Click}>Jogar</button>
        </div>
        
    )

}

export default Home