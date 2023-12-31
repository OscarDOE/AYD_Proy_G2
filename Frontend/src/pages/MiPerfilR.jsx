import React,{useContext,useState,useEffect} from 'react'
import '../styles/sHomeAdmin.css'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from "@mui/material";
import { TrendingUpOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
//import AppEnvr from '../enviroment/AppEnvr';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));


const PerfilRepartidor = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const ruta_AWS = 'http://ec2-54-226-103-240.compute-1.amazonaws.com'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');


    const [datosperfil, setDatosperfil] = useState([]);
    const [comision, setComision] = useState([]);


    useEffect(() => {getDatosRepartidor()}, [] );
    useEffect(() => {getComision()}, [] );

    const getDatosRepartidor = async () =>{

      const endpoint = await fetch(ruta_AWS+'/miPerfil', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify({"token":usuario_logeado.token})
      });
      const resp_get = await endpoint.json();
      setDatosperfil(resp_get[0])
    }

    const getComision= async () =>{

      const endpoint = await fetch(ruta_AWS+'/comision', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify({"token":usuario_logeado.token})
      });
      const resp_get = await endpoint.json();
      setComision(resp_get[0].comisiones)
    }
    



    return (
        

      <Box sx={{ flexGrow: 1 }}> 
        <div>       
          {usuario_logeado?.rol === "3" ? 
          <>   {/* parte inicial del ternario */} 

            <br></br>
            <Grid container justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6} >
                <Item><h1><center>Bienvenido {datosperfil.nombres + " " + datosperfil.apellidos }</center></h1> </Item>
                </Grid>
            </Grid><br></br>
            <Grid container justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                <Grid item xs={6} >
                    <Item>

                        <h3 style={{ marginBottom:'5px'}}>Nombres : {datosperfil.nombres}</h3>
                        <h3 style={{ marginBottom:'5px'}}>Apellidos : {datosperfil.apellidos}</h3>
                        <h3 style={{marginBottom:'5px'}}>Email : {datosperfil.email}</h3>
                        <h3 style={{ marginBottom:'5px'}}>Departamento : {datosperfil.departamento}</h3>
                        <h3 style={{ marginBottom:'5px'}}>Municipio : {datosperfil.municipio}</h3>
                        <h3 style={{ marginBottom:'5px'}}>Zona : {datosperfil.zona}</h3>
                        <h3 style={{ marginBottom:'5px'}}>Tiene Transporte Propio : { datosperfil.transporte == 1 ? <p>Si</p> : <p>No</p> }</h3>
                        <h3 style={{ marginBottom:'5px'}}>Teléfono : {datosperfil.telefono}</h3>
                        {/* <h3 style={{color : "blue", marginBottom:'5px'}}>Hoja de Vida : {}</h3> */}
                        <h3 style={{marginBottom:'5px'}}>NIT : {datosperfil.nit}</h3>
  
                    </Item>
                </Grid>
                
                <Grid item xs={3} >
                    <Item>
                        <h3 style={{ marginBottom:'5px'}}>Calificación </h3>
                        <h1>{datosperfil.calificacion}</h1>
                    </Item>
                    <br></br>
                    <Item>
                        <h3 style={{ marginBottom:'5px'}}>Comisiones </h3>
                        <h1>{comision}</h1>
                    </Item>
                </Grid>
            </Grid>

            {/* -------------- termina ternario ------------------- */}
            </>
            :
            <>
             <center><h1>¡Cuidado! Aqui solo repartidores </h1></center>
            </>}

        </div>
        </Box>
    )
}

export default PerfilRepartidor