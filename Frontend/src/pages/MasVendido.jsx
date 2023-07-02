import React,{useContext,useState,useEffect} from 'react'
import '../styles/sHomeAdmin.css'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import { TrendingUpOutlined } from '@mui/icons-material';
//import AppEnvr from '../enviroment/AppEnvr';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  }));



const MasVendido = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const ruta_AWS = 'http://localhost:4000'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    // const link_image = usuario_logeado?.usuario_logeado.foto_perfil

    const [clickedRow, setClickedRow] = useState();
    const [rows,setRows] = useState([]);
    const [pedidoSelected,setPedidoSelected] = useState([]);
    const [puntaje,setPuntaje] = useState([]);

    const [rows_repartis,setRowsRepartis] = useState([]);
    const [rows_clientes,setRowsClientes] = useState([]);


    const [servicio, setServicio] = useState({
        // id_servicio_solicitado: "",
        // id_turista: usuario_logeado.usuario_logeado.id,
        // tipo_servicio:"",
        // solicitante:usuario_logeado.usuario_logeado.usuario,
        estado_solicitud: false
    })

    useEffect(() => {getDatosPedidos()}, [] );


      const getDatosPedidos = async () =>{
        const endpoint = await fetch(ruta_AWS+'/masVendido', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        setRows(resp_get[0])
        console.log(resp_get);

      }




    return (
        

        <Box sx={{ flexGrow: 1 }}>
            <div>
                {usuario_logeado?.rol === "4" ?
                    <>
                        <br></br>
                        <Grid container justifyContent="center" >
                            <Grid item xs={6} >
                                <Item>
                                    <center><h1>Producto mas vendido</h1></center>

                                </Item>
                            </Grid>
                        </Grid>
                        <br></br>


                        <Grid container justifyContent="center" >
                            <Grid item xs={4} >
                                <Item>
                                <h3>{rows.nombre}</h3>
                                </Item>
                                <br />
                                <Item>
                                <h3>{rows.total_vendidos}</h3>
                                </Item>
                            </Grid>
                        </Grid>



                        {/* -------------- termina ternario ------------------- */}
                    </>
                    :
                    <>
                        <center><h1>¡Cuidado! Aqui solo empresas </h1></center>
                    </>}

            </div>
        </Box>
    )
}

export default MasVendido