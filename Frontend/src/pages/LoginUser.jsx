import React, { useRef, useContext, useState } from 'react'
import '../styles/sloginempresa.css'
import Cookies from "universal-cookie"
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const LoginUsers = () => {

    // const displ = useRef(null);
    // const [userV, setUserV] = useState(true)
    const ruta_AWS = 'http://localhost:4000'

    const [error, setError] = useState(null);
    const form = useRef();


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const displData = new FormData(displ.current)
    //     const data = {
    //         userL: displData.get('username'),
    //         password: displData.get('password')
    //     }
    //     const pointBack = await fetch('http://localhost:5000/login', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             "carnet": data.userL,
    //             "password": data.password
    //         }),
    //     });

    //     const userLinfo = await pointBack.json()
    // }

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleNavigate = () => {
        const usuario_logeado = cookies.get('session');
        console.log(usuario_logeado)
        if(usuario_logeado.rol === "1"){
            navigate("/homeadmin");
        }else if(usuario_logeado.rol === "2"){
            navigate("/");
        }else if(usuario_logeado.rol === "3"){
            navigate("/perfilrepartidor");
        }else if(usuario_logeado.rol === "4"){
            navigate("/");
        }
        
    };

    const cookies = new Cookies();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formdata = new FormData();
        // formdata.append("usuario",user.usuario);
        // formdata.append("password",user.password);
        // const user = {
        //   usuario: formdata.get("usuario"),
        //   password: formdata.get("password"),
        // };
    
        const endpoint = await fetch(ruta_AWS+'/loginUser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(user)
        });

        const resp = await endpoint.json();
        if (endpoint.status === 401 || endpoint.status === 400){
            setError(resp.message);
        }
        else{ 
            setError(null);
            cookies.set("session", resp);
            handleNavigate()
        }

        // const sesion = cookies.get('session')
        // console.log(sesion)
      };



    return (
        <div>
            <div class="popup-overlay"></div>
            <div class="popup">
                <form action="/" class="form1" ref={form} onSubmit={handleSubmit}>
                    <div class="form">
                        <div class="avatar">
                            <img src="https://yt3.ggpht.com/ytc/AKedOLTOxCzheuyu7Cw8Hsm1TvLlbekMeVVrE1c5zL6h=s900-c-k-c0x00ffffff-no-rj" alt="" />
                        </div>
                        <div class="header">
                            Ingresa tus datos
                        </div>
                        <div class="element">
                            <label for="username">Username</label>
                            <input onChange={(e) => setUser({ ...user, username:e.target.value })} type="text" name="username"></input>
                        </div>
                        <div class="element">
                            <label for="password">Password</label>
                            <input onChange={(e) => setUser({ ...user, password:e.target.value })} type="password" name="password"></input>
                        </div>
                        <div class="element">
                            <button type="submit">Login</button>
                            
                        </div>
                        
                    </div>
                    
                </form>
            </div>
            {error ? <Alert variant="filled" severity="error">{error}</Alert> : ""}
        </div>
    )
}

export default LoginUsers