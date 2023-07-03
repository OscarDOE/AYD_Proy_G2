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


const InformeUsers = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const ruta_AWS = 'http://ec2-54-226-103-240.compute-1.amazonaws.com'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');


    const columns = [
        { field: 'usuario_id', headerName: 'ID', width: 70 },
        { field: 'usuario', headerName: 'Usuario', width: 130 },
        { field: 'password', headerName: 'Password', width: 130 }
    ];

    const [rows,setRows] = useState([]);
    const [total,setTotal] = useState([]);



    useEffect(() => {getDatosUsuarios()}, [] );
    useEffect(() => {getTotalUsuarios()}, [] );

    const getDatosUsuarios = async () =>{

      const endpoint = await fetch(ruta_AWS+'/informeUser', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify({"token":usuario_logeado.token})
      });
      const resp_get = await endpoint.json();
      setRows(resp_get)
      console.log(resp_get)
    }

    const getTotalUsuarios = async () =>{

        const endpoint = await fetch(ruta_AWS+'/totalUser', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        console.log(resp_get)
        setTotal(resp_get[0].total)
      }
    



    return (
        

      <Box sx={{ flexGrow: 1 }}> 
        <div>       
          {usuario_logeado?.rol === "1" ? 
          <>   {/* parte inicial del ternario */} 

            <br></br>
            <Grid container justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6} >
                <Item><h1><center>Informe de usuarios</center></h1> </Item>
                </Grid>
            </Grid><br></br>
            <Grid container justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>                

                <Grid item xs={5} >
                    <Item>
                    <div style={{ height: 400, width: '100%' }}>
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

                <Grid item xs={5} >
                    <Item>
                    <h2>Total de usuarios</h2>
                    <Typography variant="h2">{total}</Typography>
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

export default InformeUsers