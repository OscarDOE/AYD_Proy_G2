import React, { useContext, useState, useEffect } from 'react'
import Cookies from "universal-cookie"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useHistory } from 'react-router-dom';
import PaymentsIcon from '@mui/icons-material/Payments';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  }));

const ShowCarrito = () => {

    const ruta_AWS = 'http://ec2-54-226-103-240.compute-1.amazonaws.com'
    const cookies = new Cookies();
    const navigate = useNavigate();
    const usuario_logeado = cookies.get('session');
    // console.log('empresa cookies')
    // console.log(cookies.get('empresa_seleccionada'))


    const [productosCarrito, setProductosCarrito] = useState([]);
    const [productos, setProductos] = useState([]);
    const [empresaSelected, setEmpresaSelected] = useState([]);
    const [carrito, setCarrito] = useState([]);

    const getCarritoCookies = async () =>{
        var productosCarritoFiltrados = cookies.get('carrito').filter(function(producto) {
            return producto.cantidad > 0;
          });
        setProductosCarrito(productosCarritoFiltrados)
    }

    const agregarProducto = (producto) => {
        setProductosCarrito(prevProductos => {
          return prevProductos.map(productoCurrent => {
            if (productoCurrent.id === producto.id) {
              return { ...productoCurrent, cantidad: productoCurrent.cantidad + 1 };
            }
            return productoCurrent;
          });
        });    
    }

    

    const eliminarProducto = (producto)=>{
        setProductosCarrito(prevProductos => {
            return prevProductos.map(productoCurrent => {
              if (productoCurrent.id === producto.id) {
                if(productoCurrent.cantidad > 0){
                    return { ...productoCurrent, cantidad: productoCurrent.cantidad - 1 };
                    
                }
              }
              return productoCurrent;
            });
          });
    }

    const volverProductos = () => {
        cookies.set('carrito', productosCarrito)
        navigate("/elegirproductos");
    }

    const handleToCheckout = () => {
        cookies.set('carrito', productosCarrito)
        navigate("/checkout");
    }


    useEffect(() => {getCarritoCookies()}, [] );

    return (
        <Box sx={{ flexGrow: 1,marginTop:5 }} >
            {usuario_logeado?.rol === "2" ? 
          <>


            <Grid container justifyContent="center">

                <Grid item sx={{ marginRight: 2, marginTop: -2 }}>
                    <Item>
                            <Button onClick={volverProductos} variant="contained"><ArrowBackIcon />
                                Volver
                            </Button>

                    </Item>

                </Grid>

                <Grid item sx={{ marginRight: 2, marginTop: -2 }}>
                    <Item>
                        <h2>Carrito</h2>

                    </Item>

                </Grid>

                

                <Grid item sx={{ marginRight: 2, marginTop: -2 }}>
                    <Item>
                        <Button onClick={handleToCheckout}  size="small"> Check-out <PaymentsIcon /></Button>

                    </Item>

                </Grid>

            </Grid>
            
            <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            
                {
                    productosCarrito.map((producto, index) => (
                        <Grid item xs={2.5} key={index} sx={{margin:2}}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={producto.imagen}
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {producto.nombre}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                    Q{producto.precio}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    {producto.descripcion}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    
                                <Button size="small" onClick={()=>(eliminarProducto(producto))}><RemoveCircleOutlineIcon /></Button>
                                       {producto.cantidad}
                                <Button size="small"  onClick={()=>(agregarProducto(producto))}><ControlPointIcon/></Button>

                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
                <Grid item xs={6}>

            </Grid>
        

        </Grid>
                {/* -------------- termina ternario ------------------- */}
                </>
                :
                <>
                    <h1>¡Cuidado! Aquí solo usuarios</h1>
                </>}

        </Box>

    )
}


export default ShowCarrito