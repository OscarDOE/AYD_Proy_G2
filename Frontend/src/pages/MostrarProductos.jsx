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
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  }));

const MostrarProductos = () => {

    const ruta_AWS = 'http://localhost:4000'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    const navigate = useNavigate();
    // console.log(usuario_logeado)
    const empresa_seleccionada = cookies.get('empresa_seleccionada');
    console.log('carrito al cargar --------- ');
    console.log(cookies.get('carrito'))
    // console.log(usuario_logeado)

    const [productos, setProductos] = useState([]);
    const [productosOG, setProductosOG] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [carritoCargado, setCarritoCargado] = useState([]);
    const [tipoCategorias, setTipoCategorias] = useState([]);
    const [categoriaSelected, setCategoriaSelected] = useState([]);





    const sendCategoria = async () =>{
        console.log(categoriaSelected)
        if(categoriaSelected != 0){
            const endpoint = await fetch(ruta_AWS+'/producto', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },body: JSON.stringify({"token":usuario_logeado.token, "idEmp":empresa_seleccionada.usuario_id, "filtro":categoriaSelected})
              });
              const resp_get = await endpoint.json();
              setProductos(resp_get)
        }else{
            setProductos(productosOG)
        }
    }
    
    const getCategorias = async () =>{
        const endpoint = await fetch(ruta_AWS+'/categoria', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token, "idEmp":empresa_seleccionada.usuario_id})
        });
        const resp_get = await endpoint.json();
        setTipoCategorias(resp_get)
    }

 
    const getProductos = async () =>{
        const endpoint = await fetch(ruta_AWS+'/menu', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token, "idEmp":empresa_seleccionada.usuario_id})
        });
        const resp_get = await endpoint.json();
        const productosArrayRes = resp_get.map(({id, nombre, descripcion, precio, imagen})=>(
            {
                id,
                nombre,
                precio,
                descripcion,
                imagen,
                cantidad:0
            }
        ))
        
        setProductos(productosArrayRes)
        setProductosOG(productosArrayRes)
    }

    const agregarProducto = (producto) => {
        setProductos(prevProductos => {
          return prevProductos.map(productoCurrent => {
            if (productoCurrent.id === producto.id) {
              return { ...productoCurrent, cantidad: productoCurrent.cantidad + 1 };
            }
            return productoCurrent;
          });
        });




        setCarrito(prevCarrito => {
            const productoEnCarrito = prevCarrito.find(item => item?.id === producto.id);
            
            if (productoEnCarrito) {
              return prevCarrito.map(item => {
                if (item.id === producto.id) {
                  return { ...item, cantidad: item.cantidad + 1 };
                }
                return item;
              });
            } else {
              return [...prevCarrito, { ...producto, cantidad: 1 }];
            }
          });

          setProductosOG(productos)
          
    }

    

    const eliminarProducto = (producto)=>{
        setProductos(prevProductos => {
            return prevProductos.map(productoCurrent => {
              if (productoCurrent.id === producto.id) {
                if(productoCurrent.cantidad > 0){
                    return { ...productoCurrent, cantidad: productoCurrent.cantidad - 1 };
                    
                }
              }
              return productoCurrent;
            });
          });

          setCarrito(prevCarrito => {
            const productoEnCarrito = prevCarrito.find(item => item.id === producto.id);
            if (productoEnCarrito) {
              return prevCarrito.map(item => {
                if (item.id === producto.id) {
                  return { ...item, cantidad: item.cantidad - 1 };
                }
                return item;
              }).filter(item => item.cantidad > 0); // Eliminar productos con cantidad cero
            }
            return prevCarrito;
          });

          setProductosOG(productos)
    }

    const pagar = ()=>{
        console.log(carrito);
        if(carritoCargado === undefined){
            setCarritoCargado(carrito)
            return
        }
        // Recorrer la primera lista (carrito)
        for (var i = 0; i < carrito.length; i++) {
            var carritoItem = carrito[i];
            // Buscar el índice del elemento correspondiente en la segunda lista (carritocargado)
            var index = carritoCargado.findIndex(function(item) {
            return item.id === carritoItem.id;
            });
            // Si se encuentra el elemento en la segunda lista, sumar las cantidades
            if (index !== -1) {
            carritoCargado[index].cantidad += carritoItem.cantidad;
            }else{
                carritoCargado.push(carritoItem);
            }
        }
        if (carrito.length==0 ){
            cookies.set('carrito', carrito)
        }else{
            cookies.remove('carrito')
            cookies.set('carrito', carritoCargado)
        }
    }


    useEffect(() => {getProductos()}, [] );
    useEffect(() => {getCategorias()}, [] );
    useEffect(() => {setCarritoCargado(cookies.get('carrito'))}, [] );
    

    return (
        <Box sx={{ flexGrow: 1,marginTop:5 }} >
            
            <Grid container justifyContent="center">

                <Grid  item sx={{ marginRight: 2, marginTop: -2 }}>
                    <Item>
                    <Link to='/elegirempresa'>
                    <Button onClick={()=>cookies.set('carrito',[])} variant="contained"><ArrowBackIcon />
                                    Volver
                    </Button>
                    </Link>

                    </Item>
                </Grid>

                <Grid  item sx={{ marginRight: 2, marginTop: -2 }}>
                    <Item>
                    <h2>{cookies.get('empresa_seleccionada').nombre.toUpperCase()}</h2>

                    </Item>
                    
                </Grid>
                
                
                <Grid xs={2} item sx={{ marginRight: 2, marginTop: -2 }}>
                    <Item>
                        <h3>Tipo de Producto</h3>
                        <select
                            style={{
                                'width': '100%',
                                'font-size': ' 15px',
                                'height': '30px',
                                'padding': '5px'
                            }}
                            name="lenguajes" id="lang1"
                            onChange={(e) => setCategoriaSelected(e.target.value)}>
                            {/* onChange={(e)=>(sendCategoria(e.target.value))} */}
                            <option value="0">--Seleccione--</option>
                            {
                                tipoCategorias.map(opt => <option>{opt.descripcion}</option>)
                            }
                        </select>
                        <Button onClick={()=>(sendCategoria())} sx={{margin:'auto', marginTop:2}} variant="contained" color="success">
                                    Filtrar
                        </Button>
                    </Item>

                </Grid>
                <Grid item sx={{ marginRight: 2, marginTop: -2 }}>
                    <Item>
                    <Button onClick={pagar}  size="small">Confirmar<CheckCircleOutlineIcon /></Button>
                    <Link to='/carrito'><Button   size="small">Carrito<ShoppingCartIcon /></Button></Link>

                    </Item>
                    
                </Grid>
            </Grid>
            <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    productos.map((producto, index) => (
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
            

        </Grid>


        </Box>

    )
}


export default MostrarProductos
