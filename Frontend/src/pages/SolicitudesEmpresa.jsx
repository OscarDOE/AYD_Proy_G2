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



const SolicitudesEmpresa = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const ruta_AWS = 'http://localhost:4000'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    // const link_image = usuario_logeado?.usuario_logeado.foto_perfil

    const [clickedRow, setClickedRow] = useState();
    const [rows,setRows] = useState([]);
    const [rows_repartis,setRowsRepartis] = useState([]);
    const [rows_clientes,setRowsClientes] = useState([]);


    const [servicio, setServicio] = useState({
        // id_servicio_solicitado: "",
        // id_turista: usuario_logeado.usuario_logeado.id,
        // tipo_servicio:"",
        // solicitante:usuario_logeado.usuario_logeado.usuario,
        estado_solicitud: false
    })

    useEffect(() => {getDatosEmpresas()}, [] );






      const columns_empresas = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fecha_salida', headerName: 'Fecha Salida', width: 200, sortable: true },
        { field: 'precio_total', headerName: 'Total', width: 170 },
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


      


      const getDatosEmpresas = async () =>{
        const endpoint = await fetch(ruta_AWS+'/solicitudPed', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        console.log(JSON.stringify(resp_get))
        setRows(resp_get)
        console.log(resp_get)


  
      }




      //-------------------------------- CAMBIOS ESTADO USUARIOS ------------


      const onAcceptClickUser = async (e,row) =>{ //CAMBIO ESTADO DE USUARIOS-----------------------------
        e.preventDefault();
        setClickedRow(row);

        const endpoint = await fetch(ruta_AWS+`/respuestaPed`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token,"idped":row.id})
        });

        if (endpoint.status != 400){
          alert("¡Pedido " + row.id + " | " + row.fecha_salida + " aceptado!")
        }
        getDatosEmpresas()
      };







    return (
        

        <Box sx={{ flexGrow: 1 }}>
            <div>
                {usuario_logeado?.rol === "4" ?
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
                            <Grid item xs={5} >
                                <Item>
                                <h3>Pedidos</h3>
                                <div style={{ height: 400 }} >
                                    <DataGrid
                                        rows={rows}
                                        columns={columns_empresas}
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

export default SolicitudesEmpresa