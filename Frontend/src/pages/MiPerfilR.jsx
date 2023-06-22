import React,{useContext,useState,useEffect} from 'react'
import '../styles/sHomeAdmin.css'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from "@mui/material";
import { TrendingUpOutlined } from '@mui/icons-material';
//import AppEnvr from '../enviroment/AppEnvr';

const PerfilRepartidor = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const ruta_AWS = ''
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    const link_image = usuario_logeado?.usuario_logeado.foto_perfil


    const [datosperfil, setDatosperfil] = useState([]);


    useEffect(() => {

      fetch(ruta_AWS+'api/getperfil')
      

    }, [])


    const [servicio, setServicio] = useState({
        // id_servicio_solicitado: "",
        // id_turista: usuario_logeado.usuario_logeado.id,
        // tipo_servicio:"",
        // solicitante:usuario_logeado.usuario_logeado.usuario,
        estado_solicitud: false
    })
    



    return (
        


        <div>             
            <div>
              <h1><center>Bienvenido {}</center></h1>
              <div >
                <h3 style={{color : "blue", marginBottom:'5px'}}>Nombres : {}</h3>
                <h3 style={{color : "blue", marginBottom:'5px'}}>Apellidos : {}</h3>
                <h3 style={{color : "blue", marginBottom:'5px'}}>Email : {}</h3>
                <h3 style={{color : "blue", marginBottom:'5px'}}>Departamento : {}</h3>
                <h3 style={{color : "blue", marginBottom:'5px'}}>Municipio : {}</h3>
                <h3 style={{color : "blue", marginBottom:'5px'}}>Zona : {}</h3>
                <h3 style={{color : "blue", marginBottom:'5px'}}>Tiene Transporte Propio : {}</h3>
                <h3 style={{color : "blue", marginBottom:'5px'}}>Teléfono : {}</h3>
                <h3 style={{color : "blue", marginBottom:'5px'}}>Hoja de Vida : {}</h3>
                <h3 style={{color : "blue", marginBottom:'5px'}}>NIT : {}</h3>
                <h3 style={{color : "blue", marginBottom:'5px'}}>Calificación : {}</h3>
              </div>
            </div>
        </div>
    )
}

export default PerfilRepartidor