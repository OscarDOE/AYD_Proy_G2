import React,{useContext,useState,useEffect} from 'react'
import '../styles/sHomeAdmin.css'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from "@mui/material";
import { TrendingUpOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
//import AppEnvr from '../enviroment/AppEnvr';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));


const Checkout = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const ruta_AWS = 'http://localhost:4000'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');

    const [dataEmpresas, setDataEmpresas] = useState([]);
    const [dataDireccion, setDataDireccion] = useState([]);
    const [dataTarjeta, setDataTarjeta] = useState([]);
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [carritoSubTotal, setCarritoSubTotal] = useState([]);
    const [total, setTotal] = useState([]);

    




    const columnsEmpresas = [
        // { field: 'id', headerName: 'ID', width: 100 },
        { field: 'nombre', headerName: 'Nombre', width: 120 },
        { 
            field: 'imagen', 
            headerName: 'Imagen', 
            width: 130,
            renderCell: (params) => {
                // console.log(params)
                return (
                  <>
                    <Avatar src={params.row.imagen} />  
                    {/* .imagen hace referencia a lo que viene de la respuesta del json cuando se obtienen todos los productos */}
                  </>
                );
              }
        },
        { field: 'precio', headerName: 'Precio', width: 120 },
        { field: 'cantidad', headerName: 'Cantidad', width: 120 },
        { field: 'subtotal', headerName: 'Subtotal', width: 150 }
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


    


    const getCarritoCookies = () =>{
        console.log('---- cookies cheout');
        console.log(cookies.get('carrito'))
        setProductosCarrito(cookies.get('carrito'))
        const varcarritoSubTotal = productosCarrito.map(producto => {
            const subtotal = producto.cantidad * producto.precio;
            return { ...producto, subtotal: subtotal };
          });
        const sumaSubtotales = varcarritoSubTotal.reduce((total, producto) => total + producto.subtotal, 0);
        setCarritoSubTotal(varcarritoSubTotal)
        setTotal(sumaSubtotales)
    }

    const getDirecciones = async () =>{

        const endpoint = await fetch(ruta_AWS+'/direccion', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        setDataDireccion(resp_get)
    }

    const getTarjetas = async () =>{

        const endpoint = await fetch(ruta_AWS+'/tarjeta', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        setDataTarjeta(resp_get)
    }


    useEffect(() => {getCarritoCookies()}, [] );
    useEffect(() => {getDirecciones()}, [] );
    useEffect(() => {getTarjetas()}, [] );



    return (
        

      <Box sx={{ flexGrow: 1 }}> 
        <div>       
          {usuario_logeado?.rol === "2" ? 
          <>   {/* parte inicial del ternario */} 

            <br></br>
            <Grid container justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid  item xs={2}>
                    <Item>
                    <Link to='/carrito'>
                    <Button variant="contained"><ArrowBackIcon />
                                    Volver
                    </Button>
                    </Link>

                    </Item>
                </Grid>
                <Grid item xs={6} >
                <Item><h1><center>Check-out</center></h1>
                <h4><center>Revisa tu pedido</center></h4> </Item>
                </Grid>
                
            </Grid><br></br>
            <Grid container justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>                


                <Grid item xs={3.5} >
                    <Item>
                    <h2>Productos</h2>

                    <div style={{ height: 400 }} >
                    <DataGrid
                        rows={carritoSubTotal}
                        columns={columnsEmpresas}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                    {/* clickedRow: {clickedRow ? `${clickedRow.id}` : null} */}
                    </div>
                    <h2>Total: {total}</h2>
                    


                    </Item>
                </Grid>

                <Grid item xs={3.5} >
                    <Item>
                    <h2>Selecciona tu direccion</h2>

                    <div style={{ height: 400 }} >
                    <DataGrid
                        getRowId={(row) => row.id}
                        rows={dataDireccion}
                        columns={columnsProductos}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                    </div>
                    
                    
                    </Item>
                </Grid>

                <Grid item xs={4} >
                    <Item>
                    <h2>Selecciona tu tarjeta</h2>

                    <div style={{ height: 400 }} >
                    <DataGrid
                        getRowId={(row) => row.email}
                        rows={dataTarjeta}
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
             <center><h1>¡Cuidado! Aqui solo usuarios </h1></center>
            </>}

        </div>
        </Box>
    )
}

export default Checkout