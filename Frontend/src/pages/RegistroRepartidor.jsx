import React, { repartidoref,useState } from 'react'
import '../styles/sRegistroRepartidor.css'
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Android } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { Alert } from '@mui/material';

const RegistroRepartidor = () => {

    const navigate = useNavigate();
    const ruta_AWS = 'http://localhost:4000'

    const handleNavigate = () => {
        navigate("/loginrepartidor");
    };


    const [value, setValue] = useState(false);
    const [error, setError] = useState(null);
    // const handleChangeSwitch = (event) =>{
    //     console.log('----------')
    //     console.log(value)
        
    //     //setValue(event.target.checked)
        
    //     //console.log(value)
    // }



    const [repartidor, setRepartidor] = useState({
        nombres: "",
        apellidos: "",
        correo: "",
        telefono: "",
        departamento: "",
        municipio:"",
        transporte: "",
        hoja_vida: "",
        licencia: "",
        nit: "",
        password:""
    })

    const handleSubmit = async (e) => {

        e.preventDefault()
        // const formData = new FormData();
        // formData.append("nombre",repartidor.nombre);
        // formData.append("usuario",repartidor.usuario);
        // formData.append("foto_perfil",repartidor.foto_perfil);
        // formData.append("email",repartidor.email);
        // formData.append("password",repartidor.password);
        // formData.append("pass_confirm",repartidor.pass_confirm);

        // const endpoint = await fetch(ruta_AWS+'/api/repartidors/registro', {
        //     method: "POST",
        //     body:formData
        // });

        const endpoint = await fetch(ruta_AWS+'/registroRepar', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(repartidor)
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
                            <img src="https://static.vecteezy.com/system/resources/previews/012/665/408/original/delivery-and-courier-motorbike-logo-free-vector.jpg" alt="" />
                        </div>
                        <div class="header">
                            Completa tu informacion
                        </div>
                        <div class="element">
                            <label for="repartidorname">Nombre</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, nombres:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>
                        <div class="element">
                            <label for="password">Apellido</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, apellidos:e.target.value })}  type="text" name="usuario" id="Usuario"></input>
                        </div>
                        <div class="element">
                            <label for="password">Email</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, correo:e.target.value })}  type="text" name="email" id="Email"></input>
                        </div>
                        <div class="element">
                            <label for="label">Password</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, password:e.target.value })}  type="password" name="password" id="Password"></input>
                        </div>
                        <div class="element">
                            <label for="password">Departamento</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, departamento:e.target.value })}  type="text" name="password" id="Password"></input>
                        </div>
                        <div class="element">
                            <label for="password">Municipio</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, municipio:e.target.value })}  type="text" name="c_password" id="C_password"></input>
                        </div>
                        <div class="element">
                            <label for="password">Telefono</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, telefono:e.target.value })}  type="text" name="c_password" id="Telefono"></input>
                        </div>
                        <div class="element">
                            <label for="password">NIT</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, nit:e.target.value })}  type="text" name="c_password" id="Nit"></input>
                        </div>
                        <div class="element">
                        <label for="lang">Tipo de licencia</label>
                        <select onChange={(e) => setRepartidor({ ...repartidor, licencia:e.target.value })}  name="lenguajes" id="lang">
                            <option value="S">--Seleccione--</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="M">M</option>
                            <option value="NA">NA</option>
                        </select>
                        </div>
                        <div class="element">
                        <label for="lang">Motocicleta propio</label>
                        <select onChange={(e) => setRepartidor({ ...repartidor, transporte:e.target.value })} name="lenguajes" id="lang">
                            <option value="S">--Seleccione--</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                        </div>
                        {/* <div class="element">
                            
                            <FormControlLabel control={<Checkbox  onChange={(event)=>setValue(event.target.checked)} />} label="Motocicleta propia" />
                            
                        </div> */}
                        <div class="element">
                            <label for="curriculum">CV</label>
                            <input  type="file" name="f_Perfil" id="fo_Perfil"></input>
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

export default RegistroRepartidor


// onChange={(e) => setRepartidor({ ...repartidor, hoja_vida:e.target.files[0] })}