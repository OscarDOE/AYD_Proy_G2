import React,{useContext,useState,useEffect} from 'react'
import '../styles/sHomeAdmin.css'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from "@mui/material";
import { TrendingUpOutlined } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
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


const CombosEmpresa = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const ruta_AWS = 'http://localhost:4000'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');

    const [rows,setRows] = useState([]);
    const [rows_repartis,setRowsRepartis] = useState([]);
    const [datosperfil, setDatosperfil] = useState([]);


    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'descripcion', headerName: 'Descripcion', width: 180 },
        { field: 'tipoProducto', headerName: 'Tipo de Producto', width: 130, sortable: true },
        { field: 'precio', headerName: 'Precio', width: 130 },
        { field: 'imagen', headerName: 'Imagen', width: 130 },
        {
            field: "acceptButton",
            headerName: "Editar",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
              return (
                <Button
                  color="success"
                  onClick={(e) => onAcceptClickEmp(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Editar
                </Button>
              );
            }
          },
          {
            field: "denyButton",
            headerName: "Eliminar",
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
                  Eliminar
                </Button>
              );
            }
          },
      ];


      const onAcceptClickEmp = async (e,row) =>{ //CAMBIO ESTADO DE EMPRESAS-----------------------------


      };

      const onDenyClickEmp = async (e,row) =>{ //CAMBIO ESTADO DE EMPRESAS-----------------------------


      };


    // useEffect(() => {getDatosRepartidor()}, [] );

    // const getDatosRepartidor = async () =>{

    //   const endpoint = await fetch(ruta_AWS+'/miPerfil', {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },body: JSON.stringify({"token":usuario_logeado.token})
    //   });
    //   const resp_get = await endpoint.json();
    //   console.log(resp_get[0])
    //   setDatosperfil(resp_get[0])
    // }
    



    return (
        

      <Box sx={{ flexGrow: 1 }}> 
        <div>       


            <br></br>
            <div class="pCuadradoR2">
              <center><h2>Productos</h2></center>
              <center>  <Stack spacing={2} direction="row">
            <Button variant="contained">Agregar Item</Button>
            </Stack></center>
            <div class = "tablecontainer45">
                <div style={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row.usuario_id}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                    {/* clickedRow: {clickedRow ? `${clickedRow.id}` : null} */}
                </div>
            </div>
            

            </div>



        </div>
        </Box>
    )
}

export default CombosEmpresa