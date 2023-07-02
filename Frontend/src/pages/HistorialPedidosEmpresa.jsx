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



const HistorialPedidoEmpresa = () => {
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






      const columns_historial = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fecha_salida', headerName: 'Fecha salida', width: 170 }, 
        { field: 'precio_total', headerName: 'Total', width: 100 },
      ];


      


      const getDatosPedidos = async () =>{
        const endpoint = await fetch(ruta_AWS+'/historialP', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        setRows(resp_get)

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
                                    <center><h1>Historial de pedidos despachados</h1></center>

                                </Item>
                            </Grid>
                        </Grid>
                        <br></br>


                        <Grid container justifyContent="center" >
                            <Grid item xs={4} >
                                <Item>
                                <h3>Pedidos</h3>
                                <div style={{ height: 400 }} >
                                    <DataGrid
                                        rows={rows}
                                        columns={columns_historial}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
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

export default HistorialPedidoEmpresa