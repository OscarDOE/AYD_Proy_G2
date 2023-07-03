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



const PedidosRepartidor = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const ruta_AWS = 'http://localhost:4000'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    // const link_image = usuario_logeado?.usuario_logeado.foto_perfil

    const [clickedRow, setClickedRow] = useState();
    const [rows,setRows] = useState([]);
    const [actual,setActual] = useState([]);
    const [rows_repartis,setRowsRepartis] = useState([]);
    const [rows_clientes,setRowsClientes] = useState([]);


    const [servicio, setServicio] = useState({
        // id_servicio_solicitado: "",
        // id_turista: usuario_logeado.usuario_logeado.id,
        // tipo_servicio:"",
        // solicitante:usuario_logeado.usuario_logeado.usuario,
        estado_solicitud: false
    })

    useEffect(() => {getDatosRepartidor()}, [] );
    useEffect(() => {getPedidosActuales()}, [] );






      const columns_pedidos_repartidor = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fecha_salida', headerName: 'Fecha Salida', width: 200, sortable: true },
        { field: 'precio_total', headerName: 'Total', width: 170 },
        { field: 'departamento', headerName: 'Departamento', width: 170 },
        { field: 'municipio', headerName: 'Municipio', width: 170 },
        { field: 'zona', headerName: 'Zona', width: 100 },
          {
            field: "acceptButton",
            headerName: "",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
              return (
                <Button
                  color="success"
                  onClick={(e) => onAcceptClickUser(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Aceptar
                </Button>
              );
            }
          },
      ];

      const columns_pedido_actual = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'cliente_usuario_id', headerName: 'Cliente', width: 100, sortable: true },
        { field: 'estado_pedido_id', headerName: 'Estado pedido', width: 100 },
        { field: 'direcciones_cliente_id', headerName: 'Direccion', width: 100 },
        { field: 'detalle_tarjeta_id', headerName: 'Tarjeta', width: 100 },
        { field: 'fecha_llegada', headerName: 'Fecha llegada', width: 170 },
        { field: 'fecha_salida', headerName: 'Fecha salida', width: 170 }, 
        { field: 'calificacion', headerName: 'Calificacion', width: 100 },
        { field: 'precio_total', headerName: 'Total', width: 100 },
        {
            field: "acceptButton",
            headerName: "",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
              return (
                <Button
                  color="success"
                  onClick={(e) => onAcceptClickUser(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Finalizar
                </Button>
              );
            }
          },
      ];


      


      const getDatosRepartidor = async () =>{          //PEDIDOS PENDIENTES ---------------
        const endpoint = await fetch(ruta_AWS+'/verPedidos', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        setRows(resp_get)


      }

      const getPedidosActuales= async () =>{          //PEDIDOS ACTUALES ---------------
        const endpoint = await fetch(ruta_AWS+'/pedidoActual', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        setActual(resp_get)


      }


      //-------------------------------- CAMBIOS ESTADO PEDIDOS ------------


      const onAcceptClickUser = async (e,row) =>{
        e.preventDefault();
        setClickedRow(row);

        const endpoint = await fetch(ruta_AWS+`/finPedido`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });

        if (endpoint.status != 400){
          alert("¡Pedido " + row.id + " | " + row.precio_total + " entregado!")
        }else{
            alert("¡Pedido " + row.id + " | " + row.precio_total + " con problemas!")
        }
        getPedidosActuales()
      };


    return (
        

        <Box sx={{ flexGrow: 1 }}>
            <div>
                {usuario_logeado?.rol === "3" ?
                    <>
                        <br></br>
                        <Grid container justifyContent="center" >
                            <Grid item xs={6} >
                                <Item>
                                    <center><h1>Pedidos Pendientes</h1></center>

                                </Item>
                            </Grid>
                        </Grid>
                        <br></br>


                        <Grid container justifyContent="center" >
                            <Grid item xs={6} >
                                <Item>
                                <h3>Pedidos disponibles</h3>
                                <div style={{ height: 400 }} >
                                    <DataGrid
                                        rows={rows}
                                        columns={columns_pedidos_repartidor}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
                                </Item>
                            </Grid>
                        </Grid>

                        <br></br>
                        <Grid container justifyContent="center" >
                            <Grid item xs={6} >
                                <Item>
                                    <center><h1>Pedidos en curso</h1></center>

                                </Item>
                            </Grid>
                        </Grid>

                        <br></br>
                        <Grid container justifyContent="center" >
                            <Grid item xs={6} >
                                <Item>
                                <h3>En curso</h3>
                                <div style={{ height: 250 }} >
                                    <DataGrid
                                        rows={actual}
                                        columns={columns_pedido_actual}
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
                        <center><h1>¡Cuidado! Aqui solo repartidores </h1></center>
                    </>}

            </div>
        </Box>
    )
}

export default PedidosRepartidor