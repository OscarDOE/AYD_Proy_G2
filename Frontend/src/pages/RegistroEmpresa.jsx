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
    const ruta_AWS = 'http://localhost:4000'

    const handleNavigate = () => {
        navigate("/loginempresa");
    };


    const [value, setValue] = useState(false);
    const [error, setError] = useState(null);


    const [empresa, setEmpresa] = useState({
        nombre: "",
        descripcion: "",
        tipo: "",
        email: "",
        password: "",
        departamento:"",
        municipio:"",
        zona:"",
        imagenes:""
    })


    // const enviarDocumento = () => {
    //     console.log('entre enviar documento')
    //     if (empresa.imagenes) {
    //       const reader = new FileReader();
    //       reader.onload = (event) => {
    //         console.log('entre a onload')
    //         const base64String = event.target.result;
    //         console.log(base64String)
    //         setEmpresa({ ...empresa, imagenes:base64String })

    //       };
    //       reader.readAsDataURL(empresa.imagenes);
    //     }
    //   };
    

    const handleSubmit = async (e) => {

        e.preventDefault()
        const formData = new FormData();
        formData.append("nombre",empresa.nombre);
        formData.append("descripcion",empresa.descripcion);
        formData.append("tipo",empresa.tipo);
        formData.append("email",empresa.email);
        formData.append("password",empresa.password);
        formData.append("departamento",empresa.departamento);
        formData.append("municipio",empresa.municipio);
        formData.append("zona",empresa.zona);
        formData.append("imagenes",empresa.imagenes);

        
        const endpoint = await fetch(ruta_AWS+'/registroEmpresa', {
            method: "POST",
            body:formData
        });

        // const endpoint = await fetch(ruta_AWS+'/registroEmpresa', {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //       },body: JSON.stringify({
        //                 "nombre": empresa.nombre,
        //                 "descripcion": empresa.descripcion,
        //                 "email": empresa.email,
        //                 "departamento": empresa.departamento,
        //                 "municipio": empresa.municipio,
        //                 "tipo": empresa.tipo,
        //                 "password": empresa.password,
        //                 "zona":empresa.zona,
        //                 "imagenes": empresa.imagenes,
        //         })
              
        //     //   body: JSON.stringify(empresa)
        // });

 
        const resp = await endpoint.json();
        if (endpoint.status === 400 || endpoint.status === 500){
            setError(resp.message);
        }
        else{ 
            console.log('---base64---')
            console.log(empresa.imagenes)
            setError(null);
            alert("¡Registrado correctamente!")
            handleNavigate()
        }
        
    };



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
                            <input onChange={(e) => setEmpresa({ ...empresa, nombre:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>
                        <div class="element">
                            <label for="label">Descripcion</label>
                            <input onChange={(e) => setEmpresa({ ...empresa, descripcion:e.target.value })}  type="text" name="usuario" id="Usuario"></input>
                        </div>

                        <div class="element">
                        <label for="lang">Categoria</label>
                        <select onChange={(e) => setEmpresa({ ...empresa, tipo:e.target.value })} name="categoria" id="lang">
                            <option value="0">--Seleccione--</option>
                            <option value="1">Restaurante</option>
                            <option value="2">Tienda de convivencia</option>
                            <option value="3">Supermercado</option>
                        </select>
                        </div>
                        <div class="element">
                            <label for="label">Email</label>
                            <input onChange={(e) => setEmpresa({ ...empresa, email:e.target.value })}  type="text" name="email" id="Email"></input>
                        </div>
                        <div class="element">
                            <label for="label">Password</label>
                            <input onChange={(e) => setEmpresa({ ...empresa, password:e.target.value })}  type="password" name="password" id="Password"></input>
                        </div>
                        <div class="element">
                            <label for="label">Departamento</label>
                            <input onChange={(e) => setEmpresa({ ...empresa, departamento:e.target.value })}  type="text" name="depa" id="Depa"></input>
                        </div>
                        <div class="element">
                            <label for="label">Municipio</label>
                            <input onChange={(e) => setEmpresa({ ...empresa, municipio:e.target.value })}  type="text" name="c_password" id="Muni"></input>
                        </div>
                        <div class="element">
                            <label for="label">Zona</label>
                            <input onChange={(e) => setEmpresa({ ...empresa, zona:e.target.value })}  type="text" name="c_password" id="Zona"></input>
                        </div>
                        <div class="element">
                            <label for="curriculum">Documentos</label>
                            <input onChange={(e) => setEmpresa({ ...empresa, imagenes:e.target.files[0] }) } type="file" name="f_Perfil" id="fo_Perfil"></input>
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



//onChange={(e) => setEmpresa({ ...empresa, imagenes:e.target.files[0] }) }