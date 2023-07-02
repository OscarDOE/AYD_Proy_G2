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
import PaymentIcon from '@mui/icons-material/Payment';
import TextField from '@mui/material/TextField';
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
    console.log(usuario_logeado)

    const [dataEmpresas, setDataEmpresas] = useState([]);
    const [dataDireccion, setDataDireccion] = useState([]);
    const [dataTarjeta, setDataTarjeta] = useState([]);
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [carritoSubTotal, setCarritoSubTotal] = useState([]);
    const [total, setTotal] = useState([]);
    const [clickedRow, setClickedRow] = useState();
    const [tarjeta, setTarjeta] = useState('');
    const [direccion, setDireccion] = useState('');
    const [cupon, setCupon] = useState('');

    




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
        { field: 'departamento', headerName: 'Departamento', width: 170 },
        { field: 'municipio', headerName: 'Municipio', width: 150 },
        { field: 'zona', headerName: 'Zona', width: 75 },
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
                  onClick={(e) => onAcceptClickDir(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Seleccionar
                </Button>
              );
            }
          }
    ];

    const columnsDelivers = [
        // { field: 'id', headerName: 'ID', width: 130 },
        { field: 'numero', headerName: 'Numero', width: 130 },
        { field: 'fecha_terminacion', headerName: 'Fecha exp', width: 130 },
        { field: 'cvv', headerName: 'CVV', width: 75 },
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
                  onClick={(e) => onAcceptClickTar(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Seleccionar
                </Button>
              );
            }
          }
    ];

    const onAcceptClickTar = async (e,row) =>{ 
        e.preventDefault();
        setClickedRow(row);
        setTarjeta(row)
      };

      const onAcceptClickDir = async (e,row) =>{ 
        e.preventDefault();
        setClickedRow(row);
        setDireccion(row)
      };
    


    const getCarritoCookies = () =>{
        setProductosCarrito(cookies.get('carrito'))
        var productosCarritoFiltrados = cookies.get('carrito').filter(function(producto) {
            return producto.cantidad > 0;
          });
        const varcarritoSubTotal = productosCarritoFiltrados.map(producto => {
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

    const enviarPedido = async () =>{
        const endpoint = await fetch(ruta_AWS+'/pedir', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify({
                "token":usuario_logeado.token,
                "dir": direccion.id,
                "tar":tarjeta.id,
                "cupon":cupon,
                "productos":carritoSubTotal,
                "total":total
            })
          });
          const resp_get = await endpoint.json();
          console.log(resp_get)   
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
                            <Grid item xs={2}>
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


                            <Grid item xs={5.5} >
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

                                </Item>
                            </Grid>
                            <Grid item xs={2} >
                                <Item>
                                    <h3>Direccion:</h3>
                                    <h4>{direccion.departamento} </h4>
                                    <h4>{direccion.municipio}, </h4>
                                    <h4>zona {direccion.zona} </h4>
                                    <h3>Tarjeta:</h3>
                                    <h4>{tarjeta.numero}</h4>
                                </Item>
                                <br></br>
                                <Item>
                                {usuario_logeado?.cupon === 0 ? 
                                <>
                                    <h3>Cupon no disponible</h3>
                                    {setCupon('')}
                                </> 
                                : 
                                <>
                                    <TextField onChange={(e) => setCupon( e.target.value)} id="outlined-basic" label="Cupon" variant="outlined" />

                                </>}  
                                </Item>
                                <br></br>
                                <Item>
                                    <h2>Total: {total}</h2>
                                </Item>
                                <br></br>

                                <Item>
                                    <Button onClick={enviarPedido} variant="contained" color="success" >
                                        Enviar pedido
                                        <PaymentIcon />
                                    </Button>
                                </Item>

                            </Grid>

                        


                        </Grid>
                        <br></br>
                        <Grid container justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={5} >
                                <Item>
                                    <h2>Selecciona tu direccion</h2>

                                    <div style={{ height: 400 }} >
                                        <DataGrid
                                            rows={dataDireccion}
                                            columns={columnsProductos}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                        />
                                    </div>


                                </Item>
                            </Grid>

                            <Grid item xs={4.5} >
                                <Item>
                                    <h2>Selecciona tu tarjeta</h2>

                                    <div style={{ height: 400 }} >
                                        <DataGrid
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