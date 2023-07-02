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



const HistorialPedido = () => {
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
        { field: 'repartidor_usuario_id', headerName: 'Repartidor', width: 100, sortable: true },
        { field: 'estado_pedido_id', headerName: 'Estado pedido', width: 100 },
        { field: 'direcciones_cliente_id', headerName: 'Direccion', width: 100 },
        { field: 'detalle_tarjeta_id', headerName: 'Tarjeta', width: 100 },
        { field: 'fecha_llegada', headerName: 'Fecha llegada', width: 170 },
        { field: 'fecha_salida', headerName: 'Fecha salida', width: 170 }, 
        { field: 'calificacion', headerName: 'Calificacion', width: 100 },
        { field: 'precio_total', headerName: 'Total', width: 100 },
      ];


      


      const getDatosPedidos = async () =>{
        const endpoint = await fetch(ruta_AWS+'/historialUser', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        setRows(resp_get)

      }

      const calificarPedido = async () =>{
        const endpoint = await fetch(ruta_AWS+'/calificacion', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify({
                "token":usuario_logeado.token,
                "idped":pedidoSelected,
                "cali":puntaje
            })
          });
          const resp_get = await endpoint.json();
          if (endpoint.status != 400){
            alert("¡Pedido " + pedidoSelected + " | " + puntaje + " calificado!")
          }else{
              alert("Calificacion " + pedidoSelected + " | " + puntaje + " con problemas!")
          }
          getDatosPedidos()
      }



    return (
        

        <Box sx={{ flexGrow: 1 }}>
            <div>
                {usuario_logeado?.rol === "2" ?
                    <>
                        <br></br>
                        <Grid container justifyContent="center" >
                            <Grid item xs={6} >
                                <Item>
                                    <center><h1>Historial de pedidos</h1></center>

                                </Item>
                            </Grid>
                        </Grid>
                        <br></br>


                        <Grid container justifyContent="center" >
                            <Grid item xs={5} >
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
                            <Grid item xs={3} sx={{ margin: 2,}} >
                                <Item>
                                    <h2>Calificar pedidos</h2>
                                    <br></br>
                                    <h3>Escoge pedido</h3>
                                    <select
                                        style={{
                                            'width': '100%',
                                            'font-size': ' 15px',
                                            'height': '30px',
                                            'padding': '5px'
                                        }}
                                        name="lenguajes" id="lang1"
                                        onChange={(e) => setPedidoSelected(e.target.value)}>
                                        {/* onChange={(e)=>(sendCategoria(e.target.value))} */}
                                        <option value="0">--Seleccione--</option>
                                        {
                                            rows.map(opt => <option>{opt.id}</option>)
                                        }
                                    </select>
                                    
                                    <h3>Escoge calificacion</h3>
                                    <select 
                                    style={{
                                        'width': '100%',
                                        'font-size': ' 15px',
                                        'height': '30px',
                                        'padding': '5px'
                                    }}
                                    onChange={(e) => setPuntaje(e.target.value)} name="categoria" id="lang">
                                        <option value="0">--Seleccione--</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    
                
                                    <Button sx={{ marginTop: 2,}} onClick={calificarPedido} variant="contained">
                                Calificar
                            </Button>
                                </Item>
                            </Grid>
                        </Grid>



                        {/* -------------- termina ternario ------------------- */}
                    </>
                    :
                    <>
                        <center><h1>¡Cuidado! Aqui solo usuarios </h1></center>
                    </>}

            </div>
        </Box>
    )
}

export default HistorialPedido