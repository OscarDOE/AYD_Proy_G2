import React,{useContext,useState,useEffect} from 'react'
import '../styles/sHomeAdmin.css'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from "@mui/material";
import { TrendingUpOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
//import AppEnvr from '../enviroment/AppEnvr';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));


const ReportesAdmin = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const ruta_AWS = 'http://ec2-54-226-103-240.compute-1.amazonaws.com'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');

    const [dataEmpresas, setDataEmpresas] = useState([]);
    const [dataProductos, setDataProductos] = useState([]);
    const [dataDelivers, setDataDelivers] = useState([]);

    




    const columnsEmpresas = [
        { field: 'usuario_id', headerName: 'ID', width: 120 },
        { field: 'pedidos', headerName: 'Cantidad de pedidos', width: 150 }
    ];

    const columnsProductos = [
        { field: 'nombre', headerName: 'Nombre producto', width: 170 },
        { field: 'pedido', headerName: 'Cantidad de pedidos', width: 150 }
    ];

    const columnsDelivers = [
        { field: 'nombres', headerName: 'Nombre', width: 130 },
        { field: 'apellidos', headerName: 'Apellidos', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'departamento', headerName: 'Departamento', width: 130 },
        { field: 'calificacion', headerName: 'Calificacion', width: 130 }
    ];



    useEffect(() => {getDatosEmpresas()}, [] );
    useEffect(() => {getDatosProductos()}, [] );
    useEffect(() => {getDatosDelivers()}, [] );

    const getDatosEmpresas = async () =>{

      const endpoint = await fetch(ruta_AWS+'/top5Empresas', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify({"token":usuario_logeado.token})
      });
      const resp_get = await endpoint.json();
      setDataEmpresas(resp_get)
    }

    const getDatosProductos = async () =>{

        const endpoint = await fetch(ruta_AWS+'/top5Productos', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        setDataProductos(resp_get)
    }

    const getDatosDelivers = async () =>{

        const endpoint = await fetch(ruta_AWS+'/top5Deliverys', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        setDataDelivers(resp_get)
    }


    



    return (
        

      <Box sx={{ flexGrow: 1 }}> 
        <div>       
          {usuario_logeado?.rol === "1" ? 
          <>   {/* parte inicial del ternario */} 

            <br></br>
            <Grid container justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6} >
                <Item><h1><center>Reportes</center></h1> </Item>
                </Grid>
            </Grid><br></br>
            <Grid container justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>                


                <Grid item xs={3.5} >
                    <Item>
                    <h2>TOP 5 empresas que más generan</h2>

                    <div style={{ height: 400 }} >
                    <DataGrid
                        getRowId={(row) => row.usuario_id}
                        rows={dataEmpresas}
                        columns={columnsEmpresas}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                    {/* clickedRow: {clickedRow ? `${clickedRow.id}` : null} */}
                    </div>

                    


                    </Item>
                </Grid>

                <Grid item xs={3.5} >
                    <Item>
                    <h2>Productos más vendidos</h2>

                    <div style={{ height: 400 }} >
                    <DataGrid
                        getRowId={(row) => row.id}
                        rows={dataProductos}
                        columns={columnsProductos}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                    </div>
                    
                    
                    </Item>
                </Grid>

                <Grid item xs={4} >
                    <Item>
                    <h2>Top 5 de los mejores delivery</h2>

                    <div style={{ height: 400 }} >
                    <DataGrid
                        getRowId={(row) => row.email}
                        rows={dataDelivers}
                        columns={columnsDelivers}
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

export default ReportesAdmin