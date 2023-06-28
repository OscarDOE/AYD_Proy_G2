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



const DesactivarAdmin = () => {
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
    useEffect(() => {getDatosRepartis()}, [] );
    useEffect(() => {getDatosCliente()}, [] );



    const columns = [
        { field: 'usuario_id', headerName: 'ID', width: 70 },
        { field: 'nombre', headerName: 'Nombre', width: 200 },
        { field: 'email', headerName: 'Email', width: 200, sortable: true },
          {
            field: "denyButton",
            headerName: "Actions",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
              return (
                <Button
                  color="error"
                  onClick={(e) => onDenyClickEmp(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Desactivar
                </Button>
              );
            }
          },
      ];

      const columns_repartidor = [
        { field: 'usuario_id', headerName: 'ID', width: 70 },
        { field: 'nombres', headerName: 'Nombres', width: 200 },
        { field: 'email', headerName: 'Email', width: 200, sortable: true },
          {
            field: "denyButton",
            headerName: "Actions",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
              return (
                <Button
                  color="error"
                  onClick={(e) => onDenyClickRep(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Desactivar
                </Button>
              );
            }
          },
      ];


      const columns_cliente = [
        { field: 'usuario_id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'User', width: 170 },
        { field: 'password', headerName: 'Password', width: 200, sortable: true },
          {
            field: "denyButton",
            headerName: "Actions",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
              return (
                <Button
                  color="error"
                  onClick={(e) => onDenyClickUser(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Desactivar
                </Button>
              );
            }
          },
      ];


      


      const getDatosEmpresas = async () =>{
        const endpoint = await fetch(ruta_AWS+'/desactivarEmpr', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        console.log(JSON.stringify(resp_get))
        setRows(resp_get)
        console.log(resp_get)

        // const endpoint_get = await fetch(ruta_AWS+'/solicitudEmp', {
        //     method: "GET"
        // });
  
      }



      const getDatosRepartis = async () =>{
        const endpoint = await fetch(ruta_AWS+'/desactivarRepr', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        setRowsRepartis(resp_get)

        
      }


      const getDatosCliente = async () =>{
        const endpoint = await fetch(ruta_AWS+'/desactivarUser', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        setRowsClientes(resp_get)
      }



      const onDenyClickEmp = async (e,row) =>{ //CAMBIO ESTADO DE EMPRESAS-----------------------------
        e.preventDefault();
        setClickedRow(row);
        const formdata = new FormData();
        formdata.append("estado_solicitud",false);
      

        const endpoint = await fetch(ruta_AWS+`/resDesactivarE`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"resp":"0","token":usuario_logeado.token,"idUser":row.usuario_id})
        });
        if (endpoint.status != 400){
          alert("¡Empresa " + row.usuario_id + " | " + row.nombre + " deshabilitada!")
        }

        getDatosEmpresas()
      };



      //-------------------------------- CAMBIOS ESTADO REPARTIDORES ------------


      const onDenyClickRep = async (e,row) =>{ //CAMBIO ESTADO DE REPARTIDORES-----------------------------
        e.preventDefault();
        setClickedRow(row);
        const formdata = new FormData();
        formdata.append("estado_solicitud",false);
      

        const endpoint = await fetch(ruta_AWS+`/resDesactivarR`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"resp":"0","token":usuario_logeado.token,"idUser":row.usuario_id})
        });

        if (endpoint.status != 400){
          alert("¡Repartidor " + row.usuario_id + " | " + row.nombres + " deshabilitado!")
        }
        getDatosRepartis()
      };


      //-------------------------------- CAMBIOS ESTADO USUARIOS ------------


      const onDenyClickUser = async (e,row) =>{ //CAMBIO ESTADO DE USUARIOS-----------------------------
        e.preventDefault();
        setClickedRow(row);
        const formdata = new FormData();
        formdata.append("estado_solicitud",false);
      

        const endpoint = await fetch(ruta_AWS+`/resDesactivarU`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"resp":"0","token":usuario_logeado.token,"idUser":row.usuario_id})
        });

        if (endpoint.status != 400){
          alert("¡Cliente " + row.usuario_id + " | " + row.nombres + " deshabilitado!")
        }
        getDatosCliente()
      };







    return (
        

        <Box sx={{ flexGrow: 1 }}>
            <div>
                {usuario_logeado?.rol === "1" ?
                    <>
                        <br></br>
                        <Grid container justifyContent="center" >
                            <Grid item xs={6} >
                                <Item>
                                    <center><h1>Deshabilitar usuarios</h1></center>

                                </Item>
                            </Grid>
                        </Grid>
                        <br></br>

                        <Grid container justifyContent="center" >
                            <Grid item xs={5.5} >
                                <Item > 
                                <h3>Empresas</h3>
                                <div style={{ height: 400 }} >
                                    <DataGrid
                                        getRowId={(row) => row.usuario_id}
                                        rows={rows}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
                                </Item>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container justifyContent="center" >
                            <Grid item xs={5.5} >
                                <Item>
                                <h3>Repartidores</h3>
                                <div style={{ height: 400 }} >
                                    <DataGrid
                                        getRowId={(row) => row.usuario_id}
                                        rows={rows_repartis}
                                        columns={columns_repartidor}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
                                </Item>
                            </Grid>

                        </Grid>
                        <br />

                        <Grid container justifyContent="center" >
                            <Grid item xs={5.5} >
                                <Item>
                                <h3>Clientes</h3>
                                <div style={{ height: 400 }} >
                                    <DataGrid
                                        getRowId={(row) => row.usuario_id}
                                        rows={rows_clientes}
                                        columns={columns_cliente}
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
                        <center><h1>¡Cuidado! Aqui solo admins </h1></center>
                    </>}

            </div>
        </Box>
    )
}

export default DesactivarAdmin