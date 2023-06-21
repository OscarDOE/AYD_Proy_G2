import React, { useRef,useState } from 'react'
import '../styles/sRegistroRepartidor.css'
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Android } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { Alert } from '@mui/material';

const RegistroEmpresa = () => {

    const navigate = useNavigate();
    const ruta_AWS = ''

    const handleNavigate = () => {
        navigate("/login");
    };


    const [value, setValue] = useState(false);
    const [error, setError] = useState(null);
    // const handleChangeSwitch = (event) =>{
    //     console.log('----------')
    //     console.log(value)
        
    //     //setValue(event.target.checked)
        
    //     //console.log(value)
    // }



    const [user, setUser] = useState({
        nombre: "",
        usuario: "",
        foto_perfil: null,
        email: "",
        password: "",
        pass_confirm:"",
        user_type: null
    })

    const handleSubmit = async (e) => {

        e.preventDefault()
        const formData = new FormData();
        formData.append("nombre",user.nombre);
        formData.append("usuario",user.usuario);
        formData.append("foto_perfil",user.foto_perfil);
        formData.append("email",user.email);
        formData.append("password",user.password);
        formData.append("pass_confirm",user.pass_confirm);
        //formData.append("user_type",user.user_type);
        if(value){
            console.log('entre true')
            formData.append("user_type","0");
        }else{
            formData.append("user_type","2");
        }
        console.log(formData.get('user_type'));

        const endpoint = await fetch(ruta_AWS+'/api/users/registro', {
            method: "POST",
            body:formData
        });

        const resp = await endpoint.json();
        if (endpoint.status === 400){
            setError(resp.message);
        }
        else{ 
            setError(null);
            alert("¡Registrado correctamente!")
            handleNavigate()
        }
        
    };


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const displData = new FormData(displ.current)
    //     const data = {
    //         carnet: displData.get('carnet'),
    //         dpi: displData.get('dpi'),
    //         nombre: displData.get('nombre'),
    //         carrera: displData.get('carrera'),
    //         correo: displData.get('correo'),
    //         password: displData.get('password'),
    //         edad: displData.get('edad')
    //     }

        // const pointBack = await fetch('http://localhost:5000/registrarUsuario', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         "carnet": data.carnet,
        //         "dpi": data.dpi,
        //         "nombre": data.nombre,
        //         "carrera": data.carrera,
        //         "correo": data.correo,
        //         "password": data.password,
        //         "edad": data.edad
        //     }),
        // });
        
    // }

    const Android12Switch = styled(Switch)(({ theme }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
          borderRadius: 22 / 2,
          '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
          },
          '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
          },
          '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: 'none',
          width: 16,
          height: 16,
          margin: 2,
        },
      }));



    return (
        <div>
            <div class="popup-overlay"></div>
            <div class="popups">
                <form action="/" class="form2" onSubmit={handleSubmit}>
                    <div class="form">
                        <div class="avatar">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkn2G77BGQM_-dgBLY30jPpUyHjbpbRajZ3XpIVoWeApDVJwNQ6C4eDxLKQdRVuvYq7EU&usqp=CAU" alt="" />
                        </div>
                        <div class="header">
                            Completa tu informacion
                        </div>
                        <div class="element">
                            <label for="username">Nombre del negocio</label>
                            <input onChange={(e) => setUser({ ...user, nombre:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>
                        <div class="element">
                            <label for="password">Descripcion</label>
                            <input onChange={(e) => setUser({ ...user, usuario:e.target.value })}  type="text" name="usuario" id="Usuario"></input>
                        </div>
                        <div class="element">
                            <label for="password">Categoria</label>
                            <input onChange={(e) => setUser({ ...user, password:e.target.value })}  type="text" name="password" id="Password"></input>
                        </div>
                        <div class="element">
                            <label for="password">Email</label>
                            <input onChange={(e) => setUser({ ...user, email:e.target.value })}  type="text" name="email" id="Email"></input>
                        </div>
                        <div class="element">
                            <label for="password">Departamento</label>
                            <input onChange={(e) => setUser({ ...user, pass_confirm:e.target.value })}  type="text" name="c_password" id="C_password"></input>
                        </div>
                        <div class="element">
                            <label for="password">Municipio</label>
                            <input onChange={(e) => setUser({ ...user, pass_confirm:e.target.value })}  type="text" name="c_password" id="C_password"></input>
                        </div>
                        <div class="element">
                            <label for="password">Zona</label>
                            <input onChange={(e) => setUser({ ...user, pass_confirm:e.target.value })}  type="text" name="c_password" id="C_password"></input>
                        </div>
                        <div class="element">
                            <label for="curriculum">Documentos</label>
                            <input onChange={(e) => setUser({ ...user, foto_perfil:e.target.files[0] })}  type="file" name="f_Perfil" id="fo_Perfil"></input>
                        </div>
                        <div class="element">
                            {/* <button onClick={()=>console.log(value)} type="submit">Registrar</button> */}
                            <button type="submit" >Registrar</button>
                        </div>
                    </div>
                </form>
                {error ? <Alert variant="filled" severity="error">{error}</Alert> : ""}
            </div>
        </div>
    )
}

export default RegistroEmpresa